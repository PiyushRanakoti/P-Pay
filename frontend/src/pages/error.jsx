import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    const token = sessionStorage.getItem("token");
    navigate(token ? "/dashboard" : "/signin");
  };

  return (

    <div className="bg-green-900 h-screen flex justify-center">
            
             <div className="flex flex-col ">
               <div className="text-white text-center py-4 w-full">
            <div className="text-5xl font-extrabold pl-4">      P-Pay 💸
        </div>
        <div className="text-sm font-medium mt-1 text-white underline">Your dummy UPI App</div> 
      </div>
    
             <div className="text-white text-center font-semibold flex flex-col justify-center pt-50">
        <h1 className="text-4xl mb-4">Page Not Found!</h1>
        <p className="text-lg">
          Please return to{" "}
          <button
            onClick={handleRedirect}
            className="underline text-blue-400 hover:text-blue-600"
          >
           {sessionStorage.getItem("token") ? "Dashboard" : "Sign in"}
          </button>
        </p>
      </div>
            </div>
        </div>

 
  );
}
