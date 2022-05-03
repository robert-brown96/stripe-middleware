import { DynamoDB } from "aws-sdk";
import * as stripe from "stripe";
import * as fullAuth from "../routes/get-with-ns-auth";
const dynamoDb = new DynamoDB.DocumentClient();

export const main = async event => {
    const authObj = await fullAuth.main({
        queryStringParameters: {
            publishableKey: event.queryStringParameters.publishableKey
        }
    });
    console.log(JSON.stringify(authObj.body));
    return { body: JSON.stringify(authObj.body) };
};
