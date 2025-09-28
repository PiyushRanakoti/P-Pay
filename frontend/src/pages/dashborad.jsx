import { useEffect } from "react";
import { Balancebar } from "../components/Balancebar";
import { Topbar } from "../components/topbar";
import { Users } from "../components/Usercompo";

export function DashBoard(){
    return  (
    <div >
      <Topbar />
      <Balancebar />
      <Users />
    </div>
  );
}