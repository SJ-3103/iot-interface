import time
import Adafruit_MCP3008 as mcp
from Adafruit_DHT import read_retry, DHT11
import RPi.GPIO as GPIO

# from gpiozero import MotionSensor

# Setting MCP3208
# for LDR and soil moisture sensor
mcpval = mcp.MCP3008(clk=11, cs=8, miso=9, mosi=10)

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(12, GPIO.OUT)    # green LED pin 12
GPIO.setup(26, GPIO.OUT)  # red LED pin 26

# pir = MotionSensor(17)

GPIO.setup(17, GPIO.IN)  # PIR sensor pin 17


def light():
    adc_value = mcpval.read_adc(1)  # at channel 1
    Vout = adc_value*0.0048828125
    Rldr = (10*(5-Vout))/Vout
    lightval = 500.0/Rldr
    lightval = round(lightval*1000, 0)

    lightval_msg = ""

    if lightval in range(0.0001, 50.0):
        lightval_msg = "very low light"
    elif lightval in range(50.0, 400.0):
        lightval_msg = "low light"
    elif lightval in range(400.0, 1000.0):
        lightval_msg = "light conditions are right"
    elif lightval in range(10000.0, 25000.0):
        lightval_msg = "full daylight but not under direct sun"
    elif lightval_msg > 25000.0:
        lightval_msg = "plant is under direct sunlight"
    else:
        lightval_msg = "no light"

    return [lightval, lightval_msg]


def soil_moisture():
    adc_value = mcpval.read_adc(0)  # at channel 0
    moisture_value = 100-(adc_value/10.24)
    moisture_value = round(moisture_value, 1)

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
