export function Topbar(){

   return (
  <div className="flex justify-between items-center bg-green-200 border-2 border-black rounded-md max-w-full mx-2 my-5 p-3 ">
    {/* Logo / App Name */}
    <div className="flex flex-col">
    <div className="text-4xl font-bold text-emerald-900 drop-shadow-[0_0_2px_white] tracking-wide">
      P-Pay💸
    </div>
    <div className="text-sm font-semibold text-black mt-1">
      Your dummy UPI App
    </div>
  </div>

    {/* User Info */}
    <div className="flex items-center space-x-4">
      {/* Greeting */}
      <div className="text-xl font-semibold text-black">
        Hello
      </div>

      {/* User Avatar */}
      <div className="h-12 w-12 rounded-full bg-slate-200 border-2 border-black flex items-center justify-center">
        <span className="text-xl font-semibold text-black">
          U
        </span>
      </div>
    </div>
  </div>)
}