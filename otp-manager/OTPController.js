'use strict';
import { sendResponse } from './utils/sendResponse.js';

export async function generate(event) {

  const { expiry, message, mobile, sender_id } = JSON.parse(event.body);

  const options = {
    method: 'POST',
    url: 'https://d7-verify.p.rapidapi.com/send',
    headers: {
      'content-type': 'application/json',
      authorization: 'undefined',
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

  axios.request(options).then(function (response) {
    return sendResponse(
      200,
      {
        message: 'OTP generated successfully',
        data: response.data
      }
    );
  }).catch(function (error) {
    return sendResponse(
      500,
      {
        message: 'Could not generate OTP',
        error
      }
    );
  });
}
