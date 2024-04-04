import styles from "@/styles/board.module.css";
import Tile from "./Tile";
import { useEffect, useReducer } from "react";
import { gameReducer, initialState } from "@/reducers/game-reducer";
import { Tile as TileModel } from "@/models/tile";

const Board = () => {
	const [gameState, dispatch] = useReducer(gameReducer, initialState);

	const renderGrid = () => {
		const totalCellsCount = 16; // 4x4 dimensions
		const cells: JSX.Element[] = [];

		for (let index = 0; index < totalCellsCount; index++) {
			cells.push(<div className={styles.cell} key={index}></div>);
		}

		return cells;
	};

	const renderTiles = () => {
		return Object.values(gameState.tiles).map(
			(tile: TileModel, index: number) => {
				return (
					<Tile
						key={`${index}`}
						position={tile.position}
						value={tile.value}
					/>
				);
			},
		);
	};

	useEffect(() => {
		dispatch({ type: "create_tile", tile: { position: [0, 1], value: 2 } });
		dispatch({ type: "create_tile", tile: { position: [0, 2], value: 2 } });
	}, []);

	return (
		<div className={styles.board}>
			<div className={styles.tiles}>{renderTiles()}</div>
			<div className={styles.grid}>{renderGrid()}</div>
		</div>
	);
};

export default Board;
