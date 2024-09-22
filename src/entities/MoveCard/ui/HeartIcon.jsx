const HeartIcon = ({ isFavorite, ...rest }) => {
	return (
		<svg
			fill={isFavorite ? '#FF0000' : 'stroke'}
			stroke='none'
			width='80px'
			height='80px'
			viewBox='0 0 24 24'
			id='_24x24_On_Light_Favorite'
			data-name='24x24/On Light/Favorite'
			xmlns='http://www.w3.org/2000/svg'
			{...rest}
		>
			<path
				id='Shape'
				d='M9.725,18.286l-7.87-7.7.524-.536-.524.536a6.115,6.115,0,0,1,0-8.775,6.406,6.406,0,0,1,8.394-.46,6.406,6.406,0,0,1,8.394.46,6.115,6.115,0,0,1,0,8.775l-7.87,7.7a.75.75,0,0,1-1.049,0Z'
				transform='translate(1.75 3.25)'
			/>
		</svg>
	)
}

export default HeartIcon
