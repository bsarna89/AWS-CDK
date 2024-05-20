import { Amplify } from "aws-amplify";
import { signIn } from "@aws-amplify/auth";

const awsRegion = "eu-west-1";
Amplify.configure({
  Auth: {
    Cognito:{
        userPoolId: "region+id",
        userPoolClientId: "clienID",
    }

  },
});

export class AuthService {
  public async login(username: string, password: string) {
    const result = await signIn({ username, password });
    return result;
  }
}
