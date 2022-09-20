import Button from "../components/elements/Button";
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className='h-[100vh] p-4'>
            <h3 className="logo font-bold">RECIPEACE</h3>
            <div className="login-center flex flex-col justify-center items-center mt-[50px]">
                <h1 className="mt-10 font-bold text-4xl ">Create an Account</h1>
                <p className="text-[#BC9004] mt-4">Enter you information to create an account </p>
                <form className="flex flex-col justify-center items-center mt-10 form ">
                    <input type="text" className="mb-6 border border-black w-[300px] h-[45px] rounded-lg px-2 shadow-md" placeholder=" Enter Your Full Name"/>
                    <input type="text" className="mb-6 border border-black w-[300px] h-[45px] rounded-lg px-2 shadow-md" placeholder=" Enter Your Email"/>
                    <input type="text" className="mb-6 border border-black w-[300px] h-[45px] rounded-lg px-2 shadow-md" placeholder=" Enter Your Password"/>
                    <input type="text" className="border border-black w-[300px] h-[45px] rounded-lg px-2 shadow-md" placeholder=' Confirm Password'/>
                    <Button variant='primary' size='small' className='mt-6 shadow-md'>Sign Up</Button>
                </form>
                <div className="mt-4 ">Already a member?
                    <Link to='/login' className="hover:text-[#BC9004] "> Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;