// Load the AWS SDK for JS
var AWS = require("aws-sdk");

// Configure the AWS region in which the dynamodb was created in
AWS.config.update({region: 'us-east-1'});
const tableName = "basicSongsTable"

// -----------------------------------------
// Create the Service interface for dynamoDB
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// Get a single item with the getItem operation
async function logSingleItem(){
    try {
        var params = {
            Key: {
             "artist": {S: "Arturus Ardvarkian"}, 
             "song": {S: "Carrot Eton"}
            }, 
            TableName: tableName
        };
        var result = await dynamodb.getItem(params).promise()
        console.log(JSON.stringify(result))
    } catch (error) {
        console.error(error);
    }
}
logSingleItem()

// Use the query operation to get all song by artist Arturus Ardvarkian
async function logSongsByArtist(){
    try {
        var params = {
            KeyConditionExpression: 'artist = :artist',
            ExpressionAttributeValues: {
                ':artist': {'S': 'Arturus Ardvarkian'}
            },
            TableName: tableName
        };
        var result = await dynamodb.query(params).promise()
        console.log(JSON.stringify(result))
    } catch (error) {
        console.error(error);
    }
}
logSongsByArtist()


// Query songs by artist "Arturus Ardvarkian" that start with "C"
async function logArtistSongsStartingWithC(){
    try {
        var params = {
            KeyConditionExpression: 'artist = :artist AND begins_with ( song , :song )',
            ExpressionAttributeValues: {
                ':artist': {'S': 'Arturus Ardvarkian'},
                ':song': {'S': 'C'}
            },
            TableName: tableName
        };
        var result = await dynamodb.query(params).promise()
        console.log(JSON.stringify(result))
    } catch (error) {
        console.error(error);
    }
}
logArtistSongsStartingWithC()

// Use the DynamoDB client scan operation to retrieve all items of the table
async function scanForResults(){
    try {
        var params = {
            TableName: tableName
        };
        var result = await dynamodb.scan(params).promise()
        console.log(JSON.stringify(result))
    } catch (error) {
        console.error(error);
    }
}
scanForResults()

// Note that all service interface results above contain the data type descriptors
// E.g. They follow the format artist: {'S': 'Name of the Artist'}
// That is not the case for the Document Client

// -------------------------------------------------
// Create the Document Client interface for DynamoDB
var ddbDocumentClient = new AWS.DynamoDB.DocumentClient();

// Get a single item with the getItem operation and Document Client
async function logSingleItemDdbDc(){
    try {
        var params = {
            Key: {
             "artist": "Arturus Ardvarkian", 
             "song": "Carrot Eton"
            }, 
            TableName: tableName
        };
        var result = await ddbDocumentClient.get(params).promise()
        console.log(JSON.stringify(result))
    } catch (error) {
        console.error(error);
    }
}
logSingleItemDdbDc()

// Query all songs by artist Arturus Ardvarkian with the Document Client
async function logSongsByArtistDdbDc(){
    try {
        var params = {
            KeyConditionExpression: 'artist = :artist',
            ExpressionAttributeValues: {
                ':artist': 'Arturus Ardvarkian'
            },
            TableName: tableName
        };
        var result = await ddbDocumentClient.query(params).promise()
        console.log(JSON.stringify(result))
    } catch (error) {
        console.error(error);
    }
}
logSongsByArtistDdbDc()

// Query all songs by artist Arturus Ardvarkian that start with "C" using the Document Client
async function logArtistSongsStartingWithCDdbDc(){
    try {
        var params = {
            KeyConditionExpression: 'artist = :artist AND begins_with ( song , :song )',
            ExpressionAttributeValues: {
                ':artist': 'Arturus Ardvarkian',
                ':song': 'C'
            },
            TableName: tableName
        };
        var result = await ddbDocumentClient.query(params).promise()
        console.log(JSON.stringify(result))
    } catch (error) {
        console.error(error);
    }
}
logArtistSongsStartingWithCDdbDc()


// Scan table for all items using the Document Client
async function scanForResultsDdbDc(){
    try {
        var params = {
            TableName: tableName
        };
        var result = await ddbDocumentClient.scan(params).promise()
        console.log(JSON.stringify(result))
    } catch (error) {
        console.error(error);
    }
}
scanForResultsDdbDc()
