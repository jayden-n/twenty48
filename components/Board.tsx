import styles from "@/styles/board.module.css";
import Tile from "./Tile";
import { useCallback, useContext, useEffect, useRef } from "react";

import { Tile as TileModel } from "@/models/tile";

import { GameContext } from "@/context/game-context";

const Board = () => {
	const { getTiles, moveTiles, startGame } = useContext(GameContext);
	const initialized = useRef(false);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			// disables page scrolling with keyboard arrows
			e.preventDefault();

			// tracking keystrokes
			switch (e.code) {
				case "ArrowUp":
					moveTiles("move_up");
					break;
				case "ArrowDown":
					moveTiles("move_down");
					break;
				case "ArrowLeft":
					moveTiles("move_left");
					break;
				case "ArrowRight":
					moveTiles("move_right");
					break;
			}
		},
		[moveTiles],
	);

	const renderGrid = () => {
		const totalCellsCount = 16; // 4x4 dimensions
		const cells: JSX.Element[] = [];

		for (let index = 0; index < totalCellsCount; index += 1) {
			cells.push(<div className={styles.cell} key={index} />);
		}

		return cells;
	};

	const renderTiles = () => {
		return getTiles().map((tile: TileModel) => {
			return <Tile key={`${tile.id}`} {...tile} />;
		});
	};

	// start game
	useEffect(() => {
		if (initialized.current === false) {
			startGame();

			// after the tiles have been created
			// ...tiles should not be created again on subsequent renders
			initialized.current = true;
		}
	}, [startGame]);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<div className={styles.board}>
			<div className={styles.tiles}>{renderTiles()}</div>
			<div className={styles.grid}>{renderGrid()}</div>
		</div>
	);
};

export default Board;
