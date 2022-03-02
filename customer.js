"use strict";

const dynamodb = require('./gss/config/dynamoDb').default;
const { sendResponse } = require('./utils/response');


module.exports.create = async (event) => {
    const body = JSON.parse(event.body);
    try {
        const { customer_id, profile_data } = body;
        const TableName = process.env.DYNAMODB_TABLE;

        const params = {
            TableName,
            Item: {
                'pk': 'CUSTOMER#' + customer_id,
                'sk': 'PROFILE#' + customer_id,
                'profile_data': profile_data
            },
            // insert the data if the partition key is not found
            ConditionExpression: "attribute_not_exists(customer_id)"
        };

        await dynamodb.put(params).promise();
        return sendResponse(200, { message: 'Customer created successfully' });
    } catch (error) {
        return sendResponse(500, { message: "Could not create Customer" });
    }
}

module.exports.get = async (event) => {
    const customer_id = event.pathParameters.id;
    try {
        const TableName = process.env.DYNAMODB_TABLE;
        const params = {
            TableName,
            Key: {
                'pk': 'CUSTOMER#' + customer_id,
                'sk': 'CUSTOMER#' + customer_id
            }
        };

        const data = await dynamodb.get(params).promise();
        return sendResponse(200, { message : 'Customer retrieved successfully', data });
    } catch (error) {
        return sendResponse(500, { message: "Could not get Customer" });
    }
}