# FitPlannar

Welcome to our project! This is a short guide to get you started with the installation process.

---

## Installation Instructions

### Frontend

1. Navigate to the frontend folder in your terminal or command prompt.
2. Run the following command: `npm install`. This will install all the required dependencies for the frontend.
3. Once that is completed, run the command `npm build` to build the application.

### Backend

1. Navigate to the backend folder in your terminal or command prompt.
2. Create a new Python virtual environment by running the command `python -m venv venv`.
3. Activate the virtual environment by running the command `source venv/bin/activate`.
4. Install the required Python packages by running the command `pip install -r requirements.txt`.
5. Finally, start the server by running the command python `server.py`.

And that's it! You should now be ready to start using our project.

---

Install Commands:

```
# Frontend Installation
cd frontend
npm install
npm build

# Backend Installation
cd ../backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python server.py
```

---

The api keys will be deleted/rotated after the project is graded. If you want to use the project after that, you will need to create your own api keys and replace them in `backend/.env`.
