<p align="center">
<img src="./src/assets/labenlp_logo.png">
</p>

# LabeNLP

**NLP Annotator:**

- NER Annotation --> 90%
- Q&A Annotation --> 60%

**to be completed !**

## NER Annotation
<p align="center">
<img src="./src/assets/ss-first-version.png">
</p>

## JSON output example for NER

```
{
    "classes": [
        "ORG",
        "MONEY",
        "NORP",
        "DATE"
    ],
    "annotations": [
        "European authorities fined Google a record $ 5.1 billion on Wednesday for abusing its power in the mobile phone market and ordered the company to alter its practices.",
        {
            "entities": [
                [
                    0,
                    20,
                    "NORP"
                ],
                [
                    27,
                    33,
                    "ORG"
                ],
                [
                    43,
                    56,
                    "MONEY"
                ],
                [
                    60,
                    69,
                    "DATE"
                ]
            ]
        }
    ]
}
```

## Q&A Annotation
<p align="center">
<img src="./src/assets/qa-annotation.png">
</p>

## JSON Output example for Q&A

```
{
    "context": "Beyoncé Giselle Knowles-Carter (/biːˈjɒnseɪ/ bee-YON-say) (born September 4, 1981) is an American singer, songwriter, record producer and actress. Born and raised in Houston, Texas, she performed in various singing and dancing competitions as a child, and rose to fame in the late 1990s as lead singer of R&B girl-group Destiny's Child. Managed by her father, Mathew Knowles, the group became one of the world's best-selling girl groups of all time. Their hiatus saw the release of Beyoncé's debut album, Dangerously in Love (2003), which established her as a solo artist worldwide, earned five Grammy Awards and featured the Billboard Hot 100 number-one singles \"Crazy in Love\" and \"Baby Boy\".",
    "qas": [
        {
            "id": 0,
            "question": "When did Beyonce start becoming popular?",
            "answer": "in the late 1990s",
            "answerStartIndex": 269,
            "answerEndIndex": 286
        },
        {
            "id": 1,
            "question": "What areas did Beyonce compete in when she was growing up?",
            "answer": "singing and dancing",
            "answerStartIndex": 207,
            "answerEndIndex": 226
        },
        {
            "id": 2,
            "question": "When did Beyonce leave Destiny's Child and become a solo singer?",
            "answer": "2003",
            "answerStartIndex": 526,
            "answerEndIndex": 530
        }
    ]
}
```


## TODO:

- why not, add a database, so we could save the annotations and come back to it later to finish it.
- JSON output for Q&A model