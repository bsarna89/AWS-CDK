import { SyntheticEvent, useState } from "react";
import { AuthService } from "../services/AuthService";
import { Navigate } from "react-router-dom";


type LoginProps ={
    authService: AuthService,
    setUserNameCb: (userName: string) => void;
}


export default function LogingComp({authService, setUserNameCb}: LoginProps){
    const [userName,setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loginSuccess, setLoginSucceess] = useState<boolean>(false);


    const handleSubmit = async (event: SyntheticEvent) =>{
        event.preventDefault();
        if(userName && password){
            const loginResponse = await authService.login(userName, password);
            const userName2 = authService.getUserName();
            if(userName2){
                setUserNameCb(userName2);
            }
            if(loginResponse){
                setLoginSucceess(true);
            }else{
                setErrorMessage("Invalid credentials")
            };
        }else{
            setErrorMessage("user name and password required")
        }
    }


function renderLoginResult(){
   if(errorMessage){
    return <label> {errorMessage}</label>;
   }    
}

return(
    <div>
      {loginSuccess && <Navigate to="/profile" replace={true} />}
      <h2> Please login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label> User Name</label>
        <input
         value={userName}
         onChange={(e)=>{setUserName(e.target.value)}}
        ></input>
        <br></br>
        <br></br>
        <label> Password</label>
        <input
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        type="password"
        >
        </input>
        <br></br>
        <br></br>
        <input type="submit" value="Login"></input>
      </form>
      <br></br>
      <br></br>
      {renderLoginResult()}
    </div>
)
}