export default {
	name: 'recipe',
	title: 'recipe',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'category',
			title: 'Category',
			type: 'string',
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'calories',
			title: 'Calories',
			type: 'number',
		},
		{
			name: 'servings',
			title: 'Servings',
			type: 'number',
		},
		{
			name: 'ingredients',
			title: 'Ingredients',
			type: 'array',
			of: [{ type: 'string' }],
		},
		{
			name: 'instructions',
			title: 'Instructions',
			type: 'array',
			of: [
				{
					type: 'string',
				},
			],
		},
		{
			name: 'cookTime',
			title: 'CookTime',
			type: 'string',
		},
		{
			name: 'userID',
			title: 'UserId',
			type: 'string',
		},
		{
			name: 'postedBy',
			title: 'PostedBy',
			type: 'postedBy',
		},
		{
			name: 'save',
			title: 'Save',
			type: 'array',
			of: [{ type: 'save' }],
		},
		{
			name: 'comments',
			title: 'Comments',
			type: 'comment',
			of: [{ type: 'comment' }],
		},
	],
};
