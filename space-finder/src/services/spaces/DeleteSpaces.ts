import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function deleteSpaces(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
    
    if(event.queryStringParameters && ('id' in event.queryStringParameters)){
       
      const spaceId = event.queryStringParameters['id'];
      await ddbClient.send(new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
        Key:{
           'id': {S: spaceId}
        },
      }))
    
  
      return {
        statusCode: 200,
        body: JSON.stringify("DELETED ITEM")
      }

    }

    return{
      statusCode: 404,
      body: JSON.stringify("please provide right querry for delete")
    }


}
