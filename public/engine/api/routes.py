from flask import jsonify ,request , make_response
import uuid
from werkzeug.security import generate_password_hash , check_password_hash
import jwt
import datetime
from api import app ,db
from api.models import User
from functools import wraps


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query.filter_by(public_id=data['public_id']).all()
        except:
            return jsonify({'message' : 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

@app.route('/user', methods=['GET'])
@token_required
def get_all_users(current_user):
    users = User.query.all()  
    output = []

    
    for user in users:
        user_data = {}
        user_data['public_id'] = user.public_id
        user_data['UserName'] = user.name
        user_data['EmpolyeName'] = user.EmpolyeName
        user_data['Gender'] = user.Gender
        user_data['Mobile'] = user.Mobile
        user_data['City'] = user.City
        user_data['Salary'] = user.Salary
        user_data['Department'] = user.Department
        user_data['Haier_Date'] = user.HaierDate
        user_data['Type'] = user.Type
        user_data['admin'] = user.admin
        output.append(user_data)

    return jsonify(output)

@app.route('/user/<public_id>', methods=['GET'])
@token_required
def get_one_user(current_user, public_id):


    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message' : 'No user found!'})

    user_data = {}
    user_data['public_id'] = user.public_id
    user_data['UserName'] = user.name
    user_data['EmpolyeName'] = user.EmpolyeName
    user_data['Mobile'] = user.Mobile
    user_data['City'] = user.City
    user_data['Gender'] = user.Gender
    user_data['Department'] = user.Department
    user_data['Haier_Date'] = user.HaierDate
    user_data['Type'] = user.Type
    user_data['Salary'] = user.Salary
    user_data['admin'] = user.admin
    
    return jsonify(user_data)

@app.route('/user', methods =['POST'])
def create_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method ='sha256')
    new_user = User(public_id=str(uuid.uuid4()), 
                    name=data['UserName'],
                    EmpolyeName= data['EmpolyeName'],
                    Mobile= data['Mobile'],
                    City= data['City'],
                    Gender=data['Gender'],
                    Department=data['Department'],
                    Salary=float(data['Salary']),
                    HaierDate=data['Haier_Date'],  
                    password=hashed_password, 
                    Type=data['Type'],
                    admin=False)
    db.session.add(new_user)
    db.session.commit()
    return jsonify("USER CREATED")


@app.route('/user/<public_id>', methods=['PUT'])
@token_required
def promote_user(current_user, public_id):

    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message' : 'No user found!'})

    user.admin = True
    db.session.commit()

    return jsonify({'message' : 'The user has been promoted!'})

@app.route('/user/<public_id>', methods=['DELETE'])
@token_required
def delete_user(current_user, public_id):
    
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message' : 'No user found!'})

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message' : 'The user has been deleted!'})

@app.route('/login')
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return jsonify({'message' : 'Invalid User Name and Password'})

    user = User.query.filter_by(name=auth.username).first()

    if not user:
        return jsonify({'message' :' Could not verify'})

    if check_password_hash(user.password, auth.password):
        token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=180)}, app.config['SECRET_KEY'])
        return jsonify({'token' : token.decode('UTF-8'),
                        'UserName': user.name , 
                        'Name': user.EmpolyeName , 
                        'Department': user.Department ,
                        'Mobile' : user.Mobile,
                        'public_id' : user.public_id,
                        'isadmin' : user.admin})

    return jsonify({'message' : 'Password Not Valid'})






