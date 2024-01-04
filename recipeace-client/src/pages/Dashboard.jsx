import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { UserContext } from '../UserContext';
import Categories from '../components/Categories';
import CardList from '../components/CardList';
import Spinner from '../components/Spinner';
import Feed from '../components/Feed';

import { MdOutlineCancel } from 'react-icons/md';
import { searchQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from '../components/MasonryLayout';

const Dashboard = () => {
	const { userDetails } = useContext(UserContext);
	const [searchInput, setSearchInput] = useState('');
	const [recipes, setRecipes] = useState('');
	const [catName, setCatName] = useState(null);
	const [loading, setLoading] = useState(false);

	const onSubmitSearch = (e) => {
		e.preventDefault();
		if (searchInput !== '') {
			const query = searchQuery(searchInput.toLowerCase());

			client.fetch(query).then((data) => {
				setRecipes(data);
				setSearchInput('');
			});
		}
	};

	useEffect(() => {
		const categoryName = (window.onclick = (e) => {
			if (
				e.target.innerText === 'Breakfast' ||
				e.target.innerText === 'Lunch' ||
				e.target.innerText === 'Dinner' ||
				e.target.innerText === 'Drinks' ||
				e.target.innerText === 'Deserts'
			)
				setCatName(e.target.innerText);
		});
		if (catName) {
			const query = searchQuery(catName);
			client.fetch(query).then((data) => setRecipes(data));
		}
	}, [catName]);

	useEffect(() => {
		if (!userDetails && !recipes) {
			setLoading(true);
			setTimeout(() => {
				window.location.reload();
			}, 3000);
		} else {
			setLoading(false);
		}
	}, []);

	if (loading) {
		return <Spinner message='Loading new recipes...' />;
	}
	return (
		<div className='w-full h-full p-6'>
			{/* Mobile view */}
			<div className='top md:hidden'>
				<div className='flex justify-between items-center'>
					<div>
						<h1 className='font-bold text-4xl'>
							Hello {userDetails?.userName?.split(' ')[0]},
						</h1>
						<p className='text-gray-400 text-xl leading-7 xs:text-l'>
							What do you want to cook today?
						</p>
					</div>
					<Link to='/add-recipe'>
						<AiFillPlusCircle className='md:hidden text-gold text-3xl rounded-full shadow-xl' />
					</Link>
				</div>
				<div className='search mt-6'>
					<form
						onSubmit={onSubmitSearch}
						className='flex items-center xs:p-2 p-4 border rounded-full shadow hover:shadow-xl'
					>
						<input
							type='text'
							className='ml-2 w-full '
							placeholder='Search Recipes, ingredients...'
							value={searchInput}
							onChange={(e) => {
								setSearchInput(e.target.value);
							}}
						/>
						<button
							type='submit'
							className='text-sm  p-2 border rounded-full bg-gold text-white'
						>
							<BsSearch />
						</button>
					</form>
				</div>
			</div>

			{/* Desktop view */}
			<div className='hidden md:flex'>
				<div className='top h-[450px] w-full relative'>
					<div className='absolute w-full h-full text-gray-200  bg-black/30 lg:h-[400px] xl:h-[490px] flex flex-col justify-center'></div>
					<img
						src='https://images.unsplash.com/photo-1543353071-087092ec393a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
						alt=''
						className='h-[450px] w-full object-fill lg:h-[400px] xl:h-[490px]'
					/>
					<div className='flex justify-center items-center mx-auto'>
						<div className='w-full flex flex-col absolute top-[20%] md:items-center'>
							<h1 className='font-bold text-5xl text-gold lg:text-6xl'>
								Hello {userDetails?.userName?.split(' ')[0]},
							</h1>
							<p className='text-gray-200 text-2xl leading-10 mt-6 lg:text-3xl'>
								What do you want to cook today?
							</p>
						</div>
						<div className='search absolute top-[50%] ml-8 mt-[40px] flex items-center justify-center'>
							<form
								onSubmit={onSubmitSearch}
								className='flex items-center p-2 border rounded-full hover:shadow-xl bg-white w-[500px] shadow-inner lg:w-[600px] xl:w-[700px] '
							>
								<input
									type='text'
									className='ml-4 w-full lg:text-xl'
									placeholder='Search Recipes, Ingredients, etc.'
									value={searchInput}
									onChange={(e) => {
										setSearchInput(e.target.value);
									}}
								/>
								<button
									type='submit'
									className='text-md p-2 border rounded-full bg-gold text-white lg:p-2'
								>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className='categories flex flex-wrap items-center justify-center w-full mt-6 lg:mb-12 lg:mt-[2px] xl:mt-[5rem]'>
				<Categories />
			</div>
			<div className='mid w-full'>
				<div className='font-bold text-2xl sm:mt-4 sm:mb-6 text-center'>
					{recipes ? (
						<div className=' text-center flex justify-center'>
							<h1 className='lg:text-3xl xl:text-4xl'>Search Results</h1>
							<span className='border rounded-full w-[100px] flex items-center text-sm font-thin ml-4'>
								<MdOutlineCancel />
								<p className='cursor-pointer' onClick={() => setRecipes('')}>
									Clear Search
								</p>
							</span>
						</div>
					) : (
						'Trending Recipes'
					)}
				</div>
				{recipes ? (
					<MasonryLayout recipes={recipes} />
				) : (
					<>
						<CardList />
						<Feed recipes={recipes} />
					</>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
