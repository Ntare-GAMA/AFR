from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shira.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database Models
class Farmer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

class Investor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

# Routes
@app.route('/')
def index():
    return "Welcome to Shira API"

@app.route('/register/farmer', methods=['POST'])
def register_farmer():
    data = request.get_json()
    new_farmer = Farmer(name=data['name'], email=data['email'])
    db.session.add(new_farmer)
    db.session.commit()
    return jsonify({"message": "Farmer registered successfully"}), 201

@app.route('/register/investor', methods=['POST'])
def register_investor():
    data = request.get_json()
    new_investor = Investor(name=data['name'], email=data['email'])
    db.session.add(new_investor)
    db.session.commit()
    return jsonify({"message": "Investor registered successfully"}), 201

@app.route('/farmers', methods=['GET'])
def get_farmers():
    farmers = Farmer.query.all()
    return jsonify([{"name": f.name, "email": f.email} for f in farmers])

@app.route('/investors', methods=['GET'])
def get_investors():
    investors = Investor.query.all()
    return jsonify([{"name": i.name, "email": i.email} for i in investors])

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
