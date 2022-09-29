import React from 'react';
import {RiCloseCircleLine} from 'react-icons/ri';

function AddRecipe({handleModalClose}) {
    return (
        <div className='h-full'>
            <div className='bg-black/70 fixed w-full h-screen z-10 top-0 left-0'></div>
            <div className='rounded-md bg-white absolute left-0 right-0 ml-auto mr-auto md:w-[600px] h-[700px] sm:w-full z-10'>
                <RiCloseCircleLine onClick={handleModalClose} className='w-full text-red-800 text-xl right-0 mt-4 cursor-pointer'/>
                <div className="h-full p-6">
                    <h1 className='font-bold text-2xl mb-2'>Add Recipe</h1>
                    <p className="text-slate-500">Share a recipe that you love ❤️ </p>

                    <form className='flex flex-col  h-[500px]'>
                        <input type="file" className="rounded-lg my-6 p-2" />
                        <label>Add Recipe Name:</label>
                        <input type="text" className="border-2 rounded-lg mt-2 mb-6 p-2 shadow" />
                        <div className="flex justify-between items-center">
                            <label>Choose a Category:</label>
                            <select className="w-full border-2 rounded-lg mt-2 mb-6 p-2 shadow">
                                <option>Breakfast</option>
                                <option>Lunch</option>
                                <option>Dinner</option>
                                <option>Drink</option>
                                <option>Desert</option>
                            </select>
                        </div>
                        <label>Add Recipe Ingredients:</label>
                        <input type="text" className="border-2 rounded-lg mt-2 mb-6 p-2 shadow" />
                        <label>Add Recipe Instructions:</label>
                        <input type="text" className="border-2 rounded-lg mt-2 mb-6 p-2 shadow" />
                    </form>

                    <button type="submit" className='bg-gold hover:bg-yellow-700 py-2 px-6 rounded-xl justify-center items-center'>Save</button>
                </div>
            </div>
        </div>
    );
}

export default AddRecipe;