import NetSuiteAccountStack from "./NetSuiteAccountStack";
import ApiStack from "./ApiStack";

export default function main(app) {
    // Set default runtime for all functions
    app.setDefaultFunctionProps({
        runtime: "nodejs14.x"
    });

    //  new MyStack(app, "my-stack");

    const nsAccountStack = new NetSuiteAccountStack(app, "ns-account-stack");
   
    new ApiStack(app, "api-stack", {
              ns_account_table: nsAccountStack.table
    });

    // Add more stacks
}
