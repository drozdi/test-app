import { MoveCard } from '../../../entities/MoveCard'
import { useSwitch } from '../model/hooks/useSwitch'
import style from './SwitchMovies.module.css'

export const SwitchMovies = ({ isFavorite }) => {
	const { renderMovies, updateMovies } = useSwitch(isFavorite)

	return (
		<ul className={style.SwitchMoviesList}>
			{renderMovies().length === 0 && <p>No movies</p>}
			{renderMovies().map((item) => (
				<MoveCard key={item} {...item} updateMovies={updateMovies} />
			))}
		</ul>
	)
}
