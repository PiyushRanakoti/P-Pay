import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom'
import  { SignUp }  from './pages/signup';
import { SignIn } from './pages/signin';
import { DashBoard } from './pages/dashborad';
import { SendMoney } from './pages/SendMoney';
import { DepositMoney } from './pages/Deposit';
import { NotFoundPage } from './pages/error';

export function PrivateRoute({ children }) {
  const token = sessionStorage.getItem("token");
  
  if(token){
    return children 
  }
  else{
    alert("Please Sign in First")
    return <Navigate to="/signin" replace />;
  }
}

function App() {

  return (
   <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <SignIn/> }/>

          <Route path='/signup' element={ <SignUp/> }/>
          <Route path='/signin' element={ <SignIn/> }/>
          
          <Route path='/dashboard' element={<PrivateRoute> <DashBoard /> </PrivateRoute>}/> 
          <Route path='/send' element={<PrivateRoute> <SendMoney /> </PrivateRoute>}/> 
          <Route path='/deposit' element={<PrivateRoute> <DepositMoney /> </PrivateRoute>}/> 

          {/* <Route path='/send' element= { <SendMoney/> }/> 
          <Route path='/deposit' element= { <DepositMoney/> }/>  */}


        {/* -------INValid route Handling */}
          <Route path="*" element={<Navigate to="/404" replace />} />
          <Route path="/404" element={<NotFoundPage/>} />

        </Routes>
      
      </BrowserRouter>
   </>
)
}

export default App
