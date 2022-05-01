import AWS from "aws-sdk";
import * as uuid from "uuid";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async event => {
    console.log(JSON.stringify(event));
    const listParams = {
        TableName: process.env.NS_ACCOUNT_TABLE
    };
    const results = await dynamoDb.scan(listParams).promise();

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(results.Items)
    };
};
