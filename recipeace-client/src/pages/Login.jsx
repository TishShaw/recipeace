import Button from "../components/elements/Button";
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='h-[100%] p-4'>
            <h3 className="logo font-bold">RECIPEACE</h3>
            <div className="login-center flex flex-col justify-center items-center mt-[50px]">
                <h1 className="mt-10 font-bold text-4xl ">Login</h1>
                <p className="text-[#BC9004] mt-4">Please enter your account details </p>
                <form className="flex flex-col justify-center items-center mt-10 form ">
                    <input type="text" className="mb-6 border border-black w-[300px] h-[45px] rounded-lg px-2 shadow-md" placeholder=" Email"/>
                    <input type="text" className="border border-black w-[300px] h-[45px] rounded-lg px-2 shadow-md" placeholder=' Password'/>
                    <Button variant='primary' size='small' className='mt-6 shadow-md'>Login</Button>
                </form>
                <div className="mt-4">Not a member?
                    <Link to='/register' className="hover:text-[#BC9004] "> Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;