import { useEffect, useState } from "react"
import { Button } from "./button"
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../apis/api";

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter,setFilter] = useState("")

    useEffect(() => {
        const handler = setTimeout(() => {
            // Always call getUsers, even if filter is empty
            getUsers(filter)
                .then(res => setUsers(res.data.user))
                .catch(err => console.log(err));
        }, 500); // 300ms debounce

        return () => clearTimeout(handler);
    }, [filter]);

    return <div>

        <div className="font-bold mt-6 ml-3 text-2xl">
            Users
        </div>

   <div className="my-2 ml-1 mr-2">
    
            <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200 font-semibold" onChange={function (e){
                setFilter(e.target.value)
            }}></input>
  
        </div> 
       
       
            
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </div>
}

function User({user}) {
    const navigate = useNavigate()
    return <div className="flex justify-between">

        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-3 mr-2 ml-2">
                <div className="flex flex-col justify-center h-full text-xl ">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="mt-2 flex flex-col justify-center h-full">
                <div className="font-semibold">
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full w-40 mr-8 mt-6">
            <Link to={`/send?id=${user._id}&name=${user.firstname}-${user.lastname}`}>
            <button className="bg-emerald-800 hover:bg-emerald-900  rounded-md w-45 border-black border-1" >
                   <div className="text-xl text-white font-semibold">
                     Send Money 
                   </div>
                </button>
            </Link>
        </div>
    </div>
}