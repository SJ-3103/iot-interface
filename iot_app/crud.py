from sqlalchemy.orm import Session
from . import models, schemas


# read all rows of plant table
def get_all_plant_data(db: Session):
    return db.query(models.PlantData).all()


# create plant table row
def create_plant(db: Session, plant: schemas.AddPlant):
    db_plant = models.PlantData(**plant.dict())
    db.add(db_plant)
    db.commit()
    db.refresh(db_plant)
    return db_plant


# read all rows of email table
def get_all_email_data(db: Session):
    return db.query(models.EmailData).all()


# create email table row
def create_email(db: Session, email):
    db_email = models.EmailData(**email)
    db.add(db_email)
    db.commit()
    db.refresh(db_email)
    return db_email


# get last row from plant table
def get_last_plant_data(db: Session):
    return db.query(models.PlantData).order_by(models.PlantData.id.desc()).first()
