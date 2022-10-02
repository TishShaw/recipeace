import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './UserContext';
import About from './pages/About';
import UserProfile from './pages/UserProfile';
import Nav from './components/Nav';
import RecipeDetails from './pages/RecipeDetails';

const App = () => {
	return (
		<UserProvider>
			{window.location.pathname !== '/login' &&
			window.location.pathname !== '/' ?
				<Nav />
			: null}
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/' element={<Home />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/recipe-details/:id' element={<RecipeDetails />} />
				<Route path='/profile/:id' element={<UserProfile />} />
				<Route path='/about-us' element={<About />} />
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
		</UserProvider>
	);
};

export default App;
