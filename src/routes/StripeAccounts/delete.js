import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export const main = async event => {
    try {
        console.log(JSON.stringify(event));
        const delParams = {
            TableName: process.env.STRIPE_ACCOUNT_TABLE,
            // GET rows where parameters match
            Key: {
                publishableKey: event.pathParameters.id
            }
        };
        return await dynamoDb
            .delete(delParams)
            .promise()
            .then(res => {
                return { statusCode: 200, body: JSON.stringify(res) };
            })
            .catch(e => {
                return { statusCode: 404, body: JSON.stringify(e) };
            });
    } catch (e) {
        console.error(e);
        return { statusCode: 404, body: JSON.stringify({ success: false }) };
    }
};
