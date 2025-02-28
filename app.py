from flask import Flask, render_template, request
from flask_mail import Mail, Message

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')  # Home Page
    
app.run(debug=True)