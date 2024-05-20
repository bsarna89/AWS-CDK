import { AuthService } from "./AuthService";


async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login(
      "username",
      "password"
    )

    // need to get JWT token
    console.log(loginResult)
}


testAuth();