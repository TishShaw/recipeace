export default {
	name: 'ingredient',
	title: 'Ingredient',
	type: 'document',
	fields: [
		{
			name: 'ingredient',
			title: 'Ingredient',
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
	],
};
