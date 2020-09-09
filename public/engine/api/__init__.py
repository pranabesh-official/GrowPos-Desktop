from flask import Flask 
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import os
import sys


# if getattr(sys, 'frozen', False):
#     template_folder = os.path.join(sys._MEIPASS, 'templates')
#     static_folder = os.path.join(sys._MEIPASS, 'static')
#     app = Flask(__name__, template_folder=template_folder, static_folder=static_folder)
#     CORS(app)
# else:
app = Flask(__name__)
CORS(app)
    


app.config['SECRET_KEY']= 'thisiskey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY']= 'thisiskey'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)

from api import routes