import Button from "../components/elements/Button";
import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const {email, password} = formData;

    const onChange = (e) => {
        e.preventDefault();

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    let QUERY = encodeURIComponent(`*[_type == "user"]{email, password, userName, image, _id}`)
    let URL =`https://${process.env.REACT_APP_SANITY_PROJECT_ID}.api.sanity.io/v2022-09-20/data/query/production?query=${QUERY}`

    const onSubmit = async(e) => {
        e.preventDefault();

        await fetch(URL, {
                method: "GET",
            })
            .then(res => res.json())
            .then(data => {
                console.log(data.result)
                const user = data.result.filter((a) => {
                    if(formData.email === a.email && formData.password == a.password){
                        return a;
                    }
                })
                if(!user) {
                    toast.error("Incorrect email and/or password")
                    navigate('/login')
                } else {
                    localStorage.setItem('user', JSON.stringify(user))
                    navigate('/dashboard')
                    console.log(user)
                }
            })    
            setFormData(" ");
    }

    return (
        <div className='h-[100%] p-4'>
            <h3 className="logo font-bold">RECIPEACE</h3>
            <div className="login-center flex flex-col justify-center items-center mt-[50px]">
                <h1 className="mt-10 font-bold text-4xl ">Login</h1>
                <p className="text-[#BC9004] mt-4">Please enter your account details </p>
                <form className="flex flex-col justify-center items-center mt-10 form" onSubmit={onSubmit}>
                    <input type="text" className="mb-6 border border-black w-[300px] h-[45px] rounded-lg px-2 shadow-md" placeholder=" Email" id="email" name="email" value={email} onChange={onChange}/>
                    <input type="password" className="border border-black w-[300px] h-[45px] rounded-lg px-2 shadow-md" placeholder=' Password' id={password} name="password" value={password} onChange={onChange}/>
                    <Button variant='primary' size='small' className='mt-6 shadow-md' type='submit'>Login</Button>
                </form>
                <div className="mt-4">Not a member?
                    <Link to='/register' className="hover:text-[#BC9004] "> Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;