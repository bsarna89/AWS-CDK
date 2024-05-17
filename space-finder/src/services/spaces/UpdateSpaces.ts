import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function updateSpaces(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
    
    if(event.queryStringParameters && ('id' in event.queryStringParameters) && event.body){
       
      const parsedBody = JSON.parse(event.body);
      const spaceId = event.queryStringParameters['id'];
      const requestBodyKey = Object.keys(parsedBody)[0];
      const requestBodyValue = parsedBody[requestBodyKey];

      const upadteResult = await ddbClient.send(new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        Key:{
           'id': {S: spaceId}
        },
        UpdateExpression: 'set #zzzNew = :new',
        ExpressionAttributeValues: {
          ':new':{
            S: requestBodyValue
          }
        },
        ExpressionAttributeNames: {
          "#zzzNew": requestBodyKey
        },
        ReturnValues: "UPDATED_NEW"
      }))

      return {
        statusCode: 204,
        body: JSON.stringify(upadteResult.Attributes)
      }

    }

    return{
      statusCode: 404,
      body: JSON.stringify("please provide right querry")
    }


}
