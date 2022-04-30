import AWS from "aws-sdk";
import * as uuid from "uuid";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event) {
    const data = JSON.parse(event.body);
    console.log(JSON.stringify(event));
    const keys = Object.keys(data);

    let setVals = keys.reduce((result, k) => {
        console.log(`checking key ${k}`);
        if (data[k] && data[k] !== "" && data[k] !== "null")
            result.push(`${k} = :${k}`);
        return result;
    }, []);
    console.log(`sets ${JSON.stringify(setVals)}`);

    const updateParams = {
        TableName: process.env.NS_ACCOUNT_TABLE,
        Key: {
            realm: event.pathParameters.id
        },
        UpdateExpression: `SET ${setVals.join(",")}`,
        ExpressionAttributeValues: {
            ...(data.tokenId && { ":tokenId": data.tokenId }),
            ...(data.tokenSecret && { ":tokenSecret": data.tokenSecret }),
            ...(data.consumerSecret && {
                ":consumerSecret": data.consumerSecret
            }),
            ...(data.consumerKey && { ":consumerKey": data.consumerKey }),
            ...(data.url && { ":url": data.url })
        },
        ReturnValues: "ALL_NEW"
    };

    // TODO: Not rejecting dups
    return await dynamoDb.update(updateParams).promise();
}
