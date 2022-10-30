from fastapi import FastAPI, Request
from pydantic import BaseModel
from cachetools import TTLCache
import uuid
from sse_starlette.sse import EventSourceResponse
import asyncio

app = FastAPI()
cache = TTLCache(maxsize=10000, ttl=7200)
rid = {}
STREAM_DELAY = 1  # second
RETRY_TIMEOUT = 15000  # milisecond

class NewRoomReq(BaseModel):
    name: str

class JoinRoomReq(BaseModel):
    room_id: str
    member_name: str

class Member(BaseModel):
    member_id: str
    name: str
    room_id: str
    active_card: int | None = None

class Room(BaseModel):
    room_name: str
    room_id: str
    members: list[Member] = []

class SetResultReq(BaseModel):
    member_id: str
    room_id: str
    result: int


@app.post("/rooms/new", response_model=Room)
async def newRoom(newRoomReq :NewRoomReq):
    room_id = uuid.uuid4().hex
    room = Room(room_name=newRoomReq.name, room_id=room_id)
    cache[room_id] = room
    return room

@app.get("/rooms", response_model=list[Room])
async def getRooms():
    rv: list[Room] = []
    for key, item in cache.items():
        rv.append(item)
    return rv

@app.put("/rooms/join", response_model=Member)
async def joinRoom(join: JoinRoomReq):
    r = cache[join.room_id]
    memid = uuid.uuid4().hex
    m = Member(member_id=memid, name=join.member_name, room_id=join.room_id)
    r.members.append(m)
    cache[join.room_id] = r
    return m

@app.get("/room/{room_id}", response_model=Room)
async def getRoom(room_id: str):
    r = cache[room_id]
    return r

@app.post("/room/result", response_model=Room)
async def setResult(req: SetResultReq):
    r = cache[req.room_id]
    cp = r
    for memix, member in enumerate(r.members):
        if member.member_id == req.member_id:
            memcopy = member
            memcopy.active_card = req.result
            cp.members[memix] = memcopy
            cache[req.room_id] = cp
            return cp
    return Room()

@app.put("/room/newgame", response_model=Room)
async def newGame(room_id: str):
    r = cache[room_id]
    cp = r
    for i, v in enumerate(r.members):
        cp.members[i].active_card = None
    cache[room_id] = cp
    return cp

@app.put("/room/reveal", response_model=Room)
async def revealGame(room_id: str):
    rid[room_id] = True
    return cache[room_id]

@app.get('/stream')
async def message_stream(request: Request):
    def new_messages():
        for key, val in enumerate(rid):
            if val:
                return key
        return None
        
    async def event_generator():
        while True:
            # If client closes connection, stop sending events
            if await request.is_disconnected():
                break

            # Checks for new messages and return them to client if any
            v = new_messages()
            if v != None:
                yield {
                        "event": "reveal",
                        "room_id": v,
                        "retry": RETRY_TIMEOUT,
                        "data": "message_content"
                }
            
            await asyncio.sleep(STREAM_DELAY)

    return EventSourceResponse(event_generator())

    