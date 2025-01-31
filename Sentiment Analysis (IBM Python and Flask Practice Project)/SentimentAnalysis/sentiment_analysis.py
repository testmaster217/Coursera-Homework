'''
This module contains a single function to be used to
perform sentiment analysis.
'''
import json
import requests

def sentiment_analyzer(text_to_analyze):
    '''
    This function uses the Watson NLP system to do sentiment analysis
    on provided text.
    '''
    url = "https://sn-watson-sentiment-bert.labs.skills.network/v1/watson.runtime.nlp.v1/NlpService/SentimentPredict"
    headers = {"grpc-metadata-mm-model-id": "sentiment_aggregated-bert-workflow_lang_multi_stock"}
    obj = {
        "raw_document": {
            "text": text_to_analyze
        }
    }

    response = requests.post(url, json=obj, headers=headers)
    label = None
    score = None

    if response.status_code == 500:
        label = None
        score = None
    elif response.status_code == 200:
        formatted_response = json.loads(response.text)
        label = formatted_response['documentSentiment']['label']
        score = formatted_response['documentSentiment']['score']

    return {'label': label, 'score': score}
