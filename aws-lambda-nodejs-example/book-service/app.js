const { DynamoDB } = require('aws-sdk');
const dynamoDb = new DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;


exports.create = async (event, context) => { 
    const { author, title, tag } = JSON.parse(event.body);
    const params = {
        TableName: tableName,
        Item: {
            author,
            title,
            tag,
        },
    };

    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }
}


exports.getAll = async (event, context) => {
    const params = {
        TableName: tableName,
    };

    try {
        const data = await dynamoDb.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }
}


exports.get = async (event, context) => {
    const { id } = event.pathParameters;
    const params = {
        TableName: tableName,
        Key: {
            id,
        },
    };

    try {
        const data = await dynamoDb.get(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Item),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }
}


exports.update = async (event, context) => {
    const { id } = event.pathParameters;
    const { author, title, tag } = JSON.parse(event.body);
    const params = {
        TableName: tableName,
        Key: {
            id,
        },
        UpdateExpression: 'set author = :author, title = :title, tag = :tag',
        ExpressionAttributeValues: {
            ':author': author,
            ':title': title,
            ':tag': tag,
        },
        ReturnValues: 'ALL_NEW',
    };

    try {
        const data = await dynamoDb.update(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Attributes),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }
}


exports.delete = async (event, context) => {
    const { id } = event.pathParameters;
    const params = {
        TableName: tableName,
        Key: {
            id,
        },
    };

    try {
        await dynamoDb.delete(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({}),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }
}
