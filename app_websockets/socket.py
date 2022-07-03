from fastapi import WebSocket

from . import helper_functions


async def websocket_endpoint_for_ws(websocket: WebSocket):
    try:
        await websocket.accept()
        while True:
            json_data = await websocket.receive_json()
            if json_data["get_data"] == True:

                await helper_functions.send_real_time_data(websocket)

                # await helper_functions.send_static_data(websocket)
    except Exception as e:
        print(e)
