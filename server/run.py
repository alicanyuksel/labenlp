from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from resources import Tokenizer

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})
api = Api(app)

api.add_resource(Tokenizer, "/tokenize")

if __name__ == "__main__":
    app.run(port=5000, debug=True)
