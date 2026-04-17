import { useNavigate } from "react-router-dom"
import { BottomWarning } from "../components/bottom"
import { Button } from "../components/button"
import { Heading } from "../components/heading"
import { InputBox } from "../components/input"
import { SubHeading } from "../components/subheading"
import { useState } from "react"
import { signin } from "../apis/api"
import { toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";


export const SignIn = () => {
    const [Form, setForm] = useState({ username: "", password: "" }); 
    const handleChange = (field, value) => setForm({ ...Form, [field]: value });
    const [Loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = async () => {
        if(Loading) 
            return;
        setLoading(true)
        try {
            const res = await signin(Form);
            toast.success(res.data.message)
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("userData",JSON.stringify(res.data.user))
            navigate("/dashboard")
           
            
        } catch (err) {
            toast.error(err.response?.data?.message || "Sign in Failed");
        }
        finally{
            setLoading(false)
        }
    };


    return <div className="bg-green-900 h-screen flex justify-center">
         <div className="flex flex-col justify-center">

           <div className="text-white text-center py-4 w-full">
        <div className="text-5xl font-extrabold pl-4">      P-Pay 💸
    </div>
    <div className="text-sm font-medium mt-1 text-white underline pb-4">Your dummy UPI App</div> 
  </div>

            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">

                <Heading label={"Sign In"}/>
                <SubHeading label={"Sign In to use the App"}/>
               
                <InputBox label={'example@mail.com'} Head={'Username'}  value={Form.username}
            onChange={(v) => handleChange("username", v)}/>

                <InputBox label={'Enter Password'} Head={'Password'} 
                value={Form.password}
            onChange={(v) => handleChange("password", v)}/>
               
                <Button
            label={Loading ? "Logging in.." : "Login"}
            onClick={handleSubmit}
          />

                <BottomWarning label={"Don't Have a Account?"} buttonText={"Sign up"} to={"/signup"}/>
            </div>

        </div>
    </div>
}



