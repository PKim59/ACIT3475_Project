from flask import Flask, request, jsonify, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import random
import mysql.connector

app = Flask(__name__)
# Update the SQLALCHEMY_DATABASE_URI with your MySQL connection details
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://username:password@localhost/dbname'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Roll(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rolls = db.Column(db.String(120), nullable=False)

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        dice = request.form.get('dice')
        return redirect(url_for('roll_dice', dice=dice))
    return render_template('home.html')

@app.route('/roll', methods=['GET'])
def roll_dice():
    dice = request.args.get('dice')
    if not dice:
        return redirect(url_for('home'))

    try:
        num, sides = map(int, dice.split('d'))
    except ValueError:
        return redirect(url_for('home'))

    if num <= 0 or sides <= 0:
        return redirect(url_for('home'))

    rolls = [random.randint(1, sides) for _ in range(num)]
    roll = Roll(rolls=str(rolls))
    db.session.add(roll)
    db.session.commit()
    return render_template('results.html', rolls=rolls)

@app.route('/history', methods=['GET'])
def history():
    rolls = Roll.query.all()
    return render_template('history.html', rolls=[roll.rolls for roll in rolls])

@app.route('/customize', methods=['GET', 'POST'])
def customize():
    if request.method == 'POST':
        sides = request.form.get('sides')
        return redirect(url_for('roll_dice', dice=f'1d{sides}'))
    return render_template('customize.html')

if __name__ == '__main__':
    app.run(debug=True)
