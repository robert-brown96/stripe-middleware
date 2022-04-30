import * as sst from "@serverless-stack/resources";

export default class StorageStack extends sst.Stack {
    // export table publicly
    table;

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

        this.api = new sst.Api(this, "Api", {
            defaultFunctionProps: {
                // pass in table to api
                environment: {
                    tableName: this.table
                },
                routes: {
                    "GET    /netsuiteaccounts":
                        "src/NetsuiteAccounts/list.main",
                    "POST    /netsuiteaccounts":
                        "src/NetsuiteAccounts/create.main",
                    "PUT    /netsuiteaccounts/{id}":
                        "src/NetsuiteAccounts/update.main",
                    "DELETE    /netsuiteaccounts/{id}":
                        "src/NetsuiteAccounts/delete.main",
                    "GET    /netsuiteaccounts/{id}":
                        "src/NetsuiteAccounts/get.main"
                }
            }
        });

        // Allow the API to access the table
        api.attachPermissions([table]);

        // Show the API endpoint in the output
        this.addOutputs({
            ApiEndpoint: api.url
        });
    }
}
