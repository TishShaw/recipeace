import Button from "../components/elements/Button";
import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { client } from '../client';
import {v4 as uuid} from 'uuid';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const {name, email, password, password2} = formData;

    const onChange = (e) => {
        e.preventDefault();

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const userId = uuid();
    const doc = {
        '_id': userId,
        _type: 'user',
        userName: formData.name,
        email: formData.email,
        password: formData.password,
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await client.createIfNotExists(doc)
            navigate('/login', {replace: true})

        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <div className='h-[100vh] p-4'>
            <h3 className="logo font-bold">RECIPEACE</h3>
            <div className="login-center flex flex-col justify-center items-center mt-[50px]">
                <h1 className="mt-10 font-bold text-4xl ">Create an Account</h1>
                <p className="text-[#BC9004] mt-4">Enter you information to create an account </p>
                <form className="flex flex-col justify-center items-center mt-10 form" onSubmit={onSubmit}>
                    <input type="text" className="mb-6 border border-black w-[300px] h-[45px] rounded-lg px-2 shadow-md" placeholder=" Enter Your Full Name" id="name" name="name" value={name} onChange={onChange}/>
                    <input type="text" className="mb-6 border border-black w-[300px] h-[45px] rounded-lg px-2 shadow-md" placeholder=" Enter Your Email"
                    id="email" name="email" value={email} onChange={onChange}/>
                    <input type="password" className="mb-6 border border-black w-[300px] h-[45px] rounded-lg px-2 shadow-md" placeholder=" Enter Your Password"
                    id="password" name="password" value={password} onChange={onChange}/>
                    <input type="passowrd" className="border border-black w-[300px] h-[45px] rounded-lg px-2 shadow-md" placeholder=' Confirm Password'
                    id="password2" name="password2" value={password2} onChange={onChange}/>
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