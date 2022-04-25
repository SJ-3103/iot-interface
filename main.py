from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/home")
def read_plant_data():
    data = [
        {
            "date": "19/11/21",
            "humidity": 64,
            "temperature": 11,
            "lightval": 413,
            "moisture": 88
        },
        {
            "date": "20/11/21",
            "humidity": 64,
            "temperature": 11,
            "lightval": 114,
            "moisture": 86
        },
        {
            "date": "21/11/21",
            "humidity": 63,
            "temperature": 11,
            "lightval": 313,
            "moisture": 86
        },
        {
            "date": "22/11/21",
            "humidity": 62,
            "temperature": 11,
            "lightval": 119,
            "moisture": 84
        },
        {
            "date": "23/11/21",
            "humidity": 64,
            "temperature": 11,
            "lightval": 249,
            "moisture": 82
        },
        {
            "date": "24/11/21",
            "humidity": 64,
            "temperature": 11,
            "lightval": 0,
            "moisture": 79
        }
    ]

    return { "data": data }


@app.get("/emails/")
def read_emails():
    data = [
        {
            "id":1,
            "sender": "shbhm89300@gmail.com",
            "reciever": "jshubham579@gmail.com",
            "subject": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, impedit atque tempora eligendi temporibus omnis distinctio consequatur qui provident vero voluptate eveniet, exercitationem dolorem ex. Necessitatibus quo aspernatur ex optio!",
            "context": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, impedit atque tempora eligendi temporibus omnis distinctio consequatur qui provident vero voluptate eveniet, exercitationem dolorem ex. Necessitatibus quo aspernatur ex optio!",
        },

        {
            "id":2,
            "sender": "shbhm89300@gmail.com",
            "reciever": "jshubham579@gmail.com",
            "subject": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, impedit atque tempora eligendi temporibus omnis distinctio consequatur qui provident vero voluptate eveniet, exercitationem dolorem ex. Necessitatibus quo aspernatur ex optio!",
            "context": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, impedit atque tempora eligendi temporibus omnis distinctio consequatur qui provident vero voluptate eveniet, exercitationem dolorem ex. Necessitatibus quo aspernatur ex optio!",
        },

        {
            "id":3,
            "sender": "shbhm89300@gmail.com",
            "reciever": "jshubham579@gmail.com",
            "subject": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, impedit atque tempora eligendi temporibus omnis distinctio consequatur qui provident vero voluptate eveniet, exercitationem dolorem ex. Necessitatibus quo aspernatur ex optio!",
            "context": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, impedit atque tempora eligendi temporibus omnis distinctio consequatur qui provident vero voluptate eveniet, exercitationem dolorem ex. Necessitatibus quo aspernatur ex optio!",
        },

        {
            "id":4,
            "sender": "shbhm89300@gmail.com",
            "reciever": "jshubham579@gmail.com",
            "subject": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, impedit atque tempora eligendi temporibus omnis distinctio consequatur qui provident vero voluptate eveniet, exercitationem dolorem ex. Necessitatibus quo aspernatur ex optio!",
            "context": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, impedit atque tempora eligendi temporibus omnis distinctio consequatur qui provident vero voluptate eveniet, exercitationem dolorem ex. Necessitatibus quo aspernatur ex optio!",
        }
    ]

    return { "data": data }