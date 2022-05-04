import http.client

def lambda_handler(event, context):
    
    conn = http.client.HTTPSConnection("veriphone.p.rapidapi.com")

    phoneNumber = event['queryStringParameters']['phoneNumber']

    headers = {
        'content-type': "application/json",
        'x-rapidapi-host': "veriphone.p.rapidapi.com",
        'x-rapidapi-key': "0894320c95msh9b0466dd3573520p171759jsn82db79091d5c"
    }

    conn.request("GET", "/verify?phone="+phoneNumber, headers=headers)
    
    try:
        res = conn.getresponse()
        data = res.read()
        return {
            'statusCode':200,
            'body': data
        }
    except Exception as e:
        return {
            'statusCode' : 500,
            'body': e
        }
