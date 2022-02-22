// Load the AWS SDK for JS
import { config, DynamoDB } from "aws-sdk";

// Configure the AWS region in which the dynamodb was created in
config.update({ region: 'us-east-1' });

// Create the Document Client interface for DynamoDB
var dynamodb = new DynamoDB.DocumentClient();

export default dynamodb;