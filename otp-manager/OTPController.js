'use strict';
import { sendResponse } from './utils/sendResponse';

export async function generate(event) {

  const { phoneNumber } = JSON.parse(event.body);

  return {
    statusCode: 200,
    body : phoneNumber
  };

  return sendResponse(200, { message: 'Phone Number has been retrieved successfully', phoneNumber });
}
