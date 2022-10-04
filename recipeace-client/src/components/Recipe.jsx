import React, {useState, useContext} from 'react';
import {Link , useNavigate} from 'react-router-dom';
import { UserContext } from '../UserContext';
import {FiBookmark} from 'react-icons/fi';
import {BsFillBookmarkFill} from 'react-icons/bs';
import { v4 as uuidv4} from 'uuid';
import { client, urlFor } from '../client';
import {ImCancelCircle} from 'react-icons/im';

import {handleDelete} from '../data/CategoryData';

function Recipe({ recipe }) {
    const navigate = useNavigate();
    const { userDetails } = useContext(UserContext);
    const [onHover, setOnHover] = useState(false);

    const {_id, title, calories, servings, postedBy, image, save} = recipe;

    const alreadySaved = !!(save?.filter((item) => item.postedBy?.ref === userDetails._id))?.length;

    const saveRecipe = (id) => {
        if(!alreadySaved) {
            client  
                .patch(id)
                .setIfMissing({save: []})
                .insert('after', 'save[-1]', [{
                    _key: uuidv4(),
                    userId: userDetails._id,
                    postedBy: {
                        _type: 'postedBy',
                        ref: userDetails._id
                    }
                }])
                .commit()
                .then(() => {
                    window.location.reload();
                })
        }
    }
console.log(recipe);
    return (
        <div className='flex justify-center items-center m-2' 
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
            onClick={() => navigate(`/recipe-details/${_id}`)}>
                <div className='border m-2 rounded-lg relative  hover:scale-105 sm:w-full xxl:w-[500px] xl:w-[400px] lg:w-[350px]'>
                    <img src={(urlFor(image).url())} className='rounded-lg sm:w-full w-[100px] md:w-[300px] xs:w-full' alt="recipe_image"/>

                    {alreadySaved? <BsFillBookmarkFill className='absolute top-0 right-0 m-2 text-2xl text-gray-700 cursor-pointer'/> : <FiBookmark className='absolute top-0 right-0 m-2 text-2xl text-gray-700 cursor-pointer' onClick={(e) => {
                        e.stopPropagation();
                        saveRecipe(_id);
                    }}/>}
                    
                    <div className='flex items-center pl-2 pt-2'>
                        <div className=' absolute top-0 pt-2 flex' 
                            onClick={(e) => {
                                e.stopPropagation();
                            }}>
                            <img src={(urlFor(recipe.postedBy.image).url())} alt="user_image" className='w-[30px] h-[30px] rounded-full object-cover'/>
                            {
                                onHover ? 
                                    <h2 className=' p-2 text-md text-gray-500'><Link to={`/profile/${postedBy?._id}`} 
                                    >{postedBy?.userName}</Link></h2> : ''
                            }
                            
                        </div>
                        <div className="py-4">
                            <div className="text-l top-0">{title}</div>
                            <span className="text-[#C1C1C1] text-l">{calories} calories | {servings} servings</span>
                            { 
                            userDetails._id === postedBy._id ?
                                <span className="absolute bottom-50 right-2 hover:text-red-600 cursor-pointer" onClick={(e) => {
                                        e.stopPropagation()
                                        handleDelete(_id)
                                    }}><ImCancelCircle/>
                                </span> : ""
                            }
                        </div>
                </div>
            </div>
            
        </div>
    );
}

export default Recipe;