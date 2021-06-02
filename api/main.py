from datetime import datetime
from flask import Flask
from flask import request
#mport psycopg2

#for importing files that are in a parent dir
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

#the file to be imported
# import database
from database.database import User

thing = User()


app = Flask(__name__)

compareList = [
        ['michael','person'],
        ['johny','person'],
        ['erick','person'],
        ['kanye','person'],
        ['london','location'],
        ['johannesburg','location'],
        ['cape town','location'],
        ['tokyo','location'],
        ['janauary','date'],
        ['febraury','date'],
        ['today','date'],
        ['monday','date'],
        ['yesterday','date'],
    ]

@app.route('/index')
def get_current_time():
    now = datetime.now()
    return {'time': now}

def annotate(model_output):
    newlist = []
    for x in model_output:
        for y in compareList:
            if x.lower() == y[0]:
                newlist.append({"name":x, "entity": y[1]})
                break
    
    return newlist

@app.route('/input', methods=["POST"])
def model_feedback():
    model_output = str(request.json["input"]).split()

    
    
    annotatedlist = annotate(model_output)

    return {'output': annotatedlist}

@app.route('/register', method=["POST"])
def register_user():
    user_data = str(request.json["register_data"])

{
    "register_data": {
        "firstname":"name",
        "lastname":"surname",
        "email":"email",
        "password":"pass"
    }
}

if __name__ == "__main__":
    app.run(debug=True)