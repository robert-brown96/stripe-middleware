import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export const main = async event => {
    console.log(JSON.stringify(event));
    const getParams = {
        TableName: process.env.STRIPE_ACCOUNT_TABLE,
        // GET rows where parameters match
        Key: {
            publishableKey: event.pathParameters.id
        }
    };
    const results = await dynamoDb.get(getParams).promise();

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(results.Item)
    };
};
