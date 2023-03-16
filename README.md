# FitPlannar

Welcome to our project! This is a short guide to get you started with the installation process.

---

## Installation Instructions

### Frontend

1. Navigate to the frontend folder in your terminal or command prompt.
2. Run the following command: `npm install`. If this doesn't work, use `npm install --legacy-peer-deps` instead. This is due to a conflict in the "@mui/x-date-pickers" library. We have not figured out why, but it doesn't affect use for now.
3. Once that is completed, run the command `npm run build` to build the application.

### Backend

1. Navigate to the backend folder in your terminal or command prompt.
2. Create a new Python virtual environment by running the command `python -m venv venv`.
3. Activate the virtual environment by running the command `source venv/bin/activate`.
4. Install the required Python packages by running the command `pip install -r requirements.txt`.
5. Finally, start the server by running the command python `server.py`.

Note: If you are on a windows machine, you might have to change the ExecutionPolicy in order to run the script

1. Run a new Powershell terminal as administrator
2. Set the ExecutionPolicy to true by running the command `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force`.
3. Create a new Python virtual environment by running the command `python -m venv venv`.
4. Activate the virtual environment by running the command `venv\Scripts\Activate.ps1`.
5. Install the required Python packages by running the command `pip install -r requirements.txt`.
6. Finally, start the server by running the command `uvicorn main:app --reload`.

And that's it! You should now be ready to start using our project.

---

Installation Commands:

```
# Frontend Installation
cd frontend
npm install
npm run build

# Backend Installation
cd ../backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python server.py
```

### Note:

We have decided not to include the .env file in the GitHub repo because OpenAI auto rotates leaked API keys. If we had included it, the OpenAI service wouldn't work anymore. In order to use this repo, you need to create your own .env file, with the following format:

```
OPENAI_API_KEY=your_openai_api_key
```
