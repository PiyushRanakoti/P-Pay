import { useEffect, useState } from "react"
import { Button } from "./button"
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../apis/api";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("")
  const [loading, setLoading] = useState(false);

  const userDataString = sessionStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const FirstName = userData.firstname
  const LastName = userData.lastname
  const id = userData.id

  useEffect(() => {
    const handler = setTimeout(() => {
      setLoading(true);
      // Always call getUsers, even if filter is empty
      getUsers(filter)
        .then(res => {
          setUsers(res.data.user);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }, 400); // 300ms debounce

    return () => clearTimeout(handler);
  }, [filter]);

  return <div className="ml-2 mr-2">

    <div className="font-bold mt-6 ml-1 text-2xl mb-4 text-slate-700">
      Users
    </div>

    <div className="my-2 ml-1 mr-1">
      <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-emerald-800 font-semibold" onChange={function (e) {
        setFilter(e.target.value)
      }}></input>
    </div>

    {loading ? (
      <div className="space-y-3 mt-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg animate-pulse border border-slate-300">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-20"></div>
            </div>
            <div className="h-8 bg-gray-300 rounded w-24"></div>
          </div>
        ))}
      </div>
    ) : users.filter(user => user._id !== id).length === 0 ? (
      <div className="text-center py-8 text-gray-500 font-semibold">
        No users found
      </div>
    ) : (
      <>
        {/* Table */}
        <div className="overflow-x-auto border border-slate-300 rounded-lg">
      <table className="w-full">
        <thead className="bg-slate-700 text-white">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">User</th>
            <th className="px-4 py-3 text-left font-semibold">User ID</th>
            <th className="px-4 py-3 text-left font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.filter(user => user._id !== id)
            .map(user => {
              const Name = user.firstname + '-' + user.lastname
              const EncodedName = btoa(Name)
              return (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full h-10 w-10 bg-green-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-green-700">{user.firstname[0]}</span>
                      </div>
                      <div>
                        <div className="font-semibold">{user.firstname} {user.lastname}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <span className="text-xs text-gray-500">{user._id.slice(-6)}</span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Link to={`/send?id=${user._id}&name=${EncodedName}`}>
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1 rounded text-sm border-black border-1">
                        Send Money
                      </button>
                    </Link>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
      </>
    )}
  </div>
}