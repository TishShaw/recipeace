import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { cat } from '../data/CategoryData';
import { UserContext } from '../UserContext';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { client } from '../client';

function AddRecipe() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [imageAsset, setImageAsset] = useState('');
	const { userDetails } = useContext(UserContext);
	const [title, setTitle] = useState('');
	const [category, setCategory] = useState('');
	const [calories, setCalories] = useState(null);
	const [servings, setServings] = useState(null);
	const [cookTime, setCookTime] = useState(null);
	const [instructions, setInstructions] = useState('');
	const [ingredients, setIngredients] = useState('');

	const handleCancel = (e) => {
		e.preventDefault();
		navigate('/dashboard');
	};

	const uploadImage = (e) => {
		const selectedFile = e.target.files[0];

		// uploading asset to sanity
		if (
			selectedFile.type === 'image/png' ||
			selectedFile.type === 'image/svg' ||
			selectedFile.type === 'image/jpeg' ||
			selectedFile.type === 'image/gif' ||
			selectedFile.type === 'image/tiff' ||
			selectedFile.type === 'image/webp'
		) {
			setLoading(true);
			client.assets
				.upload('image', selectedFile, {
					contentType: selectedFile.type,
					filename: selectedFile.name,
				})
				.then((document) => {
					setImageAsset(document);
					setLoading(false);
				})
				.catch((error) => {
					console.log('Upload failed:', error.message);
				});
		} else {
			setLoading(false);
		}
	};

	const saveNewRecipe = () => {
		if (
			title &&
			imageAsset?._id &&
			category &&
			calories &&
			servings &&
			cookTime &&
			ingredients &&
			instructions
		) {
			const doc = {
				_type: 'recipe',
				title,
				category,
				calories,
				servings,
				cookTime,
				ingredients: [ingredients],
				instructions: [instructions],
				image: {
					_type: 'image',
					asset: {
						_type: 'reference',
						_ref: imageAsset?._id,
					},
				},
				UserId: userDetails._id,
				postedBy: {
					_type: 'postedBy',
					_ref: userDetails._id,
				},
			};
			client.create(doc).then(() => {
				navigate('/dashboard');
			});
		} else {
			console.log('error saving recipe');
		}
	};
	return (
		<div className='h-full w-full'>
			<div className='bg-white absolute w-full sm:ml-auto sm:mr-auto md:w-[600px] h-[1000px] sm:w-full z-2 top-0 flex items-center lg:w-[100vw]'>
				<div className='p-6 lg:w-[100vw] bg-white w-full'>
					<h1 className='font-bold text-2xl mb-2 lg:w-[100%] bg-white'>
						Add Recipe
					</h1>
					<p className='text-slate-500'>Share a recipe that you love ❤️ </p>
					<div className='flex flex-col justify-center items-center border h-[150px] my-6 cursor-pointer pb-8'>
						<AiOutlineCloudUpload className='text-6xl text-gray-500' />
					</div>

					<form className='flex flex-col w-full'>
						<input
							type='file'
							className='mt-2 absolute top-[300px] translate-x-40 xs:translate-x-8 xs:top-[220px] xs:text-sm xs:w-[190px] lg:flex lg:justify-center lg:items-center'
							onChange={uploadImage}
						/>
						<label>Add Recipe Name:</label>
						<input
							type='text'
							className='border-2 rounded-lg mt-2 mb-6 p-2 shadow'
							id='title'
							name='title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<div className='flex flex-col'>
							<div className='flex items-center'>
								<label className='mr-2'>Choose a Category:</label>
								<select
									className='w-[200px] border-2 rounded-lg mt-2 mb-6 p-2 shadow'
									onChange={(e) => setCategory(e.target.value)}
								>
									<option>Select a category</option>
									{cat.map((c, i) => (
										<option key={i} value={c}>
											{c}
										</option>
									))}
								</select>
							</div>
							<div>
								<div className='flex items-baseline'>
									<label className='mr-2'>Enter Calories:</label>
									<input
										type='number'
										className='w-[70px] border-2 rounded-lg mt-2 mb-6 p-2 shadow'
										onChange={(e) => setCalories(e.target.value)}
									/>
								</div>
								<div>
									<label className='mr-2'>Enter Servings:</label>
									<input
										type='number'
										className='w-[70px] border-2 rounded-lg  mb-6 p-2 shadow'
										onChange={(e) => setServings(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<label>Add Recipe Ingredients:</label>
						<input
							type='text'
							className='border-2 rounded-lg mt-2 mb-2 p-2 shadow'
							onChange={(e) => setIngredients(e.target.value)}
						/>
						<span className='text-gray-400 text-sm mb-6'>
							Ex: 2 slices of bread, Peanut butter, Jelly
						</span>
						<label>Add Recipe Instructions:</label>
						<input
							type='text'
							className='border-2 rounded-lg mt-2 mb-2 p-2 shadow'
							onChange={(e) => setInstructions(e.target.value)}
						/>
						<span className='text-gray-400 text-sm mb-6'>
							Ex: Place 2 slices of bread on a plate, Use a knife to spread,
							etc.{' '}
						</span>
					</form>

					<div className='flex justify-between w-full'>
						<button
							onClick={saveNewRecipe}
							className='bg-gold text-white hover:bg-yellow-600 mt-6 py-2 px-6 rounded-xl flex justify-center items-center md:w-[180px] h-[40px] md:h-[60px] w-[100px]'
						>
							Save
						</button>
						<button
							onClick={handleCancel}
							className='border border-gold text-gold hover:bg-yellow-600 hover:text-white mt-6 py-2 px-6 rounded-xl flex justify-center items-center md:w-[180px] lg:w-[600x] h-[40px] md:h-[60px] w-[100px]'
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddRecipe;
