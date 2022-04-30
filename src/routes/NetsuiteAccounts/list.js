import AWS from "aws-sdk";
import * as uuid from "uuid";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async event => {
    console.log(JSON.stringify(event));
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: `Hello, World! Your request was received at ${event.requestContext.time}.`
    };
};
