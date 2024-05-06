from datetime import datetime

from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey, Boolean, Date
from sqlalchemy.orm import relationship

from backend.src.database import Base


class Role(Base):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)


class User(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(String, nullable=False)
    hashed_password: str = Column(String(length=1024), nullable=False)
    username = Column(String, nullable=False)
    date_of_birth = Column(Date)
    city = Column(String)
    phone_number = Column(String)
    company_name = Column(String)
    avatar = Column(String)
    acc_filling = Column(String)
    registered_at = Column(TIMESTAMP, default=datetime.utcnow)
    role_id = Column(Integer, ForeignKey(Role.id), default=2)
    is_active: bool = Column(Boolean, default=True, nullable=False)
    is_superuser: bool = Column(Boolean, default=False, nullable=False)
    is_verified: bool = Column(Boolean, default=False, nullable=False)

    role = relationship("Role", backref="users")

class CV(Base):
    __tablename__ = 'cv'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.id))
    cv_path = Column(String)

    user = relationship("User", backref="cv")


class SocialLink(Base):
    __tablename__ = 'social_links'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.id))
    social_name = Column(String)
    social_link = Column(String)

    user = relationship("User", backref="social_links")
