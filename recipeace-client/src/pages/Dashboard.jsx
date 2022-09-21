import {AiFillPlusCircle} from 'react-icons/ai';
import {BsSearch} from 'react-icons/bs';

const Dashboard = () => {
    return (
        <div className='w-full h-full p-6'>
            <div className="top ">
                <div  className='flex justify-between items-center'>
                    <div>
                        <h1 className='font-bold text-4xl'>Hello Jane,</h1>
                        <p className='text-gray-400 text-xl leading-10'>What do you want to cook today?</p>
                    </div>
                    <AiFillPlusCircle className='text-gold text-3xl rounded-full shadow-xl'/>
                </div>
                <div className="search mt-6">
                    <div className='flex items-center p-4 border rounded-full shadow hover:shadow-xl'>
                        <BsSearch  className='text-lg'/>
                        <input type="text" className='ml-4 w-full 'placeholder='Search Recipes, Ingredients, etc.'/>
                    </div>
                </div>
                <div className='categories'>

                </div>
            </div>
            <div className="mid">

            </div>
        </div>
    );
};

export default Dashboard;