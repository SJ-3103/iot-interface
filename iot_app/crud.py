from sqlalchemy.orm import Session
from . import models, schemas


# read all rows of plant table
def get_all_plant_data(db: Session):
    values = db.query(models.PlantData).all()
    try:
        d = dict()
        for i in range(0, values.__len__()):
            d[i] = dict()
            d[i]["id"] = values[i].id
            d[i]["date"] = values[i].date
            d[i]["humidity"] = values[i].humidity
            d[i]["moisture"] = values[i].moisture
            d[i]["temperature"] = values[i].temperature
            d[i]["lightval"] = values[i].lightval
        return d
    except Exception as e:
        print(e)


# create plant table row
def create_plant(db: Session, plant: schemas.AddPlant):
    try:
        db_plant = models.PlantData(**plant.dict())
        db.add(db_plant)
        db.commit()
        db.refresh(db_plant)
        return db_plant
    except Exception as e:
        print(e)


# read all rows of email table
def get_all_email_data(db: Session):
    values = db.query(models.EmailData).all()
    try:
        d = dict()
        for i in range(0, values.__len__()):
            d[i] = dict()
            d[i]["id"] = values[i].id
            d[i]["sender"] = values[i].sender
            d[i]["reciever"] = values[i].reciever
            d[i]["subject"] = values[i].subject
            d[i]["email_text"] = values[i].email_text
            d[i]["email_attachment"] = values[i].email_attachment
        return d
    except Exception as e:
        print(e)


# create email table row
def create_email(db: Session, email):
    db_email = models.EmailData(**email)
    db.add(db_email)
    db.commit()
    db.refresh(db_email)
    return db_email
