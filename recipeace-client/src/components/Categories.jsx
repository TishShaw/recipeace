import React from 'react';
import { cat } from '../data/CategoryData';

const Categories = () => {
    return (
        <div className=" w-full flex items-center overflow-hidden overflow-x-scroll sm:pt-8 sm:pb-6 xs:h-24">
            
            {/* Mobile View */}
            <div className="flex md:hidden">
                {cat.map((c, idx) => (
                        <div key={idx} className="ml-2 ring-4 ring-gold w-[100px] h-[40px] flex items-center justify-center rounded-full mr-4 px-6 hover:shadow-xl cursor-pointer">
                            {c}
                        </div>
                    ))}
            </div>

            {/* Desktop View */}
            <div className="sm:hidden md:flex">
                {cat.map((c, idx) => (
                        <div key={idx} className='xl:mx-6 shadow-md w-[250px] h-[80px] flex items-center justify-center rounded-lg mr-6 px-6 hover:shadow-xl text-center'>
                                {c}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Categories;