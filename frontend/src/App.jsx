import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Toaster } from "sonner";
import "react-toastify/dist/ReactToastify.css";

// Lazy load pages
const SignUp = lazy(() => import('./pages/signup').then(m => ({ default: m.SignUp })));
const SignIn = lazy(() => import('./pages/signin').then(m => ({ default: m.SignIn })));
const DashBoard = lazy(() => import('./pages/dashborad').then(m => ({ default: m.DashBoard })));
const SendMoney = lazy(() => import('./pages/SendMoney').then(m => ({ default: m.SendMoney })));
const DepositMoney = lazy(() => import('./pages/Deposit').then(m => ({ default: m.DepositMoney })));
const TransactionHistoryPage = lazy(() => import('./pages/TransactionHistory').then(m => ({ default: m.TransactionHistoryPage })));
const NotFoundPage = lazy(() => import('./pages/error').then(m => ({ default: m.NotFoundPage })));

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-2xl font-bold text-emerald-900">Loading...</div>
    </div>
  );
}

export function PrivateRoute({ children }) {
  const token = sessionStorage.getItem("token");

  if (token) {
    return children
  }
  else {
    alert("Please Sign in First")
    return <Navigate to="/signin" replace />;
  }
}

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <Suspense fallback={<LoadingSpinner />}>
              <SignIn />
            </Suspense>
          } />

          <Route path='/signup' element={
            <Suspense fallback={<LoadingSpinner />}>
              <SignUp />
            </Suspense>
          } />

          <Route path='/signin' element={
            <Suspense fallback={<LoadingSpinner />}>
              <SignIn />
            </Suspense>
          } />

          <Route path='/dashboard' element={
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <DashBoard />
              </Suspense>
            </PrivateRoute>
          } />

          <Route path='/send' element={
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <SendMoney />
              </Suspense>
            </PrivateRoute>
          } />

          <Route path='/deposit' element={
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <DepositMoney />
              </Suspense>
            </PrivateRoute>
          } />

          <Route path='/history' element={
            <PrivateRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <TransactionHistoryPage />
              </Suspense>
            </PrivateRoute>
          } />

          {/* Invalid route Handling */}
          <Route path="*" element={<Navigate to="/404" replace />} />
          <Route path="/404" element={
            <Suspense fallback={<LoadingSpinner />}>
              <NotFoundPage />
            </Suspense>
          } />

        </Routes>

      </BrowserRouter>

      {/* GLOBAL toast container  */}
      <Toaster position="top-center"
        richColors={true}
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            fontSize: '18px',
            padding: '16px 24px',
            minWidth: '300px',
            borderRadius: '12px',
          },
        }} />

    </>
  )
}

export default App
