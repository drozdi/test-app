import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import todoRepository from '../repositories/todoRepository.js';
import { NotFoundPage } from "./NotFoundPage.js";

export function TodoPage () {
	const params = useParams();
	let [todo, setTodo] = useState(null);
	useEffect(() => {
		(async () => {
			const response = await todoRepository.get(params.id);
			if (response.ok) {
				setTodo(await response.json());
			}
		})()
	}, [params])

	if (!todo) {
		return <NotFoundPage />;
	}
	return (<div>{todo.title}</div>)
}