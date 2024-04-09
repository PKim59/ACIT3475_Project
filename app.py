from flask import Flask, request, render_template, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import random
import string
from datetime import timedelta

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Set your secret key for session encryption
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)  # Set session lifetime to 7 days
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://webserver1:password@64.23.223.228/diceofdestiny'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Result(db.Model):
    __tablename__ = 'results'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), nullable=False)
    rolls = db.Column(db.String(255), nullable=False)
    modifier = db.Column(db.Integer, nullable=False)
    total = db.Column(db.Integer, nullable=False)

def generate_user_id():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=10))

@app.before_request
def before_request():
    # Generate and store user_id in session if it doesn't exist
    if 'user_id' not in session:
        session.permanent = True
        session['user_id'] = generate_user_id()

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        dice = request.form.get('dice')
        modifier = request.form.get('modifier', type=int, default=0)
        return redirect(url_for('roll_dice', dice=dice, modifier=modifier))
    
    # Get user_id from session
    user_id = session.get('user_id')
    
    # Query rolls for the current user
    rolls = Result.query.filter_by(user_id=user_id).all()
    
    return render_template('home.html', rolls=rolls)

@app.route('/roll', methods=['GET'])
def roll_dice():
    dice = request.args.get('dice')
    modifier = request.args.get('modifier', type=int, default=0)
    if not dice:
        return redirect(url_for('home'))

    try:
        num, sides = map(int, dice.split('d'))
    except ValueError:
        return redirect(url_for('home'))

    if num <= 0 or sides <= 0:
        return redirect(url_for('home'))

    rolls = [random.randint(1, sides) for _ in range(num)]
    total = sum(rolls) + modifier
    
    # Construct result string
    result_str = f"{rolls} with modifier {modifier} = {total}"
    
    # Get user_id from session
    user_id = session.get('user_id')
    
    # Save result to the database
    result = Result(user_id=user_id, rolls=str(rolls), modifier=modifier, total=total)
    db.session.add(result)
    db.session.commit()
    
    return render_template('results.html', rolls=rolls, modifier=modifier, total=total)

if __name__ == '__main__':
    app.run(debug=True)
