from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from .database import create_dh_and_tables
from .routers import users, token

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(users.router)
app.include_router(token.router)

def main():
    if __name__ == "__main__":
        create_dh_and_tables()
        