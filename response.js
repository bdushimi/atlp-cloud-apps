"use strict";

import uuid from 'uuid4';

const dynamodb = require('./config/dynamoDb');
const { sendResponse } = require('./utils/response');

module.exports.create = async (event) => {
    const body = event.body;
    try { 
        const TableName = process.env.DYNAMODB_TABLE;
        const { response_data, survey_id } = body
        const response_id = uuid4();
        const params = {
            TableName,
            Item: {
                "pk": 'RESPONSE#' + response_id,
                "sk": 'RESPONSE#' + survey_id,
                "response_data": response_data,
            },
            // insert the data if the partition key is not found
            ConditionExpression: "attribute_not_exists(response_id)"
        }

        await dynamodb.put(params).promise();
        return sendResponse(200, { message: 'Response has been recorded successfully', response_id });

    } catch (err) {
        return sendResponse(500, { message: "Could not record response" });
    }
}

module.exports.get = async (event) => {
    const { id } = event.pathParameters;
    const TableName = process.env.DYNAMODB_TABLE;
    const params = {
        TableName,
        KeyConditionExpression: 'pk = :id',
        ExpressionAttributeValues: {
            ':id': 'RESPONSE#' + id
        }
    }
    const data = await dynamodb.query(params).promise();
    if (data.Count > 0) {
        return sendResponse(200, { message: 'Response has been retrieved successfully', data: data.Items[0] });
    } else {
        return sendResponse(404, { message: 'Response not found' });
    }
}

module.exports.getAll = async (event) => {
    const TableName = process.env.DYNAMODB_TABLE;
    const survey_id = event.pathParameters.id;
    const params = {
        TableName,
        KeyConditionExpression: 'sk = :id and pk begins_with :response_prefix',
        ExpressionAttributeValues: {
            ':id': 'SURVEY#' + survey_id,
            ':response_prefix': 'RESPONSE#'
        }
    }
    const data = await dynamodb.query(params).promise();
    if (data.Count > 0) {
        return sendResponse(200, { message: 'All responses have been retrieved successfully', data: data.Items });
    } else {
        return sendResponse(404, { message: 'No responses found' });
    }
}