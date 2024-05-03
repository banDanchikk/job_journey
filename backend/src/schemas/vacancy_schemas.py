from pydantic import BaseModel


class VacancyCreate(BaseModel):
    title: str
    description: str
    location: str
    salary: str
    user_id: int