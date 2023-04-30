# save this as app.py
from flask import Flask
# from flask_migrate import Migrate

from routes.csv_upload_bp import csv_upload_bp

app = Flask(__name__)
app.config.from_object('config')

app.register_blueprint(csv_upload_bp, url_prefix='/upload-file')


@app.route("/")
def hello():
    return "Hello, World!"


if __name__ == '__main__':
    app.debug = False
    app.run()
