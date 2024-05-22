import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { updateSpaces } from "./UpdateSpaces";
import { deleteSpaces } from "./DeleteSpaces";
import { addCorsHeader } from "../../infra/Utils";

const ddbCleint = new DynamoDBClient({});

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let message: string;


  try {
    switch (event.httpMethod) {
      case "GET":
        const getResponse = await getSpaces(event, ddbCleint);
        addCorsHeader(getResponse);
        return getResponse;
      case "POST":
        const postResponse = await postSpaces(event, ddbCleint);
        addCorsHeader(postResponse);
        return postResponse;
      case "PUT":
        const updateResponse = await updateSpaces(event, ddbCleint);
        addCorsHeader(updateResponse);
        return updateResponse;
      case "DELETE":
        const deleteResponse = await deleteSpaces(event,ddbCleint);
        addCorsHeader(deleteResponse);
        return deleteResponse;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };
  return response;
}

export { handler };
