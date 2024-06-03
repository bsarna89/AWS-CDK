import { SNSEvent } from "aws-lambda";
import { handler } from "./handlers";


const SNSEvent: SNSEvent = {
    Records:[{
        Sns:{
            Message: "My Message"
        }
    }]
} as any;


handler(SNSEvent, {});