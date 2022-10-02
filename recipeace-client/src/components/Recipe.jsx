import React, {useState, useContext} from 'react';
import {Link , useNavigate} from 'react-router-dom';
import { UserContext } from '../UserContext';
import {FiBookmark} from 'react-icons/fi';
import {BsFillBookmarkFill} from 'react-icons/bs';
import { v4 as uuidv4} from 'uuid';
import { client, urlFor } from '../client';

function Recipe({ recipe: {_id, title, calories, servings, postedBy, image, save, userName} }) {
    const navigate = useNavigate();
    const { userDetails } = useContext(UserContext);
    const [onHover, setOnHover] = useState(false);
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


    return (
        <div className='m-2   w-full flex justify-center items-center' 
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
            onClick={() => navigate(`/recipe-details/${_id}`)}>
                <div className='border m-2 rounded-lg relative  hover:scale-105 sm:w-full'>
                    <img src={(urlFor(image).width(250).url())} className='rounded-lg sm:w-full md:w-[300px]' alt="recipe_image"/>

                    {alreadySaved? <BsFillBookmarkFill className='absolute top-0 right-0 m-2 text-2xl text-gray-700 cursor-pointer'/> : <FiBookmark className='absolute top-0 right-0 m-2 text-2xl text-gray-700 cursor-pointer' onClick={(e) => {
                        e.stopPropagation();
                        saveRecipe(_id);
                    }}/>}
                    
                    <div className='flex items-center pl-2 pt-2'>
                        <div className=' absolute top-0 pt-2 flex' 
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            >
                            <img src={postedBy?.image !== null ? postedBy?.image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' } alt="" className='w-[30px] h-[30px] rounded-full object-cover'/>
                            {
                                onHover ? 
                                <h2 className=' p-2 text-md text-gray-500'><Link to={`/profile/${postedBy?._id}`} 
                                >{postedBy?.userName}</Link></h2> : ''
                            }
                            
                        </div>
                        <div className="py-4">
                            <div className="text-l top-0">{title}</div>
                            <span className="text-[#C1C1C1] text-l">{calories} calories | {servings} servings</span>
                        </div>
                </div>
            </div>
            
        </div>
    );
}

export default Recipe;