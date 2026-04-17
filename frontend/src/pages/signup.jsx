import { useState } from "react";
import { BottomWarning } from "../components/bottom";
import { Button } from "../components/button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/input";
import { SubHeading } from "../components/subheading";
import { signup } from "../apis/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Using Sonner toast

export const SignUp = () => {
    const navigate = useNavigate();
    const [Form, setForm] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
    });
    

    const handleChange = (field, value) => {
        setForm({ ...Form, [field]: value });
    };

    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = async () => {
        if (!Form.username || !Form.password || !Form.firstname || !Form.lastname) {
            toast.error("Please fill all fields!");
            return; // stop execution
        }

        if (submitting)
            return;
        setSubmitting(true);

        try {
            const res = await signup(Form);
            if (res.status === 211 || !res.data.token) {
                toast.error(res.data.message || "Sign up failed!");
                return;
            }

            // Success
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("userData", JSON.stringify(res.data.user));
            toast.success(res.data.message || "Signed up successfully! 🎉");
            navigate("/dashboard");

        } catch (err) {
            toast.error(err.response?.data?.message || "Sign up failed ❌");
        } finally {
            setSubmitting(false);
        }
    };
  return (
    <div className="bg-green-900 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center">
        {/* Header */}
        <div className="text-white text-center py-4 w-full">
          <div className="text-5xl font-extrabold pl-4">P-Pay 💸</div>
          <div className="text-sm font-medium mt-1 text-white underline">
            Your dummy UPI App
          </div>
        </div>

        {/* Form Container */}
        <div className="rounded-lg bg-white w-80 text-center p-4 h-max">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter Your Information to Create an Account"} />

          <InputBox
            label={"example@mail.com"}
            Head={"Username"}
            value={Form.username}
            onChange={(v) => handleChange("username", v)}
          />

          <InputBox
            label={"Enter Password"}
            Head={"Password"}
            value={Form.password}
            onChange={(v) => handleChange("password", v)}
          />

          <InputBox
            label={"Emiway"}
            Head={"First Name"}
            value={Form.firstname}
            onChange={(v) => handleChange("firstname", v)}
          />

          <InputBox
            label={"Bantai"}
            Head={"Last Name"}
            value={Form.lastname}
            onChange={(v) => handleChange("lastname", v)}
          />

          <Button
            label={submitting ? "Signing you up..." : "Sign up"}
            onClick={handleSubmit}
          />

          <BottomWarning
            label={"Already Have an Account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
