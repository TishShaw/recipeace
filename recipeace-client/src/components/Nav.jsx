import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import {GoThreeBars} from 'react-icons/go';
import {AiOutlineClose} from 'react-icons/ai';
import AddRecipe from './AddRecipe';
import { UserContext } from '../UserContext';

const Nav = () => {
    const { userDetails } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [openModal, setModalOpen] = useState(false);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleTab = (e) => {
        e.preventDefault();
        const activePage = window.location.pathname;
        const tabs = document.querySelectorAll("li a");

        tabs.forEach(link => {
                if(link.href.includes(`${activePage}`)){
                    link.classList.add('active');
                }else {
                    link.classList.remove('active');
                }
        })
    }

    const handleOpen = (e) => {
        e.preventDefault();
        setOpen(!open);
    }
    
    return (
        <div className='h-full w-full'>
            <div className="flex flex-col">
                <div className="md:hidden bg-gold flex justify-between items-center px-6 py-4">
                    <h1 className="text-2xl">RECIPEACE</h1>
                    <div className="md:hidden">
                        <div className="flex flex-col items-center">
                            {open? <AiOutlineClose onClick={handleOpen} className="bg-white text-2xl cursor-pointer"/> : <GoThreeBars onClick={handleOpen}className="text-2xl cursor-pointer"/> }
                        </div>
                        <div className="duration-300 ease-in-out">
                            <div>
                                {open && <div className='bg-black/70 fixed w-full h-screen z-10 top-[64px] left-0'></div>}
                                <ul className={`right-0 bg-gold w-[300px] h-screen fixed mt-4 pr-6 pl-4 z-10 text-xl ease-in-out duration-300 ${open ? "translate-x-2": 'translate-x-full'}` }>
                                    <li className='my-10'><Link  to='/dashboard' onClick={() => setOpen(false)}>Home</Link></li>
                                    <li className='my-10'><Link to={`/profile/${userDetails._id}`} onClick={() => setOpen(false)}>Profile</Link></li>
                                    <li className='my-10'><Link to='/about-us' onClick={() => setOpen(false)}>About Us</Link></li>
                                </ul>
                            </div>
                        </div>                   
                    </div>  
                </div>
            </div>
            <div className="sm:hidden bg-gold md:flex justify-between items-center px-6 py-4">
                <h1 className="text-2xl md:text-2xl lg:text-3xl">RECIPEACE</h1>
                <ul className='flex text-[16px] lg:text-[18px]' onClick={handleTab}>
                    <li className='mx-2' id="tab"><Link to='/dashboard'>Home</Link></li>
                    <li className='mx-2' id="tab"><Link to={`/profile/${userDetails._id}`}>Profile</Link></li>
                    <li className='mx-2' id="tab"><Link to='/about-us'>About Us</Link></li>
                </ul>
                <div>
                    <button className='bg-black rounded p-2 text-gold text-[16px] lg:text-[18px]' onClick={handleModalOpen}>Add Recipe</button>

                    {
                        openModal ?
                            <AddRecipe handleModalClose={handleModalClose}/>:null
                    }
                
                </div>
            </div> 
        </div>
    );
};

export default Nav;