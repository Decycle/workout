# Flask Python Backend

This is the backend for our application that uses OpenAI to convert user searches to vectors (embeddings). We are storing these vectors in our Pinecone database which allows us to efficiently search through large volumes of vectors and return them to the user in real time. MongoDB is used to used to store user information.


## Install instructions:

1. Navigate to backend folder
2. Install dependencies:

```
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# (On windows)
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

3. Setup environment variables
Create a .env file in the root of the project with the following variables:

```
OPENAI_API_KEY=<your_openai_api_key>
PINECONE_API_KEY=<your_pinecone_api_key>
MONGODB_URI=<your_mongodb_uri>
```

4. Start the server:

```
uvicorn main:app --reload
```
