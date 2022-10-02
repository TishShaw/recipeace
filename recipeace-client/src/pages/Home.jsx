import {useContext} from 'react';
import Button from "../components/elements/Button";
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Login from "./Login";
import Fade from 'react-awesome-reveal';


const Home = () => {
    const { userDetails } = useContext(UserContext);

    if(userDetails){
        return <Navigate to='/dashboard' />
    }
    return (
            <div className='home-container top-0 bottom-0 max-w-full'>

                {/* Mobile devices */}
                
                    <div className="md:hidden">
                        <div className='relative'>
                            {/* Overlay */}
                            <div className='absolute w-full h-full text-gray-200  bg-black/30 flex flex-col justify-center'>
                            </div>
                            <img src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2210&q=80" alt="" className='h-screen'/>
                                
                                    <div className="flex justify-center items-center">
                                        <h1 className='absolute sm:text-5xl text-5xl text-white top-[35%] left-1/2 -translate-x-1/2 -translate-y-20'><Fade>RECIPEACE</Fade></h1>
                                        <Fade duration={3000} className='absolute sm:text-xl text-[1.2rem] text-center top-[25%] sm:top-[30%] left-10 xs:left-2 text-white p-10'>
                                            <p>
                                            Discover more than 1200 recipes made easily for you
                                            </p>
                                            </Fade>
                                        <div className="flex justify-center">
                                            <div duration={4000} className="top-[55%] md:top-[30%] absolute cursor-pointer">
                                                <Fade>
                                                    <Button className='sm:top-[450px] top-[280px]'>
                                                        <Link to='/login'>Login</Link>
                                                    </Button>
                                                    <Button className='mt-10 top-[320px] sm:top-[500px] text-white' variant='primary'>
                                                        <Link to='/register'>Sign Up</Link>
                                                    </Button>
                                                </Fade>
                                            </div>
                                        </div>
                                    </div>
                        </div>
                    </div>
                

                {/* Desktop */}
                <div className="relative hidden md:flex">
                    <div className=" flex w-full">
                        <div className="flex-1">
                            <div className='absolute lg:w-[397px] xl:w-[510px] xxl:w-[645px] h-full text-gray-200  bg-black/30 flex flex-col justify-center'></div>
                            <img src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2210&q=80" className="h-[100vh] w-[650px] md:w-full" alt=""/>
                            <h1 className="absolute text-white text-[2.9rem] lg:text-5xl xxl:text-6xl top-[20%] left-[8%] lg:top-[30%] lg:left-[10%]"><Fade>RECIPEACE</Fade></h1>
                            <Fade duration={3000} className='absolute w-[390px] text-3xl text-center top-[25%] sm:top-[30%] lg:top-[35%] xl:w-[500px] text-white p-10 lg:w-[400px] xxl:w-[620px] lg:text-[30px] xl:text-[30px] leading-12 lg:leading-[3rem] xl:leading-[3rem]'><p>Discover more than 1200 recipes made easily for you
                            </p></Fade>
                        </div>
                        <div className="flex justify-center items-center flex-1">
                            <Login/>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Home;