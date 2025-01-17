import React from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import SignUppage from './pages/auth/SignUppage'
import LoginPage from './pages/auth/LoginPage'

import Sidebar from './components/common/SideBar'
import RightPanel from './components/common/RigntPanel'
import NotificationPage from './pages/notification/Notification'
import ProfilePage from './pages/profile/ProfilePages'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './components/common/LoadingSpinner'

function App() {
  const {data:authUser,isLoading}=useQuery({
    queryKey:['authUser'],
    queryFn:async()=>{
      try {
        const res = await fetch("/api/auth/me");
				const data = await res.json();
				if (data.error) return null;
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				console.log("authUser is here:", data);
				return data;
      } catch (error) {
        console.error('An error occurred:', error.message);
        throw new Error(error.message);
      }
      
    },
    retry:false
  })
  if (isLoading) {
		return (
			<div className='h-screen flex justify-center items-center'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}

  return (
    <>
      
      <div className='flex max-w-6xl mx-auto'>
        {authUser && <Sidebar/> }
       
			<Routes>
				<Route path='/' element={authUser?<HomePage />:<Navigate to='/login'/>} />
				<Route path='/signup' element={!authUser?<SignUppage />:<Navigate to='/'/>} />
				<Route path='/login' element={!authUser?<LoginPage />:<Navigate to='/'/>} />
        <Route path='/notifications' element={authUser?<NotificationPage/>:<Navigate to='/login'/>}/>
        <Route path='/profile/:username' element={authUser?<ProfilePage/>:<Navigate to='/login'/>}/>

			</Routes>
    {  authUser &&<RightPanel/>}
      <Toaster/>
		</div>
  
      
     
    </>
  )
}

export default App
