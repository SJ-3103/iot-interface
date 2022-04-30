from fastapi import WebSocket

async def websocket_endpoint_for_ws(websocket: WebSocket):
    try:
        await websocket.accept()
        while True:
            json_data = await websocket.receive_json()
            if json_data["get_data"] == True:
                await websocket.send_json({"msg":"Sending Data"}) 
    except Exception as e:
        print(e)