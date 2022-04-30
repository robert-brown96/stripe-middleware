import { Template } from "aws-cdk-lib/assertions";
import * as sst from "@serverless-stack/resources";
import ApiStack from "../stacks/ApiStack";

test("Test API Stack", () => {
    const app = new sst.App();
    // WHEN
    const stack = new ApiStack(app, "api-stack");
    // THEN
    const template = Template.fromStack(stack);
    template.hasResource("AWS::ApiGatewayV2::Api", {});
});
