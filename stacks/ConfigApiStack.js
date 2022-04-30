import * as sst from "@serverless-stack/resources";

export default class ConfigApiStack extends sst.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        props.api.addRoutes(this, {
            // netsuite account endpoints
            "GET    /netsuiteaccounts": "src/routes/NetsuiteAccounts/list.main",
            "POST   /netsuiteaccounts":
                "src/routes/NetsuiteAccounts/create.main",
            "PUT    /netsuiteaccounts/{id}":
                "src/routes/NetsuiteAccounts/update.main",
            "DELETE    /netsuiteaccounts/{id}":
                "src/routes/NetsuiteAccounts/delete.main",
            "GET    /netsuiteaccounts/{id}":
                "src/routes/NetsuiteAccounts/get.main",
            // stripe account endpoints
            "POST    /stripeaccounts": "src/routes/StripeAccounts/create.main",
            "GET    /stripeaccounts": "src/routes/StripeAccounts/list.main",
            "GET    /stripeaccounts/{id}": "src/routes/StripeAccounts/get.main",
            "PUT    /stripeaccounts/{id}":
                "src/routes/StripeAccounts/update.main",
            "DELETE /stripeaccounts/{id}":
                "src/routes/StripeAccounts/delete.main"
        });
    }
}
