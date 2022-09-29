import { FaHome, FaSearch, FaUser } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

export const cat = [
	{
		name: 'Breakfast',
		image: '',
	},
	{
		name: 'Lunch',
		image: '',
	},
	{
		name: 'Dinner',
		image: '',
	},
	{
		name: 'Drinks',
		image: '',
	},
	{
		name: 'deserts',
		image: '',
	},
];

export const recipeCardData = [
	{
		cat_tag: 'Dinner',
		title: 'Lamb Meatballs',
		calories: '30',
		servings: '2',
		catImg:
			'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80',
	},
	{
		cat_tag: 'Dinner',
		title: 'Pineapple Pizza',
		calories: '30',
		servings: '2',
		catImg:
			'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&ffit=crop&w=386&q=80',
	},
	{
		cat_tag: 'Breakfast',
		title: 'Lamb Meatballs',
		calories: '30',
		servings: '2',
		catImg:
			'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80',
	},
	{
		cat_tag: 'Breakfast',
		title: 'Spinach Egg on Toast',
		calories: '30',
		servings: '2',
		catImg:
			'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80',
	},
];

export const navItems = [
	{
		route: '/dashboard',
		title: <FaHome />,
		text: 'Home',
	},
	{
		route: '/dashboard',
		title: <FaSearch />,
		text: 'Search',
	},
	{
		route: '/profile/:id',
		title: <FaUser />,
		text: <img src='' />,
	},
	{
		route: '/settings',
		title: <IoMdSettings />,
	},
];
