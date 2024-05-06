from typing import List

from backend.src.models.vacancy_models import Vacancy


def convert_into_json_vacancy(data: List[List[Vacancy]]):
    result_list = []
    for sublist in data:
        for row in sublist:
            result_dict = {
                'id': row.id,
                'title': row.title,
                'category': row.category,
                'location': row.location,
                'work_type': row.work_type,
                'salary': row.salary,
                'description': row.description,
                'timestamp': row.registered_at.isoformat(),
                'is_archived': row.is_archived,
                'user_id': row.user_id
            }
            result_list.append(result_dict)
    return result_list
