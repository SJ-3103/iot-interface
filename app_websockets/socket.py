from fastapi import WebSocket

import httpx
import time
from main import create_plant_data

import Adafruit_MCP3008 as mcp
from Adafruit_DHT import read_retry, DHT11
import RPi.GPIO as GPIO
from gpiozero import MotionSensor

# Setting MCP3008
mcpval = mcp.MCP3008(clk=11, cs=8, miso=9, mosi=10)

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(12, GPIO.OUT)
GPIO.setup(26, GPIO.OUT)

# pir = MotionSensor(17)

GPIO.setup(17, GPIO.IN)


async def websocket_endpoint_for_ws(websocket: WebSocket):
    try:
        await websocket.accept()
        while True:
            json_data = await websocket.receive_json()
            if json_data["get_data"] == True:
                # blink(4, "red")  # blink led 4 times

                light_data = light()  # get data from LDR sensor
                soil_moisture_data = soil_moisture()  # get data from soil moisture sensor
                temp_and_moisture_data = temperature()  # get data from DHT11 sensor
                motion_msg = motion()  # get data from motion sensor

                _time = time.ctime(time.time())  # get time

                plant_data = {
                    "date": _time,
                    "temperature": temp_and_moisture_data[0],
                    "humidity": temp_and_moisture_data[1],
                    "lightval": light_data[0],
                    "moisture": soil_moisture_data[0]
                }

                try:
                    print(create_plant_data(plant=plant_data))
                except Exception as e:
                    print(e)

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

                # await websocket.send_json({
                #     "msg": "Recieving Data",
                #     "lightvalue": 22,
                #     "soil_moisture_val": 23,
                #     "temperature": 45,
                #     "moisture": 67,
                #     "lightval_msg": "LIGHT ANALYSIS DATA",
                #     "soil_moisture_msg": "SOIL MOISTURE ANALYSIS DATA",
                #     "temperature_msg": "TEMPERATURE ANALYSIS DATA",
                #     "moisture_msg": "MOISTURE ANALYSIS DATA",
                #     "motion_msg": "MOTION ANALYSIS DATA"
                # })

    except Exception as e:
        print(e)


def light():
    adc_value = mcpval.read_adc(1)  # at channel 1
    Vout = adc_value*0.0048828125
    Rldr = (10*(5-Vout))/Vout
    lightval = 500.0/Rldr
    lightval = lightval*1000

    lightval_msg = ""

    if lightval in range(0.0001, 50):
        lightval_msg = "very low light"
    elif lightval in range(50, 400):
        lightval_msg = "low light"
    elif lightval in range(400, 1000):
        lightval_msg = "light conditions are right"
    elif lightval in range(10000, 25000):
        lightval_msg = "full daylight but not under direct sun"
    elif lightval_msg > 25000:
        lightval_msg = "plant is under direct sunlight"
    else:
        lightval_msg = "no light"

    return [lightval, lightval_msg]


def soil_moisture():
    adc_value = mcpval.read_adc(0)  # at channel 0
    moisture_value = 100-(adc_value/10.24)

    soil_moisture_msg = ""

    if moisture_value < 26.75:
        soil_moisture_msg = "Plant needs water"
    elif moisture_value in range(26.75, 51.17):
        soil_moisture_msg = "Water level is accurate in plant"
    elif moisture_value > 51.75:
        soil_moisture_msg = "To much water in the plant"

    return [moisture_value, soil_moisture_msg]


def blink(n, color):
    GPIO.output(12, GPIO.LOW)
    GPIO.output(26, GPIO.LOW)

    pin = 0

    if color == "red":
        pin = 26
    elif color == "green":
        pin = 12

    for i in range(0, n):
        GPIO.output(pin, GPIO.HIGH)
        time.sleep(0.1)
        GPIO.output(pin, GPIO.LOW)
        time.sleep(0.1)


def temperature():
    humidity, temperature = read_retry(DHT11, 4)
    temperature = int(temperature)
    humidity = int(humidity)

    temperature_msg = ""
    humidity_msg = ""

    if temperature in range(20, 50):
        temperature_msg = "temperature is normal"
    elif temperature < 20:
        temperature_msg = "temperature is low"
    elif temperature > 50:
        temperature_msg = "temperature is high"

    if humidity in range(20, 80):
        humidity_msg = "humidity is normal"
    elif humidity < 20:
        humidity_msg = "humidity is low"
    elif humidity > 80:
        humidity_msg = "humidity is high"

    return [temperature, humidity, temperature_msg, humidity_msg]


# needs to be checked
def motion():
    value = GPIO.input(11)
    msg = ""
    if value == 0:
        msg = "No intruder/motion"
    elif value == 1:
        msg = "Intruder/motion detected"

    return msg
