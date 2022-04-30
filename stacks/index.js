import NetSuiteAccountStack from "./NetSuiteAccountStack";
import StripeAccountStack from "./StripeAccountStack";
import ApiStack from "./ApiStack";

export default function main(app) {
    // Set default runtime for all functions
    app.setDefaultFunctionProps({
        runtime: "nodejs14.x"
    });

    //  create ns account table stack
    const nsAccountStack = new NetSuiteAccountStack(app, "ns-account-stack");

    // create stripe account table stack
    const stripeAccountStack = new StripeAccountStack(
        app,
        "stripe-account-stack"
    );

    // main api stack
    new ApiStack(app, "api-stack", {
        ns_account_table: nsAccountStack.table,
        stripe_account_table: stripeAccountStack.table
    });

    // Add more stacks
}
