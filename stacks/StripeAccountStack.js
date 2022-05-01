import * as sst from "@serverless-stack/resources";

export default class StorageStack extends sst.Stack {
    // export table publicly
    table;

    constructor(scope, id, props) {
        super(scope, id, props);

        // Create the DynamoDB table
        this.table = new sst.Table(this, "StripeAccounts", {
            // add user id and note id
            fields: {
                realm: sst.TableFieldType.STRING,
                publishableKey: sst.TableFieldType.STRING,
                secretKey: sst.TableFieldType.STRING,
                webhookSecret: sst.TableFieldType.STRING
            },
            // create index
            primaryIndex: { partitionKey: "realm", sortKey: "publishableKey" }
        });
    }
}
