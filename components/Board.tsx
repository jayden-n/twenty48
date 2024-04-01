import styles from "@/styles/board.module.css";

const Board = () => {
	const renderGrid = () => {
		const totalCellsCount = 16; // 4x4 dimension
		const cells: JSX.Element[] = [];

		for (let index = 0; index < totalCellsCount; index++) {
			cells.push(<div className={styles.cell} key={index}></div>);
		}

		return cells;
	};

	return (
		<div className={styles.board}>
			<div className={styles.grid}>{renderGrid()}</div>
		</div>
	);
};

export default Board;
