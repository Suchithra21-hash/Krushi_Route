
from sqlalchemy import Column, Integer, String, Float, Date
from database import Base


class CropDB(Base):
    __tablename__ = "crops"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    variety = Column(String, nullable=False)
    area = Column(Float, nullable=False)
    harvestDate = Column(Date, nullable=False)
    quantity = Column(Float, nullable=False)
    farmerName = Column(String, nullable=True)


class BuyerEnquiry(Base):
    __tablename__ = "buyer_enquiries"

    id = Column(Integer, primary_key=True, index=True)
    crop_id = Column(Integer, nullable=False)
    buyer_name = Column(String, nullable=False)
    message = Column(String, nullable=True)
    status = Column(String, default="Pending")


class OrderDB(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    enquiry_id = Column(Integer, nullable=False)
    crop_id = Column(Integer, nullable=False)
    buyer_name = Column(String, nullable=False)
    crop_name = Column(String, nullable=False)
    status = Column(String, default="Confirmed")
