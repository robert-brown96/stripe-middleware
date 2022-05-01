import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

/**
 *
 * @param {*} event
 * @returns
 */
export const main = async event => {
    try {
        console.log(JSON.stringify(event));
        const stripeGetParams = {
            TableName: process.env.STRIPE_ACCOUNT_TABLE,
            // GET rows where parameters match
            Key: {
                publishableKey: event.queryStringParameters.publishableKey
            }
        };
        const stripeResults = await dynamoDb.get(stripeGetParams).promise();

        const stripeItem = stripeResults.Item;
        if (!stripeItem) throw "DID NOT FIND STRIPE ITEM";
        const nsGetParams = {
            TableName: process.env.NS_ACCOUNT_TABLE,
            // GET rows where parameters match
            Key: {
                realm: stripeResults.Item.realm
            }
        };
        const nsResults = await dynamoDb.get(nsGetParams).promise();
        if (!nsResults.Item) throw "DID NOT FIND NETSUTIE AUTH";

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                stripe: stripeItem,
                netsuite: nsResults.Item
            })
        };
    } catch (e) {
        console.error(`error ${e}`);
        return {
            statusCode: 404,
            body: JSON.stringify({ message: e })
        };
    }
};
