import AWS from "aws-sdk";

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
        TableName: process.env.STRIPE_ACCOUNT_TABLE,
        Key: {
            publishableKey: event.pathParameters.id
        },
        UpdateExpression: `SET ${setVals.join(",")}`,
        ExpressionAttributeValues: {
            ...(data.secretKey && { ":secretKey": data.secretKey }),
            ...(data.webhookSecret && { ":webhookSecret": data.webhookSecret })
        },
        ReturnValues: "ALL_NEW"
    };

    // TODO: Not rejecting dups
    return await dynamoDb
        .update(updateParams)
        .promise()
        .then(res => {
            return { statusCode: 200, body: JSON.stringify(res) };
        })
        .catch(e => {
            return { statusCode: 404, body: JSON.stringify(e) };
        });
}
