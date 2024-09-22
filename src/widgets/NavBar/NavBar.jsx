import { NavLink } from 'react-router-dom'
import { routesName, routesPath } from '../../shared/const'
import style from './NavBar.module.css'

export const NavBar = () => {
	return (
		<nav className={style.NavBar}>
			<NavLink
				to={routesPath[routesName.HOME]}
				className={({ isActive }) => (isActive ? style.active : '')}
			>
				{routesName.HOME}
			</NavLink>
			<NavLink
				to={routesPath[routesName.ALL_MOVIES]}
				className={({ isActive }) => (isActive ? style.active : '')}
			>
				{routesName.ALL_MOVIES}
			</NavLink>
			<NavLink
				to={routesPath[routesName.FAVORITES]}
				className={({ isActive }) => (isActive ? style.active : '')}
			>
				{routesName.FAVORITES}
			</NavLink>
		</nav>
	)
}
