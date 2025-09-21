export const DepositMoney = () => {
    return <div class="flex justify-center h-screen bg-green-900">
        <div className="h-full flex flex-col justify-center">
               <div className="text-white text-center py-1 w-full">
        <div className="text-5xl font-extrabold pl-4">      P-Pay 💸
    </div>
    <div className="text-sm font-medium mt-1 text-white underline pb-4">Your dummy UPI App</div> 
  </div>
            
            <div class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                 
                <div className="flex justify-center h-6 grid-cols-1">
                    
                     <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span class="text-2xl text-white">A</span>
                    </div>
                    
                    <div className="mt-2.5 ml-3 mr-8 font-semibold text-lg text-black w-2.5">
                        Name
               </div>

                </div>

     
                <div class="flex flex-col pt-2 ">
                <h2 class="text-3xl font-bold text-center">Deposit Money</h2>

                <h5 class="text-md font-semibold text-center" >into your account</h5>
                
                <div class="space-y-4 pt-5">
                    <div class="space-y-2">
                    <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        type="number"
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xl font-semibold"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                    <button class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 hover:bg-green-700  text-white">
                        Deposit Money 
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
}