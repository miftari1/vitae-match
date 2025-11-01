from sqlmodel import SQLModel, Session, create_engine

DATABASE_URL = "sqlite:///./vitae_match.db"
engine = create_engine(DATABASE_URL, echo=False)

def create_db_and_tables():
    from .models import User
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session