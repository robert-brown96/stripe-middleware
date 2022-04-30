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

        this.api = new sst.Api(this, "Api", {
            defaultFunctionProps: {
                // pass in table to api
                environment: {
                    NS_ACCOUNT_TABLE: ns_account_table.tableName,
                    STRIPE_ACCOUNT_TABLE: stripe_account_table.tableName
                }
            },
            routes: {
                "GET    /": "/src/lambda.handler"
            }
        });

        // Allow the API to access the table
        this.api.attachPermissions([ns_account_table, stripe_account_table]);

        // Show the API endpoint in the output
        this.addOutputs({
            ApiEndpoint: this.api.url
        });
    }
}
