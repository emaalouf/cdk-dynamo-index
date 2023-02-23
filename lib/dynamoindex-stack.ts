import * as cdk from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as iam from "aws-cdk-lib/aws-iam";
import { Duration } from "aws-cdk-lib";
import { RemovalPolicy } from "aws-cdk-lib";

const app = new cdk.App();

const stack = new cdk.Stack(app, "MyStack", {
  env: {
    region: "eu-west-1",
  },
});

const table = new dynamodb.Table(stack, "TodoTable", {
  partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING },
  sortKey: { name: "sk", type: dynamodb.AttributeType.STRING },
  removalPolicy: RemovalPolicy.DESTROY,
});

table.addGlobalSecondaryIndex({
  indexName: "GSI1",
  partitionKey: { name: "gsi1pk", type: dynamodb.AttributeType.NUMBER },
  sortKey: { name: "gsi1sk", type: dynamodb.AttributeType.NUMBER },
  projectionType: dynamodb.ProjectionType.ALL,
  readCapacity: 5,
  writeCapacity: 5,
});

table.addLocalSecondaryIndex({
  indexName: "LSI1",
  sortKey: { name: "lsi1sk", type: dynamodb.AttributeType.NUMBER },
  projectionType: dynamodb.ProjectionType.ALL,
  readCapacity: 5,
  writeCapacity: 5,
});

app.synth();
