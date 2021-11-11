from flask_restful import Resource, reqparse
from flask_cors import cross_origin

from nltk.tokenize.treebank import TreebankWordTokenizer


class Tokenizer(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("text", required=True,
                        help="This field cannot be left blank!")

    @cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
    def post(self):
        data = Tokenizer.parser.parse_args()
        input_text = data["text"]

        try:
            spans = list(TreebankWordTokenizer().span_tokenize(input_text))
        except LookupError:
            nltk.download('punkt')
            spans = list(TreebankWordTokenizer().span_tokenize(input_text))




        return {
            "tokenDetails": [
                {
                    "token": input_text[s[0]:s[1]],
                    "type": "token",
                    "startIndex": s[0],
                    "endIndex": s[1],
                    "label": None,
                    "bgColor": None,
                    "isActive": True                    
                } for s in spans],
        }
