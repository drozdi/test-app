import { movies } from '../../../../shared/api/data/movies'

export const fetchMoviesData = () => {
	return new Promise((res) => {
		setTimeout(() => {
			res(movies)
		}, 2000)
	})
}
