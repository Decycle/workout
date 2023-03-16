from fastapi import Depends, FastAPI
from fastapi.security import HTTPBearer
from fastapi.middleware.cors import CORSMiddleware

from dotenv import find_dotenv, load_dotenv
from os import environ as env
import pinecone
import openai

from datetime import datetime
import pymongo
from bson.objectid import ObjectId

import numpy as np

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)
else:
    print("Please provide a .env file. See README.md for more information.")

mongo_password = "drTzWD84dYRkGlZR"
client = pymongo.MongoClient(f"mongodb+srv://decycleyang:{mongo_password}@cluster0.mtpybkd.mongodb.net/?retryWrites=true&w=majority")
db = client["User-Workouts"]
collection = db["workouts"]

openai.api_key = env.get("OPENAI_API_KEY")

def get_embedding(prompt):
    embeddings = openai.Embedding.create(
        model="text-embedding-ada-002",
        input=prompt
    )

    return embeddings.data[0].embedding

pinecone.init(
    api_key="a826dad4-8d98-4adf-bac3-ce6c23e1ad1f",
    environment="us-east-1-aws"
)
index = pinecone.Index('workout')

token_auth_scheme = HTTPBearer()
# Creates app instance
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/search")
async def search(prompt: str):
    embedding = get_embedding(prompt)
    difficulty = ""

    easy_words = ["eas", "beginner", "simpl"]
    intermediate_words = ["intermediate", "moderate", "medium", "average"]
    hard_words = ["hard", "advanced", "difficult", "expert"]

    if any(word in prompt for word in easy_words):
        difficulty = "beginner"
    elif any(word in prompt for word in intermediate_words):
        difficulty = "intermediate"
    elif any(word in prompt for word in hard_words):
        difficulty = "expert"

    filter = {} if difficulty == "" else {"difficulty": difficulty}

    response = index.query(
      vector=embedding,
      top_k=10,
      include_values=False,
      include_metadata=True,
      filter=filter
    )
    response = [res['metadata'] for res in response['matches']]

    print(response)
    return response

@app.get("/api/get-description")
async def get_description(name: str):
    embedding = list(np.zeros(1536))
    response = index.query(
      vector=embedding,
      top_k=1,
      include_values=False,
      include_metadata=True,
      filter={
          "name": name
      }
    )
    response = response['matches'][0]['metadata']

    print(response)
    return response


@app.get("/api/add-workout")
def add_workout(user: str, name: str, start: int, end: int,  token: str = Depends(token_auth_scheme)):
    """A valid access token is required to access this route"""
    result = token.credentials
    collection.insert_one({
        "user": user,
        "workout_name": name,
        "start_time": start,
        "end_time": end
    })

    return result

@app.get("/api/get-workouts")
def get_workouts(user: str):
    """A valid access token is required to access this route"""

    # result = token.credentials
    workouts = list(collection.find({"user": user}))
    for workout in workouts:
        workout['_id'] = str(workout['_id'])
    return workouts

@app.get("/api/query-workouts")
def query_workouts(user: str, start: int, end: int):
    """A valid access token is required to access this route"""

    workouts = list(collection.find({
        "user": user,
        "start_time": {"$gte": start, "$lte": end},
    }))
    for workout in workouts:
        workout['_id'] = str(workout['_id'])
    return workouts

@app.delete("/api/delete-workout")
def delete_workout(id: str):
    """A valid access token is required to access this route"""
    obj_id = ObjectId(id)
    # delete the document with the specified id
    result = collection.delete_one({"_id": obj_id})

    # check if the document was deleted successfully
    if result.deleted_count == 1:
        return {"message": "Workout deleted successfully"}
    else:
        return {"message": "Workout not found"}

