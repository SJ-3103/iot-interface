from typing import Optional

# fastapi
from fastapi import Depends, FastAPI, HTTPException, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# exception
from fastapi import Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError

# sqlalchemy
from sqlalchemy.orm import Session

# iot_app
from iot_app import models, schemas, crud
from iot_app.database import SessionLocal, engine

# websockets
from app_websockets.socket import websocket_endpoint_for_ws


# static files
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


# iot component function
from iot_rpi.mail import mysendmail


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount("/assets", StaticFiles(directory="assets/"), name="assets")

origins = [
    "http://localhost:3000",
    "localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


# request error exception handling
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exception: RequestValidationError):
    # print("Error occured "+exception.errors()[0]["msg"]+" : "+exception.errors()[0]["loc"][1])
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({
            "detail": exception.errors()
        }),
    )


templates = Jinja2Templates(directory="./")


# for serving react app
@app.get("/")
async def serve_react_spa(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


# api to 'GET' all plant data
@app.get("/plant/", response_model=schemas.Plant)
async def read_plant_data(db: Session = Depends(get_db)):
    try:
        obj = crud.get_all_plant_data(db=db)

        if obj.__len__() == 0:
            return JSONResponse(
                status_code=500,
                content={
                    "msg": "Plant list is Empty!"
                }
            )
        else:
            plant_data = obj
            return JSONResponse(
                status_code=200,
                content=plant_data
            )

    except Exception as error:
        print(error.args)
        raise HTTPException(
            status_code=500,
            detail="Internal Server ERROR!"
        )


# api to 'GET' all emails data
@app.get("/get/emails/", response_model=schemas.Email)
async def read_emails(db: Session = Depends(get_db)):
    try:
        obj = crud.get_all_email_data(db=db)

        if obj.__len__() == 0:
            return JSONResponse(
                status_code=500,
                content={
                    "msg": "Email list is Empty!"
                }
            )
        else:
            email_data = obj
            return JSONResponse(
                status_code=200,
                content=email_data
            )

    except Exception as error:
        print(error.args)
        raise HTTPException(
            status_code=500,
            detail="Internal Server ERROR!"
        )


# api to 'POST' email in db
@app.post("/post/emails/", response_model=schemas.AddEmail)
async def create_mail(email_data: schemas.Plant, db: Session = Depends(get_db)):
    try:
        new_email_data = mysendmail(
            date=email_data.date,
            temperature=email_data.temperature,
            humidity=email_data.humidity,
            lightval=email_data.lightval,
            moisture=email_data.moisture
        )
        email = {
            "sender": "shbhm89300@gmail.com",
            "reciever": "jshubham@gmail.com",
            "subject": new_email_data[0],
            "email_text": new_email_data[1],
            "email_attachment": new_email_data[2]
        }

        obj = crud.create_email(db=db, email=email)

        if obj.id:
            return JSONResponse(
                status_code=200,
                content={
                    "id": obj.id
                }
            )
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500,
            detail="Internal Server ERROR!"
        )


# api to 'POST' plant data in db
@app.post("/plant/", response_model=schemas.AddPlant)
async def create_plant_data(plant: schemas.AddPlant, db: Session = Depends(get_db)):
    try:
        obj = crud.create_plant(db=db, plant=plant)
        if obj.id:
            return JSONResponse(
                status_code=200,
                content={
                    "id": obj.id
                }
            )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Internal Server ERROR!"
        )


# websocket in fastApi
@app.websocket("/ws")
async def handle_ws(websocket: WebSocket):
    await websocket_endpoint_for_ws(websocket=websocket)
