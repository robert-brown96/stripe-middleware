import * as sst from "@serverless-stack/resources";

/**
 *
 *
 * @export
 * @class ApiStack
 * @extends {sst.Stack}
 */
export default class ApiStack extends sst.Stack {
    // public reference to api
    api;

    constructor(scope, id, props) {
        super(scope, id, props);

        const { ns_account_table, stripe_account_table } = props;

        const api = new sst.Api(this, "Api", {
            defaultFunctionProps: {
                // pass in table to api
                environment: {
                    NS_ACCOUNT_TABLE: ns_account_table.tableName,
                    STRIPE_ACCOUNT_TABLE: stripe_account_table.tableName
                }
            },
            routes: {
                "GET    /": "/src/lambda.handler",
                // netsuite account endpoints
                "GET    /netsuiteaccounts":
                    "src/routes/NetsuiteAccounts/list.main",
                "POST   /netsuiteaccounts":
                    "src/routes/NetsuiteAccounts/create.main",
                "PUT    /netsuiteaccounts/{id}":
                    "src/routes/NetsuiteAccounts/update.main",
                "DELETE    /netsuiteaccounts/{id}":
                    "src/routes/NetsuiteAccounts/delete.main",
                "GET    /netsuiteaccounts/{id}":
                    "src/routes/NetsuiteAccounts/get.main",
                // stripe account endpoints
                "POST    /stripeaccounts":
                    "src/routes/StripeAccounts/create.main",
                "GET    /stripeaccounts": "src/routes/StripeAccounts/list.main",
                "GET    /stripeaccounts/{id}":
                    "src/routes/StripeAccounts/get.main"
            }
        });

        // Allow the API to access the table
        api.attachPermissions([ns_account_table, stripe_account_table]);

        // Show the API endpoint in the output
        this.addOutputs({
            ApiEndpoint: api.url
        });
    }
}
