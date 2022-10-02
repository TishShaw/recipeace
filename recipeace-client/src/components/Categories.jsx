import React from 'react';
import { cat } from '../data/CategoryData';

const Categories = () => {
    return (
        <div className=" w-full flex items-center overflow-hidden overflow-x-scroll pt-8 pb-6">
            <div className="flex md:hidden">
                {cat.map((c, idx) => (
                        <div key={idx} className="shadow-md w-[100px] h-[40px] flex items-center justify-center rounded-full mr-4 px-6 hover:shadow-xl">
                            {c}
                        </div>
                    ))}
            </div>
            <div className="sm:hidden md:flex">
                {cat.map((c, idx) => (
                        <div key={idx} className='shadow-md w-[250px] h-[80px] flex items-center justify-center rounded-lg mr-4 px-6 hover:shadow-xl text-center'>
                                {c}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Categories;