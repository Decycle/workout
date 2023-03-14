import json
from os import environ as env
from urllib.parse import quote_plus, urlencode

from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, send_from_directory, session, url_for, request, jsonify

import pinecone
import openai

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)
else:
    print("Please provide a .env file. See README.md for more information.")

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

app = Flask(__name__, static_folder="../frontend/build", static_url_path="/")
app.secret_key = env.get("APP_SECRET_KEY")

oauth = OAuth(app)

oauth.register(
    "auth0",
    client_id=env.get("AUTH0_CLIENT_ID"),
    client_secret=env.get("AUTH0_CLIENT_SECRET"),
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration'
)

@app.route("/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )

@app.route("/callback", methods=["GET", "POST"])
def callback():
    token = oauth.auth0.authorize_access_token()
    session["user"] = token
    return redirect("/")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(
        "https://" + env.get("AUTH0_DOMAIN")
        + "/v2/logout?"
        + urlencode(
            {
                "returnTo": url_for("home", _external=True),
                "client_id": env.get("AUTH0_CLIENT_ID"),
            },
            quote_via=quote_plus,
        )
    )

@app.route("/app/<path:path>")
@app.route("/app")
def home(path: str = None):
    return send_from_directory(app.static_folder, 'index.html')

@app.route("/")
def indexPage():
    return redirect("/app/home")

@app.route('/api/query', methods=['GET'])
async def query():

    prompt = request.args.get('query')
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

    return jsonify(response)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=env.get("PORT", 3000))