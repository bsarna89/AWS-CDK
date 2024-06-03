import { SNSEvent } from "aws-lambda";

const webHookUrl = "url";

async function handler(
    event: SNSEvent,
    context 
  ){

    for(const recod of event.Records){
       await fetch(webHookUrl, {
          method: "POST",
          body: JSON.stringify(recod.Sns.Message)
    });
    }
  }

  export { handler };