from fastapi import WebSocket

import Adafruit_MCP3008 as mcp

# Setting MCP3008
mcpval = mcp.MCP3008(clk=11, cs=8, miso=9, mosi=10) 


import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(12, GPIO.OUT)
GPIO.setup(26, GPIO.OUT)

from Adafruit_DHT import read_retry, DHT11

from gpiozero import MotionSensor

pir = MotionSensor(17)


async def websocket_endpoint_for_ws(websocket: WebSocket):
    try:
        await websocket.accept()
        while True:
            json_data = await websocket.receive_json()
            if json_data["get_data"] == True:
                
                blink(4,"red")

                lightval = light()
                soil_moisture_val = soil_moisture()
                data = temperature()
                
                await websocket.send_json({
                    "msg":"Recieving Data",
                    "lightvalue": lightval,
                    "soil_moisture_val": soil_moisture_val,
                    "temperature": data[0],
                    "moisture": data[1]
                }) 
    except Exception as e:
        print(e)




def light():
    lightval = mcpval.read_adc(1)   # at channel 1
    return lightval


def soil_moisture():
    moistval = mcpval.read_adc(0)
    return moistval


def blink(pin,color):
	GPIO.output(12, GPIO.LOW)
	GPIO.output(26, GPIO.LOW)
	
	pin = 0
	
	if color == "red":
		pin = 26
	
	elif color == "green":
		pin = 12
		
	for i in range(0, pin):
		GPIO.output(pin, GPIO.HIGH)
		time.sleep(0.1)
		GPIO.output(pin, GPIO.LOW)
		time.sleep(0.1)
		

def temperature():
    humidity, temperature = read_retry(DHT11, 4)
    temperature = int(temperature)
    humidity = int(humidity)
    return [temperature,humidity]
	

def motion():
	while(True):
		pir.wait_for_motion()
		print("Motion Detected")
		pir.wait_for_no_motion()