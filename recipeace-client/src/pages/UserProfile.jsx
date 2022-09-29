import {useState, useEffect, useContext} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {client} from '../client';
import {UserContext} from '../UserContext';
import { AiOutlineLogout } from 'react-icons/ai';
import Spinner from '../components/Spinner';

const randomImage = "https://source.unsplash.com/1600x400/?food,photography.technology"

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {
    const {userDetails} = useContext(UserContext)
    console.log(userDetails)
    const[user, setUser] = useState(null);
    const [active, setActive] = useState('Created');
    const [text, setText] = useState('Created');
    const navigate = useNavigate();
    const {userId} = useParams();

    useEffect(() => {
        setUser(userDetails)
    }, [])

    useEffect(() => {
        if(text === 'created'){
            console.log('created');
        } else {
            console.log('saved')
        }

    }, [])

    const handleLogOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('user')
        navigate('/')
    }

    if(!user) {
        return <Spinner/>
    }
    return (
        <div className='realtive pb-2 flex justify-center items-center'>
            <div className="flex flex-col pb-5">
                <div className="relative flex flex-col mb-7">
                    <div className="flex flex-col just-center items-center">
                        <img src={randomImage} className="w-full h-50 shadow-lg object-cover relative " alt='coverPhoto'/>
                        <img src={userDetails.image? userDetails.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png}"} className=' absolute md:top-36 rounded-full object-cover w-20 h-20 shadow-xl sm:top-20 xl:h-[150px] xl:w-[150px]' alt='userImg'/>
                        <h1 className="font-bold text-[26px] text-center mt-14 sm:mt-10 xl:text-[32px]">{userDetails.userName}</h1>
                        <div className="absolute top-0 z-1 right-0 p-2 mr-2 mt-2 bg-white rou nded-full flex items-center shadow hover:shadow-xl ">
                            <button className="text-red-500 text-xl sm:text-md" onClick={handleLogOut}><AiOutlineLogout/></button>
                        </div>
                    </div>
                    <div className='text-center mb-7'>
                        <button onClick={(e) => {
                            setText(e.target.textContent);
                            setActive('created')
                        }} className={`${active === 'created'? activeBtnStyles : notActiveBtnStyles}`}>Created</button>
                        <button onClick={(e) => {
                            setText(e.target.textContent);
                            setActive('saved')
                        }} className={`${active === 'saved'? activeBtnStyles : notActiveBtnStyles}`}>Saved</button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;