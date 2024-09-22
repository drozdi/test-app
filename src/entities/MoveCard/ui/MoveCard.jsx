import HeartIcon from './HeartIcon';
import style from './MoveCard.module.css';

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
			<div className={style.preview}>
				<img src={imageUrl} alt="img" />
			</div>
			<div className={style.info}>
				<div>
					<strong>{movieName}</strong>
					<p>{releaseYear}</p>
					<p>{description}</p>
				</div>
				<HeartIcon
					isFavorite={isFavorite}
					onClick={updateMovies.bind(null, id)}
				/>
			</div>
		</li>
	);
};

/**
 * 
 *  <div class="group relative">
        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men&#039;s Basic Tee in black." class="">
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" class="absolute inset-0"></span>
                Basic Tee
              </a>
            </h3>
            <p class="mt-1 text-sm text-gray-500">Black</p>
          </div>
          <p class="text-sm font-medium text-gray-900">$35</p>
        </div>
      </div>
 */
