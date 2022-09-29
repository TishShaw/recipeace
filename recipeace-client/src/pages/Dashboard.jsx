import { useContext, useState, useEffect } from 'react';
import {AiFillPlusCircle} from 'react-icons/ai';
import {BsSearch} from 'react-icons/bs';
import { UserContext } from '../UserContext';
import Categories from '../components/Categories';
import CardList from '../components/CardList';
import Spinner from '../components/Spinner';
import AddRecipe from '../components/AddRecipe';
import Feed from '../components/Feed';

const Dashboard = () => {
    const { userDetails } = useContext(UserContext);
    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);

    useEffect(() => {
        function windowLoad () {
            if(window.location.hash) {
                window.location.reload();
            }
        }
        windowLoad()
    }, [])

    if(!userDetails) {
        return <Spinner message="Loading new recipes..."/>
    }
    return (
        <div className='w-full h-full p-6'>
            <div className="top md:hidden">
                <div  className='flex justify-between items-center'>
                    <div>
                        <h1 className='font-bold text-4xl'>Hello {userDetails.userName.split(" ")[0]},</h1>
                        <p className='text-gray-400 text-xl leading-10'>What do you want to cook today?</p>
                    </div>
                    <AiFillPlusCircle onClick={handleOpenModal} className='md:hidden text-gold text-3xl rounded-full shadow-xl'/>
                    {
                        openModal ? <AddRecipe handleModalClose={handleModalClose}/> : null
                    }
                </div>
                <div className="search mt-6">
                    <div className='flex items-center p-4 border rounded-full shadow hover:shadow-xl'>
                        <BsSearch  className='text-lg'/>
                        <input type="text" className='ml-4 w-full 'placeholder='Search Recipes, Ingredients, etc.'/>
                    </div>
                </div>
            </div>
            
            <div className="sm:hidden md:flex">
                <div className="top h-[450px] w-full relative">
                <div className='absolute w-full h-full text-gray-200  bg-black/30 flex flex-col justify-center'>
                </div>
                    <img src='https://images.unsplash.com/photo-1543353071-087092ec393a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80' alt="" className='h-[450px] w-full object-fill ' />
                    <div  className='flex justify-between items-center absolute top-[20%]'>
                        <div className='ml-8'>
                            <h1 className='font-bold text-5xl text-gold'>Hello {userDetails.userName.split(" ")[0]},</h1>
                            <p className='text-gray-200 text-2xl leading-10 mt-6'>What do you want to cook today?</p>
                        </div>
                        <AiFillPlusCircle className='md:hidden text-gold text-3xl rounded-full shadow-xl'/>
                    </div>
                    <div className="search absolute top-[50%] ml-8 mt-[40px]">
                        <div className='flex items-center p-4 border rounded-full hover:shadow-xl bg-white w-[500px] shadow-inner'>
                            <BsSearch  className='text-lg'/>
                            <input type="text" className='ml-4 w-full 'placeholder='Search Recipes, Ingredients, etc.'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='categories flex flex-wrap  items-center justify-center w-full'>
                    <Categories />
                </div>
            <div className="mid w-full">
                <h1 className="font-bold text-2xl mt-4 mb-6 text-center">Trending Recipes</h1>
                <CardList />
                <Feed />
            </div>
        </div>
    );
};

export default Dashboard;