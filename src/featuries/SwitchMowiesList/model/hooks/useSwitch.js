import { useEffect, useState } from 'react'
import { fetchMoviesData } from '../api/fetchDataMovies'

export const useSwitch = (isFavorite) => {
	const [movies, setMovies] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const fetchMovies = async () => {
		try {
			setIsLoading(true)
			const data = await fetchMoviesData()
			setMovies(data)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			setError(error)
		} finally {
			setIsLoading(false)
		}
	}
	const renderMovies = () => {
		return movies.length && isFavorite
			? movies.filter((item) => item.isFavorite)
			: movies
	}
	const updateMovies = (id) => {
		const update = movies.map((movie) => {
			if (movie.id === id) {
				return { ...movie, isFavorite: !movie.isFavorite }
			}
			return movie
		})
		setMovies(update)
	}

	useEffect(() => {
		fetchMovies()
	}, [])

	return { isLoading, renderMovies, error, updateMovies }
}
