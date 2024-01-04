import React from 'react';
import { cat } from '../data/CategoryData';

const Categories = () => {
	return (
		<div className=' w-full flex items-center overflow-hidden overflow-x-scroll xs:h-20'>
			{/* Mobile View */}
			<div className='flex md:hidden'>
				{cat.map((c, idx) => (
					<div
						key={idx}
						className='ml-2 ring-4 ring-gold w-[100px] h-[40px] flex items-center justify-center rounded-full mr-4 px-6 hover:shadow-xl cursor-pointer'
					>
						{c}
					</div>
				))}
			</div>

			{/* Desktop View */}
			<div className='sm:hidden md:flex'>
				{cat.map((c, idx) => (
					<div
						key={idx}
						className='xl:mx-6 shadow-md w-[250px] h-[70px] flex items-center justify-center rounded-lg mr-6 px-6 hover:shadow-2xl text-center bg-gold text-white cursor-pointer'
					>
						{c}
					</div>
				))}
			</div>
		</div>
	);
};

export default Categories;
