export default {
	name: 'user',
	title: 'user',
	type: 'document',
	fields: [
		{
			name: 'userName',
			title: 'UserName',
			type: 'string',
		},
		{
			name: 'email',
			title: 'Email',
			type: 'string',
		},
		{
			name: 'password',
			title: 'Password',
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
