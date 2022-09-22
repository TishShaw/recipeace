import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './UserContext';
import Settings from './pages/Settings';
import UserProfile from './pages/UserProfile';
import Nav from './components/Nav';

const App = () => {
	return (
		<UserProvider>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/' element={<Home />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/profile' element={<UserProfile />} />
				<Route path='/settings' element={<Settings />} />
			</Routes>

			<ToastContainer
				position='bottom-right'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
			/>

			{
			window.location.pathname !== '/login' && window.location.pathname !== '/' ? <div className='md:hidden'>
				<Nav />
			</div> : ''
			}
		</UserProvider>
	);
};

export default App;
