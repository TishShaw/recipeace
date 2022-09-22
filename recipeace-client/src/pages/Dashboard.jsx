import { useContext, useEffect } from 'react';
import {AiFillPlusCircle} from 'react-icons/ai';
import {BsSearch} from 'react-icons/bs';
import { UserContext } from '../UserContext';
import Categories from '../components/elements/Categories';
import CardList from '../components/elements/CardList';

const Dashboard = () => {
    const { userDetails } = useContext(UserContext);
    
    function windowLoad () {
        if(window.location.hash === "") {
            window.location += '#loaded';
            window.location.reload();
        }
    }
    
    useEffect(() => {
        windowLoad()
    }, [])

    return (
        <div className='w-full h-full p-6'>
            <div className="top ">
                <div  className='flex justify-between items-center'>
                    <div>
                        <h1 className='font-bold text-4xl'>Hello {userDetails.userName.split(" ")[0]},</h1>
                        <p className='text-gray-400 text-xl leading-10'>What do you want to cook today?</p>
                    </div>
                    <AiFillPlusCircle className='t ext-gold text-3xl rounded-full shadow-xl'/>
                </div>
                <div className="search mt-6">
                    <div className='flex items-center p-4 border rounded-full shadow hover:shadow-xl'>
                        <BsSearch  className='text-lg'/>
                        <input type="text" className='ml-4 w-full 'placeholder='Search Recipes, Ingredients, etc.'/>
                    </div>
                </div>
                <div className='categories flex flex-wrap  items-center justify-center w-full'>
                    <Categories />
                </div>
            </div>
            <div className="mid w-full">
                <h1 className="font-bold text-xl mt-4 mb-6">Trending Recipes</h1>
                <CardList />
                <h1 className="font-bold text-xl mt-10 mb-6">Popular Recipes</h1>
                <CardList />
            </div>
        </div>
    );
};

export default Dashboard;