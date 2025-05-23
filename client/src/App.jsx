import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Login from './Components/Login'
import { AppContext } from './context/AppContext'
import { useContext } from 'react'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const {showLogin} = useContext(AppContext)

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <Navbar />

    {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/result' element={<Result />}/>
        <Route path='/buycredit' element={<BuyCredit />}/>
       </Routes>
    <Footer />
    </div>
  )
}

export default App
