import styles from "@/styles/board.module.css";
import Tile from "./Tile";
import { useEffect, useReducer, useRef } from "react";
import { gameReducer, initialState } from "@/reducers/game-reducer";
import { Tile as TileModel } from "@/models/tile";

const Board = () => {
	const [gameState, dispatch] = useReducer(gameReducer, initialState);
	const initiallized = useRef(false);

	const handleKeyDown = (e: KeyboardEvent) => {
		e.preventDefault();

		console.log(e.code);
		switch (e.code) {
			case "ArrowUp":
				dispatch({ type: "move_up" });
				break;
			case "ArrowDown":
				dispatch({ type: "move_down" });
				break;
		}
	};

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

	// dispatch funcs
	useEffect(() => {
		if (initiallized.current === false) {
			dispatch({
				type: "create_tile",
				tile: { position: [0, 1], value: 2 },
			});
			dispatch({
				type: "create_tile",
				tile: { position: [0, 2], value: 2 },
			});

			// after the tiles have been created
			// ...tiles should not be created again on subsequent renders
			initiallized.current = true;
		}
	}, []);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<div className={styles.board}>
			<div className={styles.tiles}>{renderTiles()}</div>
			<div className={styles.grid}>{renderGrid()}</div>
		</div>
	);
};

export default Board;
