import time

from fastapi import Depends

from iot_functions import iot

from iot_app import crud
from iot_app.database import SessionLocal


# Dependency
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


async def send_real_time_data(websocket):
    iot.blink(4, "red")  # blink led 4 times

    light_data = iot.light()  # get data from LDR sensor
    soil_moisture_data = iot.soil_moisture()  # get data from soil moisture sensor
    temp_and_moisture_data = iot.temperature()  # get data from DHT11 sensor
    motion_msg = iot.motion()  # get data from motion sensor

    _time = time.ctime(time.time())  # get time

    plant_data = {
        "date": _time,
        "temperature": temp_and_moisture_data[0],
        "humidity": temp_and_moisture_data[1],
        "lightval": light_data[0],
        "moisture": soil_moisture_data[0]
    }

    await websocket.send_json({
        "msg": "Recieving Data",
        "time": _time,
        "lightvalue": light_data[0],
        "soil_moisture_val": soil_moisture_data[0],
        "temperature": temp_and_moisture_data[0],
        "moisture": temp_and_moisture_data[1],
        "lightval_msg": light_data[1],
        "soil_moisture_msg": soil_moisture_data[1],
        "temperature_msg": temp_and_moisture_data[2],
        "moisture_msg": temp_and_moisture_data[3],
        "motion_msg": motion_msg
    })


async def send_static_data(websocket):
    _time = time.ctime(time.time())

    plant_data = {
        'date': _time,
        'temperature': 30,
        'humidity': 69,
        'lightval': 9990,
        'moisture': 90
    }

    await websocket.send_json({
        "msg": "Recieving Data",
        "time": plant_data['date'],
        "lightvalue": plant_data['lightval'],
        "soil_moisture_val": plant_data['moisture'],
        "temperature": plant_data['temperature'],
        "moisture": plant_data['humidity'],
        "lightval_msg": "LIGHT ANALYSIS DATA",
        "soil_moisture_msg": "SOIL MOISTURE ANALYSIS DATA",
        "temperature_msg": "TEMPERATURE ANALYSIS DATA",
        "moisture_msg": "MOISTURE ANALYSIS DATA",
        "motion_msg": "MOTION ANALYSIS DATA"
    })
