from pydantic import BaseModel
from datetime import date
from typing import Optional

class Crop(BaseModel):
    name: str
    variety: str
    area: float
    harvestDate: date
    quantity: float
    farmerName: Optional[str] = None