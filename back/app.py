from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

f = open('db.json', 'rt')
try:
    data = json.loads(f.read())
except ValueError:
    data = {"students": []}
f.close()


@app.route("/students", methods=['POST'])
@app.route("/students/<id>", methods=['GET', 'PUT'])
def manageStudents(id=-1):
    isExist = 0
    findId = -1
    if request.method == 'GET':
        if int(id) == -1:
            return json.dumps(data["students"])
        else:
            for stud in data:
                if int(stud['id']) == int(id):
                    return json.dumps(stud)
    elif request.method == 'POST':
        newStud = request.get_json()
        for stud in data["students"]:
            if newStud["email"].lower() in stud['email'].lower():
                isExist += 1
        if isExist > 0:
            return ("Student already exists")
        else:
            if len(data) > 0:
                myId = data["students"][-1]['id']
            else:
                myId = 0
            data["students"].append({"name": newStud["name"], "email": newStud["email"], "grades": {"math": newStud["grades"]["math"], "computer": newStud["grades"]["computer"], "english": newStud["grades"]["english"]}, "id": myId+1})
            f = open('db.json', 'wt')
            f.write(json.dumps(data))
            f.close()
            return ("Student added")
    elif request.method == 'PUT':
        newStud = request.get_json()
        for stud in data["students"]:
            findId += 1
            if int(stud["id"]) == int(id):
                stud["grades"]["math"] = newStud["grades"]["math"]
                stud["grades"]["english"] = newStud["grades"]["english"]
                stud["grades"]["computer"] = newStud["grades"]["computer"]
                data["students"].pop(findId)
                data["students"].insert(findId, stud)
        f = open('db.json', 'wt')
        f.write(json.dumps(data))
        f.close()
        return ("Student updated")


if __name__ == "__main__":
    app.run(debug=True)
