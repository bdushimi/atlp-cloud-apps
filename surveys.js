"use strict";

import uuid from 'uuid4';

const dynamodb = require('./config/dynamoDb');
const { sendResponse } = require('./utils/response');

module.exports.create = async (event) => {
    const body = JSON.parse(event.body)
    try {
        const { customer_id, survey_data } = body
        const survey_id = uuid();
        const TableName = process.env.DYNAMODB_TABLE;

        const params = {
            TableName,
            Item: {
                'pk': 'CUSTOMER#' + customer_id,
                'sk': 'SURVEY#' + survey_id,
                'survey_data': survey_data
            }
        }

        await dynamodb.put(params).promise();
        return sendResponse(200, { message: 'Survey has been recorded successfully', survey_id });

    } catch (error) {
        return sendResponse(500, { message: "Could not create Survey" });
    }
}

module.exports.get = async (event) => { 
    const { id } = event.pathparams;
    const TableName = process.env.DYNAMODB_TABLE;
    try { 
        const params = {
            TableName,
            IndexName: "sk-pk-index",
            KeyConditionExpression: 'sk = :id',
            ExpressionAttributeValues: {
                ':id': 'SURVEY#' + id
            }
        }

        const data = await dynamodb.query(params).promise();
        if (data.Count > 0) {
            return sendResponse(200, { message: 'Survey has been retrieved successfully', data: data.Items[0] });
        } else {
            return sendResponse(404, { message: 'No survey found' });
        }

    } catch (e) {
        return sendResponse(500, { message: "Could not get Survey" });
    }

}

module.exports.getAll = async (event) => { 
    const { id } = event.pathParameters;
    const TableName = process.env.DYNAMODB_TABLE;

    try { 
        const params = {
            TableName,

            KeyConditionExpression: 'pk = :id and begins_with :survey_prefix',
            ExpressionAttributeValues: {
                ':id': 'CUSTOMER#' + id,
                ':survey_prefix': 'SURVEY#'
            }
        }

        const data = await dynamodb.query(params).promise();
        if (data.Count > 0) {
            return sendResponse(200, { message: 'Surveys have been retrieved successfully', data: data.Items });
        } else {
            return sendResponse(404, { message: 'No surveys found' });
        }


    }catch(error) {
        return sendResponse(500, { message: "Could not get Surveys" });
    }

}