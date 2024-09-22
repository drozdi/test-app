import HeartIcon from './HeartIcon'
import style from './MoveCard.module.css'

export const MoveCard = ({
	imageUrl,
	movieName,
	releaseYear,
	isFavorite,
	description,
	updateMovies,
	id,
}) => {
	return (
		<li className={style.MoveCard}>
			<img src={imageUrl} alt='img' />
			<strong>{movieName}</strong>
			<p>{releaseYear}</p>
			<p>{description}</p>
			<HeartIcon
				isFavorite={isFavorite}
				onClick={updateMovies.bind(null, id)}
			/>
		</li>
	)
}
