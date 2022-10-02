import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import{client} from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';

function Feed() {
    const [recipes, setRecipes] = useState(null)
    const {categoryId} = useParams()

    useEffect(() => {
        if(categoryId) {
            const query = searchQuery(categoryId)
            client.fetch(query).then((data) => {
                setRecipes(data)
            })
        } else {
            client.fetch(feedQuery)
                .then((data) => {
                    setRecipes(data)
                })
        }
    }, [categoryId])

    return (
        <div className="h-full w-full">
                <h1 className="font-bold mt-8 mb-6 text-center text-2xl">Recent Activity</h1>
                <div>{recipes && <MasonryLayout recipes={recipes}/>}</div>
        </div>
    );
}

export default Feed;