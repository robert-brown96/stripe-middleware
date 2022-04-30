import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async event => {
    console.log(JSON.stringify(event));
    const listParams = {
        TableName: process.env.STRIPE_ACCOUNT_TABLE
    };
    const results = await dynamoDb.scan(listParams).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(results.Items)
    };
};
