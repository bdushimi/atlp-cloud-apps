// Load the AWS SDK for JS
var AWS = require("aws-sdk");

// Configure the AWS region in which the dynamodb was created in
AWS.config.update({ region: 'us-east-1' });

// Create the Document Client interface for DynamoDB
var dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = dynamodb;