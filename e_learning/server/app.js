// // Write your code here
// const cors = require("cors");
// const mongoose = require("mongoose");
// const express = require("express");
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const courseroutes = require('./routes/courseroutes');
// const app = express();

// const PORT = process.env.PORT || 8080;

// const uri = "mongodb+srv://bdushimi:enter123@cluster0.uiu7o.mongodb.net/e-learning?retryWrites=true&w=majority";

// async function listDatabases(client) {
//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// async function main() {

//     const uri = "mongodb+srv://bdushimi:enter123@cluster0.uiu7o.mongodb.net/e-learning?retryWrites=true&w=majority";

//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();

//         // Make the appropriate DB calls
//         await listDatabases(client);

//     } catch (err) {

//         console.error(err)

//     } finally {

//         await client.close()
//     }

// }

// // main().catch(console.error);

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.Promise = global.Promise
// mongoose.connection.on('error', (err) => {
//     console.error(err.message)
// })

// require("./models/coursemodel")

// app.use(cors());
// app.use(courseroutes);

// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}...`);
// });



// Refactoring
// Adding handlerMain function

/* Importing the AWS SDK for JavaScript in Node.js. */
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const documentClient = new AWS.DynamoDB.DocumentClient();
const parser = require('lambda-multipart-parser');
const data = require('./data/courses.json');
const { uploadDirectory } = require('s3-lambo');

const tableName = process.env.DYNAMO_TABLE;


let response;

exports.handlerMain = async (event) => {
    try {
        if (event.path === '/') {
            response = {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: "Backend is running!"
                })
            }
        }
        else if (event.path === '/loadAllCourses') {
            await data.map(async (item) => {
                const params = {
                    TableName: tableName,
                    Item: {
                        "title": item.title,
                        "author": item.author,
                        "overview": item.overview,
                        "free": item.free,
                        "img": item.img,
                        "url": item.url
                    }
                };

                await documentClient.put(params, (err, course) => {
                    if (err) {
                        console.error("Can't add course.");
                    } else {
                        console.log("Succeeded adding an item for this course: ", course);
                    }
                });
            });

            response = {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: "Data has been inserted successfully"
                })
            }
        }
        else if (event.path === '/fetchAllCourses') {
            const params = {
                TableName: tableName
            };
            const results = await documentClient.scan(params).promise();
            response = {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(results.Items)
            }

        }
    } catch (err) {
        response = {
            statusCode: 500,
            status: 'error',
            body: JSON.stringify({
                message: err
            })
        }
    }

    return response;
};


exports.handler = async (event) => {
    try {
        const result = await parser.parse(event)

        if (event.httpMethod === "POST") {
            await uploadDirectory({
                path: result.folder,
                params: {
                    BUCKET: process.env.BUCKET_NAME
                }
            });

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Migration successful!"
                })
            }
        } else if (event.httpMethod === "PUT") {
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: result.filename,
            };

            const s3Object = await s3.getObject(params).promise();
            let body = new Buffer(s3Object.Body).toString("utf8");
            body = body + process.env.API_ENDPOINT;

            const newParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: result.filename,
                Body: body,
                ACL: "public-read"
            };

            await s3.putObject(newParams).promise();
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Migration successful!",
                    data: body
                })
            };
        }


    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: err.stack })
        };
    }
}