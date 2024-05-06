from typing import List

from fastapi import Depends
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession

from backend.src.models.user_models import User
from backend.src.database import get_async_session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)


def convert_into_json_user(data: List):
    result_list = []
    for row in data:
        result_dict = {
            'id': row[0],
            'email': row[1],
            'hashed_password': row[2],
            'username': row[3],
            'date_of_birth': row[4].isoformat(),
            'city': row[5],
            'phone_number': row[6],
            'avatar': row[7],
            'acc_filling': row[8],
            'social_links': row[9],
            'registered_at': row[10].isoformat(),
            'role_id': row[11],
            'is_active': row[12],
            'is_superuser': row[13],
            'is_verified': row[14]
        }
        result_list.append(result_dict)
    return result_list
