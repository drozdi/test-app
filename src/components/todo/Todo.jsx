export function Todo() {
	return (
		<li key={id} className={styles['list-item']}>
			{title}
			<div className={styles.actions}>
				<XBtn
					disabled={isUpdating}
					color="secondary"
					size="xs"
					onClick={() => {
						headerUpdate(id, title);
					}}
					title="Изменить"
				>
					<XIcon>mdi-note-edit-outline</XIcon>
				</XBtn>
				<XBtn
					disabled={isDeleting}
					color="danger"
					size="xs"
					onClick={() => {
						headerDelete(id);
					}}
					title="Удалить"
				>
					<XIcon>mdi-note-remove-outline</XIcon>
				</XBtn>
			</div>
		</li>
	);
}
