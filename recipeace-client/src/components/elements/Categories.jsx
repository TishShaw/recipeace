import React from 'react';
import { cat } from '../../data/CategoryData';

const Categories = () => {
    return (
        <div className=" w-full flex items-center overflow-hidden overflow-x-scroll pt-8 pb-6">
            {
                cat.map((c) => (
                    <div className="shadow-md w-[100px] h-[40px] flex items-center justify-center rounded-full mr-4 px-6 hover:shadow-xl">
                        {c}
                    </div>
                ))
            }
        </div>
    );
};

export default Categories;