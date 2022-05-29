from sqlalchemy import Column, Float, Integer, String
from .database import Base


class PlantData(Base):
    __tablename__ = "plant_data"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, index=True)
    temperature = Column(Integer)
    humidity = Column(Integer)
    lightval = Column(Float)
    moisture = Column(Float)


class EmailData(Base):
    __tablename__ = "emails"

    id = Column(Integer, primary_key=True, index=True)
    sender = Column(String, index=True)
    reciever = Column(String)
    subject = Column(String, index=True)
    email_text = Column(String)
    email_attachment = Column(String)