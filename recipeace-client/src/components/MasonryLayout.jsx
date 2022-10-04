import Masonry from 'react-masonry-css';
import Recipe from './Recipe';
import Spinner from './Spinner';

const breakpointsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1000: 4,
    800: 2,
    500: 1,
    300: 1
}

function MasonryLayout({recipes}) {
    
    if(!recipes) {
        return <Spinner message="Loading recipes..."/>
    }
    return (
        <Masonry className='flex animate-slide-fwd' breakpointCols={breakpointsObj}>
            {recipes?.map((recipe) => <Recipe key={recipe._id} recipe={recipe} className='w-max' />)}
                {
                recipes?.length === 0 && <div className='text-2xl w-max flex justify-center items-center m-10 text-center'>No Recipes Found! </div>
                }
        </Masonry>
    );
}

export default MasonryLayout;