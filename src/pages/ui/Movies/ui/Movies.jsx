import { SwitchMovies } from '../../../../featuries/SwitchMowiesList';

export const Movies = ({ isFavorite, title }) => {
	return (
		<>
			<h2>{title}</h2>
			<SwitchMovies isFavorite={isFavorite} />
		</>
	);
};
