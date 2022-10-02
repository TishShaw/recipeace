import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {client} from '../client';
import { AiOutlineLogout } from 'react-icons/ai';
import Spinner from '../components/Spinner';
import MasonryLayout from '../components/MasonryLayout';
import { userQuery, userCreatedQuery, userSavedQuery } from '../utils/data';

const randomImage = "https://source.unsplash.com/1600x400/?food,photography.technology"

const activeBtnStyles = 'bg-gold text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {
    const[user, setUser] = useState(null);
    const [recipes, setRecipes] = useState('');
    const [active, setActive] = useState('created');
    const [text, setText] = useState('created');
    const navigate = useNavigate();
    const id = useParams();
    const userId = id.id;

    useEffect(() => {
        const query = userQuery(userId)
        client.fetch(query).then((data) => setUser(data[0]))

    }, [userId])

    useEffect(() => {
        if(text === 'created'){
            const createdRecipesQuery = userCreatedQuery(userId)
            client.fetch(createdRecipesQuery).then((data) => setRecipes(data))
            console.log('created');
        } else if(text === 'saved'){
            const savedQuery = userSavedQuery(userId)
            client.fetch(savedQuery).then((data) => setRecipes(data))
            console.log('saved')
        }

    }, [text, userId])

    const handleLogOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('user')
        navigate('/login')
        window.location.reload()
    }

    if(!user && !randomImage) {
        return <Spinner message="Loading user profile..."/>
    }
    return (
        <div className='realtive pb-2 flex justify-center items-center'>
            
            <div className="flex flex-col pb-5">
                <div className="relative flex flex-col mb-7">
                    <div className="flex flex-col just-center items-center">
                        <img src={randomImage} className="w-full h-50 shadow-lg object-cover relative " alt='coverPhoto'/>
                        <img src={user?.image !== null? user?.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png}"} className=' absolute md:top-36 rounded-full object-cover w-20 h-20 shadow-xl sm:top-20 xl:h-[150px] xl:w-[150px]' alt='userImg'/>
                        <h1 className="font-bold text-[26px] text-center mt-14 sm:mt-10 xl:text-[32px]">{user?.userName}</h1>
                        <div className="absolute top-0 z-1 right-0 p-2 mr-2 mt-2 bg-white rou nded-full flex items-center shadow hover:shadow-xl ">
                            <button className="text-red-500 text-xl sm:text-md" onClick={handleLogOut}><AiOutlineLogout/></button>
                        </div>
                    </div>
                    <div className='text-center mb-7'>
                        <button onClick={(e) => {
                            setText('created');
                            setActive('created')
                        }} className={`${active === 'created'? activeBtnStyles : notActiveBtnStyles}`}>Created</button>
                        <button onClick={(e) => {
                            setText('saved');
                            setActive('saved')
                        }} className={`${active === 'saved'? activeBtnStyles : notActiveBtnStyles}`}>Saved</button>
                        
                    </div>
                    { recipes?.length ?
                            <div className='px-2'>
                                <MasonryLayout recipes={recipes} />
                            </div> :
                            <div className="flex">No Recipes Found!</div>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default UserProfile;