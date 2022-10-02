import Button from "../components/elements/Button";
import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { client } from '../client';
import {v4 as uuid} from 'uuid';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageAsset, setImageAsset] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        image: imageAsset
    })
    const {name, email, password, password2} = formData;

    const onChange = (e) => {
        e.preventDefault();

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const uploadImage = (e) => {
            const selectedFile = e.target.files[0];

            // uploading asset to sanity
            if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff' ||  selectedFile.type === 'image/webp') {

            setLoading(true);
            client.assets
                .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
                .then((document) => {
                setImageAsset(document);
                setLoading(false);
                })
                .catch((error) => {
                console.log('Upload failed:', error.message);
                });
                console.log("image uplaod susccesful");
            } else {
                console.log("error loading image");
            setLoading(false);
            }
        };

    const userId = uuid();
    const doc = {
        '_id': userId,
        _type: 'user',
        userName: formData.name,
        email: formData.email,
        password: formData.password,
        image: {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: imageAsset?._id,
                },
        }
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await client.createIfNotExists(doc)
            navigate('/login', {replace: true})

            console.log(response)

        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className='h-[100vh] p-4'>
            <h3 className="logo font-bold">RECIPEACE</h3>
            <div className="login-center flex flex-col justify-center items-center mt-[20px]">
                <h1 className="mt-10 font-bold text-4xl ">Create an Account</h1>
                <p className="text-[#BC9004] mt-4">Enter you information to create an account </p>
                <form className="flex flex-col justify-center items-center mt-10 form" onSubmit={onSubmit}>
                    <input type="text" className="mb-6 border border-black w-[300px] h-[45px] rounded-lg px-2 shadow-md" placeholder=" Enter Your Full Name" id="name" name="name" value={name} onChange={onChange}/>
                    <input type="text" className="mb-6 border border-black w-[300px] h-[45px] rounded-lg px-2 shadow-md" placeholder=" Enter Your Email"
                    id="email" name="email" value={email} onChange={onChange}/>
                    <input type="password" className="mb-6 border border-black w-[300px] h-[45px] rounded-lg px-2 shadow-md" placeholder=" Enter Your Password"
                    id="password" name="password" value={password} onChange={onChange}/>
                    <input type="passowrd" className="mb-6 border border-black w-[300px] h-[45px] rounded-lg px-2 shadow-md" placeholder=' Confirm Password'
                    id="password2" name="password2" value={password2} onChange={onChange}/>
                    <div className="flex flex-col justify-center">
                        <label>Add profile image:</label>
                        <input type='file' className=' my-2 w-[300px] h-[45px] rounded-lg px-2 shadow-md' onChange={uploadImage}  />
                    </div>
                        <Button variant='primary' size='small' className='mt-6 shadow-md'>Sign Up</Button>

                </form>
                <div className="my-4 mb-10 ">Already a member?
                    <Link to='/login' className="hover:text-[#BC9004] "> Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;