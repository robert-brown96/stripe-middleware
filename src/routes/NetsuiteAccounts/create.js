import AWS from "aws-sdk";
import * as uuid from "uuid";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event) {
    const data = JSON.parse(event.body);
    const keys = Object.keys(data);
    console.log(JSON.stringify(data));

    const requireFields = [
        "realm",
        "consumerKey",
        "consumerSecret",
        "tokenId",
        "tokenSecret",
        "url"
    ];
    //TODO: add tests to validate returns of promise
    // only return value if rejected
    const checkPromise = await new Promise((resolve, reject) => {
        requireFields.forEach(f => {
            console.log(`includes ${f} is ${keys.includes(f)}`);
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

    return true;
}
