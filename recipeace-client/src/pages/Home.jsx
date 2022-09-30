import Button from "../components/elements/Button";
import { Link } from 'react-router-dom';
import Login from "./Login";

const Home = () => {
    return (
            <div className='home-container top-0 bottom-0 h-full'>

                {/* Mobile devices */}
                <div className="md:hidden">
                    <div className='relative'>
                        {/* Overlay */}
                        <div className='absolute w-full h-full text-gray-200  bg-black/30 flex flex-col justify-center'>
                        </div>
                        <img src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2210&q=80" alt="" className=''/>
                            <h1 className='absolute text-6xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-20'>RECIPEACE</h1>
                            <p className='absolute text-xl top-1/2 left-10 text-white w-[400px]'>Discover more than 1200 recipes made easily for you
                            </p>
                            <Button className='absolute top-[460px] left-40'>
                                <Link
                                to='/login'>Login
                                </Link>
                            </Button>
                            <Button className='mt-10 absolute text-white top-[500px] left-40' variant='primary'>
                                <Link
                                to='/register'>Sign Up
                                </Link>
                            </Button>
                    </div>
                </div>

                {/* Desktop */}
                <div className="sm:hidden md:flex">
                    <div className="md:flex">
                        <div>
                            <img src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2210&q=80" className="h-[100vh] w-[650px]"/>
                        </div>
                        <div className="w-[50%]">
                            <Login/>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Home;