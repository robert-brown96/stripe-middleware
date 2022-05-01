import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export const main = async event => {
    console.log(JSON.stringify(event));
    const delParams = {
        TableName: process.env.NS_ACCOUNT_TABLE,
        // GET rows where parameters match
        Key: {
            realm: event.pathParameters.id
        }
    };
    const results = await dynamoDb.delete(delParams).promise();

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(results)
    };
};
