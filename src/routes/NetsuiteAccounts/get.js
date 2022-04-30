import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export const main = async event => {
    console.log(JSON.stringify(event));
    const listParams = {
        TableName: process.env.NS_ACCOUNT_TABLE
    };
    const results = await dynamoDb.scan(listParams).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(results.Items)
    };
};
