import { Amplify } from "aws-amplify";
import { signIn,  fetchAuthSession, signOut  } from "@aws-amplify/auth";
import {AuthStack} from "../../../space-finder/outputs.json";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";


const awsRegion = 'eu-west-1';
AuthStack.SpaceUserPoolId
Amplify.configure({
  Auth: {
    Cognito:{
        userPoolId: AuthStack.SpaceUserPoolId,
        userPoolClientId: AuthStack.SpacesUserPoolClientId,
        identityPoolId: AuthStack.SpacesIdentityPoolId,        
    }

  },
});
export class AuthService {
    private user: any;
    public jwtToken: any;
    private temporaryCredentials: any;

    public async login(username: string, password: string) {
        try{
            const userRes = await signIn({ username, password });
            console.log(userRes);
            const session = await fetchAuthSession();
            this.jwtToken = session?.tokens?.idToken?.toString();
          

            // const currentUser = await getCurrentUser();
           // await signOut();

         this.user = username
            return this.user;
        }catch(error){
             console.log(error);
             return undefined
        }
    }
    public getUserName(){
        return this.user;
    }
    public async getTemporaryCredentials(){
        if(this.temporaryCredentials){
          return this.temporaryCredentials;
        }
        this.temporaryCredentials = await this.generateTemporaryCredentials();
        return this.temporaryCredentials;
    }


    private async generateTemporaryCredentials() {
      const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/${AuthStack.SpaceUserPoolId}`;
      const cognitoIdentity = new CognitoIdentityClient({
          credentials: fromCognitoIdentityPool({
              clientConfig: {
                  region: awsRegion
              },
              identityPoolId: AuthStack.SpacesIdentityPoolId,
              logins: {
                  [cognitoIdentityPool]: this.jwtToken!
              }
          })
      });
      const credentials = await cognitoIdentity.config.credentials();
      return credentials;
  }
  }