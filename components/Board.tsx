import styles from "@/styles/board.module.css";
import Tile from "./Tile";
import { useCallback, useContext, useEffect, useRef } from "react";

import { Tile as TileModel } from "@/models/tile";
import { mergeAnimationDuration } from "@/constants";
import { GameContext } from "@/context/game-context";

const Board = () => {
	const { appendRandomTile, gameState, dispatch } = useContext(GameContext);
	const initialized = useRef(false);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			e.preventDefault();

			// tracking keystrokes
			switch (e.code) {
				case "ArrowUp":
					dispatch({ type: "move_up" });
					break;
				case "ArrowDown":
					dispatch({ type: "move_down" });
					break;
				case "ArrowLeft":
					dispatch({ type: "move_left" });
					break;
				case "ArrowRight":
					dispatch({ type: "move_right" });
					break;
			}

			setTimeout(() => {
				dispatch({ type: "clean_up" });
				appendRandomTile();
			}, mergeAnimationDuration); // wait for 100ms until values are merged
		},
		[appendRandomTile, dispatch],
	);

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
		if (initialized.current === false) {
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
			initialized.current = true;
		}
	}, [dispatch]);

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
