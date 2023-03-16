# Flask python backend

## Install instructions:

python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

(On windows):
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt

## Start the server:
uvicorn main:app --reload

