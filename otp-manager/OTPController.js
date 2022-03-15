'use strict';

module.exports.generate = async (event) => {

  const { phoneNumber } = JSON.parse(event.body);;

  return {
    statusCode: 200,
    phoneNumber
  };
};
