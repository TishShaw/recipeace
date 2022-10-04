//  Fetch sanity data
export const userQuery = (userId) => {
	const query = `*[_type == "user" && _id == '${userId}']`;
	return query;
};

export const searchQuery = (searchInput) => {
	const query = `*[_type == "recipe" && title match '${searchInput}' || category match '${searchInput}' || ingredients match '${searchInput}' || instructions match '${searchInput}']{
            image{
            asset->{
                url
            }
            },
                _id,
                calories,
                servings,
                cookTime,
                postedBy->{
                _id,
                userName,
                image
                },
                save[]{
                _key,
                postedBy->{
                    _id,
                    userName,
                    image
                },
                },
            }`;
	return query;
};

export const feedQuery = `*[_type == "recipe"] | order(_createdAt desc) {
    image,
        _id,
        title,
        calories,
        servings,
        cookTime,
        postedBy->{
            _id,
            userName,
            image
        },
        save[]{
            _key,
            postedBy
        },
    } `;

export const RecipeDetailsQuery = (recipeId) => {
	const query = `*[_type == "recipe" && _id == '${recipeId}']{
        image{
        asset->{
            url
        }
        },
        _id,
        title,
        category,
        calories,
        servings,
        cookTime,
        ingredients,
        instructions,
        postedBy->{
        _id,
        userName,
        image
        },
    save[]{
        postedBy->{
            _id,
            userName,
            image
        },
        },
        comments[]{
        comment,
        _key,
        postedBy->{
            _id,
            userName,
            image
        },
        }
    }`;
	return query;
};

export const userCreatedQuery = (userId) => {
	const query = `*[ _type == 'recipe' && postedBy._ref == '${userId}'] | order(_createdAt desc){
        image{
        asset->{
            url
        }
        },
        _id,
        title,
        category,
        calories,
        servings,
        ingredients,
        instructions,
        postedBy->{
        _id,
        userName,
        image
        },
        save[]{
        postedBy->{
            _id,
            userName,
            image
        },
        },
    }`;
	return query;
};

export const userSavedQuery = (userId) => {
	const query = `*[_type == 'recipe' && '${userId}' in save[].userId ]
| order(_createdAt desc) {
        image{
        asset->{
            url
        }
        },
        _id,
        title,
        category,
        calories,
        servings,
        ingredients,
        instructions,
        postedBy->{
        _id,
        userName,
        image
        },
        save[]{
        postedBy->{
            _id,
            userName,
            image
        },
        },
    }`;
	return query;
};
