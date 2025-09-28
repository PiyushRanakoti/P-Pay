import { useEffect, useState } from "react"
import { Button } from "./button"
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../apis/api";

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter,setFilter] = useState("")

     const userDataString = sessionStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    
    const FirstName = userData.firstname
    const LastName = userData.lastname
    const id = userData.id

    useEffect(() => {
        const handler = setTimeout(() => {
            // Always call getUsers, even if filter is empty
            getUsers(filter)
                .then(res => setUsers(res.data.user))
                .catch(err => console.log(err));
        }, 400); // 300ms debounce

        return () => clearTimeout(handler);
    }, [filter]);

    return <div>

        <div className="font-bold mt-6 ml-3 text-2xl">
            Users
        </div>

   <div className="my-2 ml-1 mr-2">
    
            <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-800 font-semibold" onChange={function (e){
                setFilter(e.target.value)
            }}></input>
  
        </div> 
       
       
            
        <div>
            {users.filter(user => user._id !== id)
            .map(user => <User key={user._id} user={user} />)}
        </div>
    </div>
}

function User({user}) {
    const navigate = useNavigate()
    const Name = user.firstname + '-' + user.lastname
    const EncodedName = btoa(Name)
    return (
  <div className="flex justify-between ">

    <div className="flex">
      {/* Avatar */}
      <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-3 mr-2 ml-2">
        <div className="flex flex-col justify-center h-full text-xl">
          {user.firstname[0]}
        </div>
      </div>

      {/* Name + User ID */}
      <div className="mt-2 flex flex-col justify-center h-full">
        <div className="font-semibold">
          {user.firstname} {user.lastname}
        </div>
        <div className="text-sm text-gray-500">
          ID : {user._id.slice(-6)}  {/* <-- Added user ID below name */}
        </div>
      </div>
    </div>

    {/* Send Money Button */}
    <div className="flex flex-col justify-center h-full w-40 mr-8 mt-6">
      <Link to={`/send?id=${user._id}&name=${EncodedName}`}>
        <button className="bg-emerald-800 hover:bg-emerald-900 rounded-md w-45 border-black border-1">
          <div className="text-xl text-white font-semibold">
            Send Money
          </div>
        </button>
      </Link>
    </div>

  </div>
);
}