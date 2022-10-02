import React from 'react';
const About = () => {
    return (
        <div className='w-full'>
            <div className='shadow-xl relative'>
                <div className='absolute w-full md:h-[220px] sm:h-[250px] text-gray-200  bg-black/60 flex flex-col justify-center'>
                    <h1 className="text-4xl mb-6 w-full text-center">About Us</h1>
                </div>
                
                <img src="https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className='w-full sm:h-[250px] md:h-[220px]  object-cover' alt=""/>
                <div className="w-full h-full top-0 text-5xl flex justify-center items-center ">
                </div>
            </div>
            <div className="w-full flex justify-between p-6 sm:flex-col md:flex-row">
                <div className="w-[500px] flex-2">
                    
                    <div className="">
                        <h3 className="ml-2mt-10 mb-2 text-2xl bg-black text-white w-[180px]">WHO WE ARE</h3>
                        <p className='sm:w-[300px] md:w-[400px] lg:w-full'>
                            Recipeace is a recipe sharing platform made to connect people who love to cook. We provided trusted resources to a community of at-home cooks and aspiring chefs.
                        </p>
                    </div>
                    <h2 className="mt-10 mb-2">Our Community Is:</h2>
                    <ul className="">
                        <li className="">Friendly</li>
                        <li className="">Supportive</li>
                        <li className="">Approachable</li>
                    </ul>
                </div>
                <div className=" text-white ">
                    <img src="https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className='h-[400px] md:w-[400px]'/>
                </div>
            </div>
        </div>
    );
};

export default About;