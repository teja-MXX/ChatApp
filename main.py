import re
from flask import Flask, request, session
from flask.templating import render_template
from flask_socketio import SocketIO, emit
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = "Weeknd_XO"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.sqlite3"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
socket = SocketIO(app)
db = SQLAlchemy(app)

class Info(db.Model):
    id = db.Column("id" ,db.Integer, primary_key = True)
    name = db.Column("name", db.String(100))
    password = db.Column("password" ,db.String(15))

    def __init__(self, name, password):
        self.name = name
        self.password = password

@app.route("/", methods = ["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("login.html")
    uname = request.form["uname"]
    session["uname"] = uname
    password = request.form["password"]
    print(uname, password)
    user = Info(uname, password)
    db.session.add(user)
    db.session.commit()

    return render_template("home.html", name = uname)

@socket.on("my event")
def home(msg):
    user = session["uname"]+" has connected "
    emit('broadcast', user, broadcast=True, include_self=False)
    print("User connected ", msg)

@socket.on("messageToPython")
def msgDisplay(msg):
    print(msg)
    uname = session["uname"]
    msg["uname"] = uname
    socket.emit("messageToJS", msg)

@app.route("/home")
def home():
    return render_template("home.html")

@socket.on('disconnect')
def disc():
    print("Disconnected-----------------------------------------------------------")
    user = session["uname"]+" has disconnected"
    emit("broadcast", user, broadcast=True, self_include=False)


if __name__ == "__main__":
    db.create_all()
    socket.run(app, host = "0.0.0.0" ,debug=True)