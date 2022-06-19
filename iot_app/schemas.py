from typing import Optional
from pydantic import BaseModel, ValidationError


# schema for reading plant
class Plant(BaseModel):
    id: int
    date: str
    temperature: int
    humidity: int
    lightval: float
    moisture: float

    class Config:
        orm_mode: True


# schema for adding plant data into database
class AddPlant(BaseModel):
    date: str
    temperature: int
    humidity: int
    lightval: float
    moisture: float


# schema for reading
class Email(BaseModel):
    id: int
    sender: str
    reciever: str
    subject: str
    email_text: str
    email_attachment: str

    class Config:
        orm_mode: True


# schema for adding email into database
class AddEmail(BaseModel):
    sender: str
    reciever: str
    subject: str
    email_text: str
    email_attachment: str
