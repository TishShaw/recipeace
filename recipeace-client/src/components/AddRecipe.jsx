import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {RiCloseCircleLine} from 'react-icons/ri';
import { cat } from '../data/CategoryData';
import { UserContext } from '../UserContext';
import {AiOutlineCloudUpload} from 'react-icons/ai';
import {client} from '../client';

function AddRecipe({handleModalClose}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageAsset, setImageAsset] = useState('');
    const { userDetails } = useContext(UserContext);
    const[ title, setTitle] = useState('');
    const[ category, setCategory] = useState('');
    const[ calories, setCalories] = useState('');
    const[ servings, setServings] = useState('');
    const[ instructions, setInstructions] = useState('');
    const[ ingredients, setIngredients] = useState('');

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
            } else {
            setLoading(false);
            }
        };

    const saveNewRecipe = () => {
            if (title && imageAsset?._id && category && calories && servings && ingredients && instructions) {
            const doc = {
                _type: 'recipe',
                title,
                category,
                calories,
                servings,

                ingredients: [ingredients],
                instructions: [instructions],
                image: {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: imageAsset?._id,
                },
                },
                UserId: userDetails._id,
                postedBy: {
                _type: 'postedBy',
                _ref: userDetails._id,
                },
                
            };
            client.create(doc).then(() => {
                navigate('/dashboard');
            });
            } else {
            console.log(('error saving recipe'));
            }
    };
    return (
        <div className='h-full'>
            <div className='bg-black/40 fixed w-full h-screen z-10 top-0 left-0'></div>
            <div className='rounded-md bg-white absolute left-0 right-0 ml-auto mr-auto md:w-[600px] h-[1000px] sm:w-full z-10'>
                <RiCloseCircleLine onClick={handleModalClose} className='w-full text-red-800 text-xl right-0 mt-4 cursor-pointer'/>
                <div className="h-full w-full p-6">
                    <h1 className='font-bold text-2xl mb-2'>Add Recipe</h1>
                    <p className="text-slate-500">Share a recipe that you love ❤️ </p>
                    <div className="flex flex-col justify-center items-center border h-[200px] my-6 cursor-pointer">
                            <AiOutlineCloudUpload className='text-6xl text-gray-500'/>
                    </div>
                        
                    <form className='flex flex-col'>
                        <input type='file' className='absolute top-[300px] translate-x-40' onChange={uploadImage}  />
                        <label>Add Recipe Name:</label>
                        <input type="text" className="border-2 rounded-lg mt-2 mb-6 p-2 shadow" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <div className="flex justify-between items-center">
                            <div className='flex flex-col'>
                                <label>Choose a Category:</label>
                                <select className="w-[200px] border-2 rounded-lg mt-2 mb-6 p-2 shadow" onChange={(e) => setCategory(e.target.value)} >
                                    <option>Select a category</option>
                                    {cat.map((c, i) => (
                                        <option key={i} value={c} >{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <div>
                                    <label className='mr-2'>Enter Calories:</label>
                                    <input type="number"  className="w-[50px] border-2 rounded-lg mt-2 mb-6 p-2 shadow" onChange={(e) => setCalories(e.target.value)}/>
                                </div>
                                <div>
                                    <label className='mr-2'>Enter Servings:</label>
                                    <input type="number"  className="w-[50px] border-2 rounded-lg  mb-6 p-2 shadow" onChange={(e) => setServings(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <label>Add Recipe Ingredients:</label>
                        <input type="text" className="border-2 rounded-lg mt-2 mb-6 p-2 shadow"  onChange={(e) => setIngredients(e.target.value)}/>
                        <label>Add Recipe Instructions:</label>
                        <input type="text" className="border-2 rounded-lg mt-2 mb-6 p-2 shadow" onChange={(e) => setInstructions(e.target.value)} />
                    </form>

                    <button onClick={saveNewRecipe} className='bg-gold hover:bg-yellow-700 mt-6 py-2 px-6 rounded-xl justify-center items-center w-full h-[60px]'>Save</button>
                </div>
            </div>
        </div>
    );
}

export default AddRecipe;