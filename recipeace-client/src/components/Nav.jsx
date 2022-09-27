import { Link } from 'react-router-dom';
import {useState} from 'react';
import {GoThreeBars} from 'react-icons/go';
import {AiOutlineClose} from 'react-icons/ai';

const Nav = () => {
    const [open, setOpen] = useState(false)

    const handleTab = (e) => {
        e.preventDefault();
        const activePage = window.location.pathname;
        const tabs = document.querySelectorAll("li a")

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
        setOpen(!open)
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
                        
                        
                        {open &&<div className=' '>
                            <div className='bg-black/70 fixed w-full h-screen z-10 top-[64px] left-0'></div>
                            <ul className='right-0 bg-gold w-[300px] h-screen fixed mt-4 pr-6 pl-4 z-10 text-xl translate-x-2 duration-300'>
                                <li className='my-10'><Link to='/dashboard'>Home</Link></li>
                                <li className='my-10'><Link to='/profile/:id'>Profile</Link></li>
                                <li className='my-10'><Link to='/settings'>Settings</Link></li>
                                <li className='my-10'><Link to='/about-us'>About Us</Link></li>
                                <li className='my-10'><Link to='/contact-us'>Contact Us</Link></li>
                            </ul>
                        </div>}                     
                    </div>  
                </div>
            </div>
            <div className="sm:hidden bg-gold md:flex justify-between items-center px-6 py-4">
                <h1 className="text-2xl md:text-2xl lg:text-3xl">RECIPEACE</h1>
                <ul className='flex text-[16px] lg:text-[18px]' onClick={handleTab}>
                            <li className='mx-2' id="tab"><Link to='/dashboard'>Home</Link></li>
                            <li className='mx-2' id="tab"><Link to='/profile/:id'>Profile</Link></li>
                            <li className='mx-2' id="tab"><Link to='/settings'>Settings</Link></li>
                            <li className='mx-2' id="tab">About Us</li>
                            <li className='mx-2' id="tab">Contact Us</li>
                </ul>
                <button className='bg-black rounded p-2 text-gold text-[16px] lg:text-[18px]'>Add Recipe</button>
            </div> 

        </div>
    );
};

export default Nav;