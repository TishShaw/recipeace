import {useState, useEffect, useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import { UserContext } from '../UserContext';
import {ImSpoonKnife} from 'react-icons/im';
import {HiOutlineUsers} from'react-icons/hi';
import {FiBookmark} from 'react-icons/fi';

import{client, urlFor} from '../client';
import {RecipeDetailsQuery} from '../utils/data';

function RecipeDetails(props) {
    const { userDetails } = useContext(UserContext);

    const [recipeDetails, setRecipeDetails] = useState(null);

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

    useEffect(() => {
        fetchRecipeDetails(recipeId)
    }, [recipeId])

    console.log(recipeDetails)

    return (
        <div className=''>
            <div className="md:hidden p-6">
                <div className="relative">
                    <img src={(recipeDetails?.image && urlFor(recipeDetails?.image).url())}  className="w-[500px] h-[500px] rounded-md" alt=""/>
                    <div className="absolute bg-white p-6 bottom-10 shadow">
                        <h1 className='text-xl font-bold'>{recipeDetails?.title}</h1>                   
                    </div>
                    <img src={(recipeDetails?.postedBy && (recipeDetails.postedBy.image))} className=" absolute top-5 right-5 rounded-full w-[40px] h-[40px] object-cover" alt=""/>
                </div>
                <div className="h-20 p-6 flex justify-center items-center">
    
                    <p className="flex items-center text-l mr-4 border p-2 rounded-lg shadow"><HiOutlineUsers/>{recipeDetails?.servings} Servings</p>
                    <p className="flex items-center text-l mr-4 border p-2 rounded-lg shadow"><ImSpoonKnife/>{recipeDetails?.calories} Calories</p>
                    <p className="flex items-center text-l mr-4 border p-2 rounded-lg shadow"><FiBookmark/> Save</p>
                </div>
                <div className="mt-6">
                    <h1 className="text-xl font-semibold mb-4">Ingredients</h1>
                    {
                        recipeDetails?.ingredients?.map((i) => (
                            <li key={i.key} className="mb-2">{i.ingredient}</li>
                        ))
                    }
                    
                </div>
                <div className="mt-6">
                    <h1 className="text-xl font-semibold mb-4">Instructions</h1>
                    {
                        recipeDetails?.instructions?.map((i) => (
                            <ol key={i.key}>
                                <li className="mb-4">{i}</li>
                            </ol>
                        ))
                    }
                </div>
            </div>
            <div className="sm:hidden md:flex">
                <div className="p-6 ">
                    <img src={(recipeDetails?.image && urlFor(recipeDetails?.image).url())}  className="w-[500px] h-[500px] rounded-md" />
                    <div className="border mt-4 p-2">
                        Posted By: {recipeDetails?.postedBy.userName}
                    </div>
                    <h1 className='mt-12 text-2xl font-bold'>Ingredients</h1>

                </div>
                <div className="">
                    <h1 className='recipeTitle text-5xl pt-6 ml-4 font-bold'>{recipeDetails?.title}</h1>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetails;