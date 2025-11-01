from typing import Annotated
from fastapi import APIRouter, Depends
from sqlmodel import Session
from ..models import User, UserCreate, UserPublic
from ..database import get_session
from ..auth import get_password_hash, get_current_active_user

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/register", response_model=UserPublic)
def register(user: UserCreate, session: Session = Depends(get_session)):
    password_hash = get_password_hash(user.password)
    extra_data = {"password_hash": password_hash}
    user = User.model_validate(user, update=extra_data)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@router.get("/me", response_model=UserPublic)
def read_users_me(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user


