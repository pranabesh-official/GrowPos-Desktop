from api import db 


class User(db.Model):
    id = db.Column(db.Integer , primary_key=True )
    public_id= db.Column(db.String())
    name=db.Column(db.String())
    EmpolyeName= db.Column(db.String())
    Mobile=db.Column(db.String())
    City=db.Column(db.String())
    Gender=db.Column(db.String())
    Salary=db.Column(db.String())
    HaierDate=db.Column(db.String())
    Type=db.Column(db.String())
    Department=db.Column(db.String())
    password = db.Column(db.String())
    admin = db.Column(db.Boolean )

