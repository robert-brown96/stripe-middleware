import * as sst from "@serverless-stack/resources";

export default class StorageStack extends sst.Stack {
    // export table publicly
    table;

    // export bucket publicly
    bucket;

    constructor(scope, id, props) {
        super(scope, id, props);

        // Create the DynamoDB table
        this.table = new sst.Table(this, "NetsuiteAccounts", {
            // add user id and note id
            fields: {
                realm: sst.TableFieldType.STRING,
                consumerKey: sst.TableFieldType.STRING,
                consumerSecret: sst.TableFieldType.STRING,
                tokenId: sst.TableFieldType.STRING,
                tokenSecret: sst.TableFieldType.STRING,
                url: sst.TableFieldType.STRING
            },
            // create index
            primaryIndex: { partitionKey: "realm" }
        });

        // Create an S3 bucket
        this.bucket = new sst.Bucket(this, "Uploads", {
            s3Bucket: {
                // Allow client side access to the bucket from a different domain
                cors: [
                    {
                        maxAge: 3000,
                        allowedOrigins: ["*"],
                        allowedHeaders: ["*"],
                        allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"]
                    }
                ]
            }
        });
    }
}
