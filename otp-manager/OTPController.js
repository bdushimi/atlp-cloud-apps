'use strict';
const axios = require("axios").default;

exports.generate = async (event) => {

  const { expiry, message, mobile, sender_id } = JSON.parse(event.body);

  const options = {
    method: 'POST',
    url: 'https://d7-verify.p.rapidapi.com/send',
    headers: {
      'content-type': 'application/json',
      authorization: 'Token 4c7a47a81381a795f012fd075a0b1efff7ed049e',
      'x-rapidapi-host': 'd7-verify.p.rapidapi.com',
      'x-rapidapi-key': '0894320c95msh9b0466dd3573520p171759jsn82db79091d5c'
    },
    data: {
      expiry,
      message,
      mobile,
      sender_id
    }
  };

  return {
    'statusCode': 200,
    'body': {
      expiry,
      message,
      mobile,
      sender_id
    }
  }
}
