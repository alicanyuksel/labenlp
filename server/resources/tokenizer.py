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
            "tokens_details": [
                {
                    "start_index": s[0],
                    "end_index": s[1],
                    "token": input_text[s[0]:s[1]]
                } for s in spans],
        }
