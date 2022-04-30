import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async event => {
    const data = JSON.parse(event.body);
    const keys = Object.keys(data);
    console.log(JSON.stringify(data));

    const requireFields = [
        "realm",
        "publishableKey",
        "secretKey",
        "webhookSecret"
    ];
    //TODO: add tests to validate returns of promise
    // only return value if rejected
    const checkPromise = await new Promise((resolve, reject) => {
        requireFields.forEach(f => {
            if (!keys.includes(f)) {
                reject(`MUST PROVIDE PARAMETER ${f}`);
            }
        });
        resolve();
    }).catch(e => {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: e })
        };
    });

    // return if the promise was rejected
    if (checkPromise) return checkPromise;

    const createParams = {
        TableName: process.env.STRIPE_ACCOUNT_TABLE,
        Item: {
            realm: data.realm,
            publishableKey: data.publishableKey,
            secretKey: data.secretKey,
            webhookSecret: data.webhookSecret
        }
    };

    // TODO: Not rejecting dups
    return dynamoDb
        .put(createParams)
        .promise()
        .then(res => {
            console.log(`success ${JSON.stringify(res)}`);
            return JSON.stringify({
                success: true,
                publishableKey: createParams.publishableKey
            });
        })
        .catch(e => {
            console.log(`error ${JSON.stringify(e)}`);
            console.error(JSON.stringify(e));
            return {
                statusCode: 402,
                body: JSON.stringify(e)
            };
        });
};
