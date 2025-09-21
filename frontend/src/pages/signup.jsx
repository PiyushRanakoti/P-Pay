import { useState } from "react"
import { BottomWarning } from "../components/bottom"
import { Button } from "../components/button"
import { Heading } from "../components/heading"
import { InputBox } from "../components/input"
import { SubHeading } from "../components/subheading"
import { signup } from "../apis/api"
import { useNavigate } from "react-router-dom"

export const SignUp = () => {
    const navigate = useNavigate()
    const [Form, setForm] = useState({
        firstname : "",
        lastname : "",
        username : "", 
        password : ""
    });

    const handleChange = (field, value) => {
        setForm({ ...Form, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            const res = await signup(Form);
            sessionStorage.setItem("token",res.data.token) 
            navigate('/dashboard')
        } catch (err){
            err = res.data.message
            alert(err);
        }
    };

    return <div className="bg-green-900 h-screen flex justify-center">
        
         <div className="flex flex-col justify-center">
           <div className="text-white text-center py-4 w-full">
        <div className="text-5xl font-extrabold pl-4">      P-Pay 💸
    </div>
    <div className="text-sm font-medium mt-1 text-white underline">Your dummy UPI App</div> 
  </div>

            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"}/>
                <SubHeading label={"Enter Your Information to Create an Account"}/>
               
                <InputBox label={'example@mail.com'} Head={'Username'}  value={Form.username}
            onChange={(v) => handleChange("username", v)}/>

                <InputBox label={'Enter Password'} Head={'Password'} 
                value={Form.password}
            onChange={(v) => handleChange("password", v)}/>

                <InputBox label={'Narendra..'} Head={'FirstName'}
                value={Form.firstname}
            onChange={(v) => handleChange("firstname", v)}/>

                <InputBox label={'Modi...'} Head={'LastName'}
                value={Form.lastname}
            onChange={(v) => handleChange("lastname", v)}/>

                <Button label={"Submit"} onClick={handleSubmit} ></Button>

                <BottomWarning label={"Already Have an Account?"} buttonText={"Sign in"}  to={"/signin"}/>
            </div>

        </div>
    </div>
}