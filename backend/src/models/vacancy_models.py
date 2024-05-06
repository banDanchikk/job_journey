from datetime import datetime

from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP, Boolean
from sqlalchemy.orm import relationship

from backend.src.models.user_models import User
from backend.src.database import Base


class Vacancy(Base):
    __tablename__ = 'vacancies'

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)
    location = Column(String, nullable=False)
    work_type = Column(String, nullable=False)
    salary = Column(String, nullable=False)
    description = Column(String, nullable=False)
    registered_at = Column(TIMESTAMP, default=datetime.utcnow)
    is_archived = Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey(User.id))

    user = relationship("User", backref="vacancies")


class SavedVacancies(Base):
    __tablename__ = 'saved_vacancies'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.id))
    vacancy_id = Column(Integer, ForeignKey(Vacancy.id))

    user = relationship("User", backref="saved_vacancies")
    vacancy = relationship("Vacancy", backref="saved_vacancies")


class VacanciesWithCV(Base):
    __tablename__ = 'vacancies_with_cv'

    id = Column(Integer, primary_key=True)
    vacancy_id = Column(Integer, ForeignKey(Vacancy.id))
    user_id = Column(Integer, ForeignKey(User.id))
    cv_path = Column(String)

    user = relationship("User", backref="vacancies_with_cv")
    vacancy = relationship("Vacancy", backref="vacancies_with_cv")
