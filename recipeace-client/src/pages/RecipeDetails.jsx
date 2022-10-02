import {useState, useEffect, useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import { UserContext } from '../UserContext';
import {ImSpoonKnife} from 'react-icons/im';
import {HiOutlineUsers} from'react-icons/hi';
import {FiBookmark} from 'react-icons/fi';
import Spinner from '../components/Spinner';
import{client, urlFor} from '../client';
import {RecipeDetailsQuery} from '../utils/data';
import { IoIosArrowDown, IoLogoInstagram } from 'react-icons/io';
import {FiClock} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

function RecipeDetails() {
    const { userDetails } = useContext(UserContext);

    const [recipeDetails, setRecipeDetails] = useState(null);
    
    const [comment, setComment] = useState('');

    let id = useParams();
    const recipeId = id.id

    const fetchRecipeDetails = (recipeId) => {
        const query = RecipeDetailsQuery(recipeId);
        if(query) {
            client.fetch(query)
                .then((data) => {
                    setRecipeDetails(data[0])
                })
        }
    }
    const [ingredients, setIngredients] = useState(null)
    const [instructions, setInstructions] = useState(null)

    useEffect(() => {
        try {
            setIngredients(recipeDetails?.ingredients[0]?.split(","))
            setInstructions(recipeDetails?.instructions[0]?.split(","))
        } catch (error) {
            return
        }
    }, [recipeDetails])

    const addComment = () => {
        if(comment) {
            client
                .patch(recipeId)
                .setIfMissing({ comments: []})
                .insert('before', 'comments[0]', [{
                    comment,
                    _key: uuidv4(),
                    postedBy: {
                        _type: 'postedBy',
                        _ref: userDetails._id
                    }
                }])
                .commit()
                .then(() => {
                    fetchRecipeDetails(recipeId);
                    setComment('');
                    window.location.reload()
                })
        }
    }

    const handleUpdate = async (id) => {
        try {
            let res = await client
                    .patch(recipeId)
                    .createOrReplace([`comments[_key=="${id}"]`])
                    .commit()
            setRecipeDetails(res)
        } catch (error) {
            console.log(error.message);
        }
    }


    const handleDelete = async (id) => {
        try {
            let res = await client
                    .patch(recipeId)
                    .unset([`comments[_key=="${id}"]`])
                    .commit()
            setRecipeDetails(res)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchRecipeDetails(recipeId)
            window.scrollTo(0, 0)
    }, [recipeId])

    console.log(recipeDetails)

    if(!recipeDetails && !userDetails) {
        return <Spinner message="Loading recipe details..." />
    }
    return (
        <div className='h-full w-full'>
            <div className="md:hidden p-6">
                <div className="relative">
                    <img src={(recipeDetails?.image && urlFor(recipeDetails?.image).url())}  className="w-[500px] h-[500px] rounded-md" alt=""/>
                    <div className="absolute bg-white p-6 bottom-10 shadow">
                        <h1 className='text-xl font-bold'>{recipeDetails?.title}</h1>                   
                    </div>
                    <Link to={`/profile/${recipeDetails?.postedBy._id}`}><img src={(recipeDetails?.postedBy && (recipeDetails.postedBy.image))} className=" absolute top-5 right-5 rounded-full w-[40px] h-[40px] object-cover" alt=""/></Link>
                </div>
                <div className="h-20 p-6 flex justify-center items-center shadow-xl">
                    <p className="flex items-center text-l mr-4 border p-2 rounded-lg shadow"><HiOutlineUsers/>{recipeDetails?.servings} Servings</p>
                    <p className="flex items-center text-l mr-4 border p-2 rounded-lg shadow"><ImSpoonKnife/>{recipeDetails?.calories} Calories</p>
                    <p className="flex items-center text-l mr-4 border p-2 rounded-lg shadow"><FiClock/>{recipeDetails?.cookTime} Minutes</p>
                    <p className="flex items-center text-l mr-4 border p-2 rounded-lg shadow"><FiBookmark/> Save</p>
                </div>
                <div className="mt-6">
                    <h1 className="text-xl font-semibold mb-4">Ingredients</h1>
                        {ingredients?
                            ingredients?.map((i, index) => (
                                <ul key={index}>
                                    <li className="mb-4 w-[440px]">{i}</li>
                                </ul>
                            )):
                            recipeDetails?.ingredients?.map((i) => (
                                <ul key={i.ingredient}>
                                    <li  className="mb-4 w-[440px]">{i.ingredient}</li>
                                </ul>
                            ))
                        }
                </div>
                <div className="mt-6">
                    <h1 className="text-xl font-semibold mb-4">Instructions</h1>
                    {
                        instructions?
                        instructions?.map((i) => (
                        <ul key={i._id}>
                            <li className="mb-4">{i}</li>
                        </ul>
                    ))
                    :
                    recipeDetails?.instructions?.map((i, index) => (
                        <ul key={index}>
                            <li className="mb-4">{i}</li>
                        </ul>
                    ))}
                </div>
                <div className="mt-20">
                    <h1 className="font-semibold text-2xl ">Comments ({recipeDetails?.comments?.length > 0 ? recipeDetails?.comments?.length : 0})</h1>
                    <input type='text' placeholder='Add a comment' className='mt-4 border rounded w-[250px] p-2' value={comment} onChange={(e) => setComment(e.target.value)}/>
                    <button onClick={addComment} type="button" className='bg-black text-white p-2 ml-2 rounded-lg'>Send</button>
                    
                </div>
                <hr className='mt-8'/>
                <div className="">
                    {recipeDetails?.comments?.map((item) => (
                        <div className="flex mt-10 mb-10 items-center bg-white rounded-lg w-full" key={item._key}>
                            <div className='flex justify-center'>
                                <img
                                    src={item.postedBy?.image}
                                    className="h-12 rounded-full cursor-pointer"
                                    alt=""
                                />
                                <div className="flex flex-col ml-4">
                                    <p className="font-bold  ">{item.postedBy?.userName}</p>
                                    <p className='w-[200px]'>{item.comment}</p>
                                </div>
                            </div>
                            <div className="">
                                {item.postedBy?.userName === userDetails.userName  && <BsTrash/>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="sm:hidden md:flex flex-col w-full">
                <div className="flex items-center justify-between p-8">
                    <div className="flex flex-col items-center flex-1">
                        <h1 className='recipeTitle text-4xl font-bold  text-center p-8'>{recipeDetails?.title}</h1>
                        <p className="text-xl">Posted By: {recipeDetails?.postedBy.userName}</p>
                        <div className="flex text-4xl mt-4">
                            <IoLogoInstagram className='m-2'/>                 
                        </div>
                        <IoIosArrowDown className='text-3xl mt-6 animate-bounce'/>
                    </div>
                    <div className="flex-2">
                        <img src={(recipeDetails?.image && urlFor(recipeDetails?.image).url())}  className="h-[600px] w-full rounded-md object-cover" alt=""/>
                        <div className="flex border rounded-lg mt-10 p-4">
                            <span className="mr-10 flex items-center">
                                <ImSpoonKnife className="mr-2 flex items-center text-xl"/> {recipeDetails?.calories} Calories</span>
                            <span className="flex items-center mr-10">
                                <HiOutlineUsers className="mr-2 flex items-center text-xl"/> {recipeDetails?.servings} Servings</span>
                            <span className="flex items-center mr-10">
                                <FiClock className="mr-2 flex items-center text-xl"/> {recipeDetails?.cookTime} Minutes</span>
                            <span className="flex items-center mr-10">
                                <FiBookmark className="mr-2 flex items-center text-xl"/> Save</span>
                        </div>

                    </div>
                </div>
                <div className="w-full flex items-center  mt-20 p-6">
                    <div className="flex-1 pl-6 pr-10">
                    <h1 className="text-2xl font-semibold mb-4">Instructions</h1>
                        {
                            instructions? 
                            instructions?.map((i, idx) => (
                            <ul key={idx}>
                                <li className="mb-4">{i}</li>
                            </ul>
                        )):
                            recipeDetails?.instructions?.map((i, idx) => (
                            <ul key={idx}>
                                <li className="mb-4">{i}</li>
                            </ul>
                        ))}
                    </div>
                    <div className=" flex-3 pl-6 pr-10">
                            <h1 className="text-2xl font-semibold mb-4">Ingredients</h1>
                        {ingredients?
                            ingredients?.map((i, index) => (
                                <ul key={index}>
                                    <li className="mb-4 w-[440px]">{i}</li>
                                </ul>
                            )):
                            recipeDetails?.ingredients?.map((i, index) => (
                                <ul key={i.ingredient}>
                                    <li  className="mb-4 w-[440px]">{i.ingredient}</li>
                                </ul>
                            ))
                        }
                    </div>
                </div>
                <div className="p-12 mt-20">
                    <h1 className="font-semibold text-2xl ">Comments ({recipeDetails?.comments?.length > 0 ? recipeDetails?.comments?.length : 0})</h1>
                    <input type='text' placeholder='Add a comment' className='mt-4 border rounded w-[600px] p-2' value={comment} onChange={(e) => setComment(e.target.value)}/>
                    <button onClick={addComment} type="button" className='bg-black text-white p-2 ml-2 rounded-lg'>Send</button>
                </div>
                <div className="">
                    {recipeDetails?.comments?.map((item) => (
                        <div className="flex gap-6 pl-10 mb-10 items-center bg-white rounded-lg w-full" key={item._key}>
                            <img
                                src={item.postedBy?.image}
                                className="h-12 rounded-full cursor-pointer"
                                alt=""
                            />
                            <div className="flex flex-col">
                                <p className="font-bold">{item.postedBy?.userName}</p>
                                <p className='w-[500px]'>{item.comment}</p>
                            </div>
                            {
                                item.postedBy?.userName === userDetails.userName &&
                                    <div className="flex items-center cursor-pointer">
                                        <div onClick={() => {

                                        handleDelete(item._key) }}>
                                            <BsTrash />
                                        </div>

                                        <span onClick={() => handleUpdate(item._key)} className="ml-2">edit</span>
                                    </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RecipeDetails;