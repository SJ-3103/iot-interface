import smtplib
from email.mime.multipart import MIMEMultipart as MIME_Multipart
from email.mime.text import MIMEText as MIME_Text
from email.mime.base import MIMEBase as MIME_Base
from email import encoders

import os
from dotenv import load_dotenv

load_dotenv()

# Setting the mail client
sender = "shbhm89300@gmail.com"
reciever = "jshubham579@gmail.com"
msg = MIME_Multipart()
msg['From'] = sender
msg['To'] = reciever


def mysendmail(date, temperature, humidity, lightval, moisture):
    file_name = "my_database.csv"
    path_name = "./iot_rpi/{}".format(file_name)

    msg['Subject'] = "Regular Plant Update."

    body = "The date is " + date + "\n Temperature is " + str(temperature) + " C\n Humidity is " + str(
        humidity) + " %\n Moisture is " + str(moisture) + " %\n Light intensity is " + str(lightval) + " lumens"

    msg.attach(MIME_Text(body, 'plain'))

    attachment = open(path_name, "rb")

    p = MIME_Base('application', 'octet-stream')
    p.set_payload((attachment).read())

    encoders.encode_base64(p)  # encode into base64
    p.add_header('Content-Disposition', "attachment; filename= %s" % file_name)

    msg.attach(p)  # attach the instance 'p' to instance 'msg'

    s = smtplib.SMTP('smtp.gmail.com', 587)  # creates SMTP session
    s.starttls()  # start TLS for security
    s.login(sender, os.getenv("GMAIL_AUTH_KEY"))  # Authentication

    text = msg.as_string()  # Converts the Multipart msg into a string

    try:
        s.sendmail(sender, reciever, text)  # sending the mail
    except Exception as e:
        print(e)

    s.quit()

    return [msg["Subject"], body, path_name]
