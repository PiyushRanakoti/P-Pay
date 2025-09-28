import { useNavigate } from "react-router-dom";

export function Topbar() {
  const navigate = useNavigate()

  const userDataString = sessionStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const FirstName = userData.firstname;
  const LastName = userData.lastname;
  const id = userData.id;

  function Logout(){
      sessionStorage.clear();
      navigate('/signin')
      alert("Logged Out SuccessFully!!")

  }

  return (
    <div className="flex justify-between items-center bg-green-200 border-2 border-black rounded-md max-w-full mx-2 my-5 p-3">
      {/* Logo / App Name */}
      <div className="flex flex-col">
        <div className="text-4xl font-bold text-emerald-900 drop-shadow-[0_0_2px_white] tracking-wide">
          P-Pay💸
        </div>
        <div className="text-sm font-semibold text-black mt-1">
          Your dummy UPI App
        </div>
      </div>

      {/* User Info + Logout */}
      <div className="flex items-center space-x-4">
        {/* Greeting */}
        <div className="text-xl font-semibold text-black">
          {`${FirstName} ${LastName}`}
        </div>

        {/* User Avatar */}
        <div className="h-12 w-12 rounded-full bg-slate-200 border-2 border-black flex items-center justify-center">
          <span className="text-xl font-semibold text-black">{FirstName[0]}</span>
        </div>

        {/* Logout Button */}
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold text-sm px-2 py-1 rounded border-1 border-black" onClick={Logout}>
            Logout
          </button>
      </div>
    </div>
  );
}
