import { mergeAnimationDuration, tileCountPerDimension } from "@/constants";
import { Tile } from "@/models/tile";
import { gameReducer, initialState } from "@/reducers/game-reducer";
import { isNil, throttle } from "lodash";
import {
	PropsWithChildren,
	createContext,
	useCallback,
	useEffect,
	useReducer,
} from "react";

type MoveDirection = "move_up" | "move_down" | "move_left" | "move_right";

export const GameContext = createContext({
	score: 0,
	getTiles: () => [] as Tile[],
	moveTiles: (_: MoveDirection) => {},
	startGame: () => {},
});

export default function GameProvider({ children }: PropsWithChildren) {
	const [gameState, dispatch] = useReducer(gameReducer, initialState);

	const getEmptyCells = () => {
		const results: [number, number][] = [];

		for (let x = 0; x < tileCountPerDimension; x++) {
			for (let y = 0; y < tileCountPerDimension; y++) {
				if (isNil(gameState.board[y][x])) {
					results.push([x, y]);
				}
			}
		}
		return results;
	};

	const appendRandomTile = () => {
		const emptyCells = getEmptyCells();
		if (emptyCells.length > 0) {
			const cellIndex = Math.floor(Math.random() * emptyCells.length); //getting random index
			const newTile = {
				position: emptyCells[cellIndex],
				value: 2,
			};
			dispatch({ type: "create_tile", tile: newTile });
		}
	};

	// get tiles with unique id
	const getTiles = () => {
		return gameState.tilesByIds.map(
			(tileId: string) => gameState.tiles[tileId],
		);
	};

	// debouncing user key moves
	const moveTiles = useCallback(
		throttle(
			(type: MoveDirection) => {
				dispatch({ type });
			},
			mergeAnimationDuration * 1.05,
			{ trailing: false },
		),
		[dispatch],
	);

	// start game
	const startGame = () => {
		dispatch({
			type: "create_tile",
			tile: { position: [0, 1], value: 2 },
		});
		dispatch({
			type: "create_tile",
			tile: { position: [0, 2], value: 2 },
		});
	};

	useEffect(() => {
		if (gameState.hasChanged) {
			setTimeout(() => {
				dispatch({ type: "clean_up" });
				appendRandomTile();
			}, mergeAnimationDuration); // wait for 100ms until values are merged
		}
	}, [gameState.hasChanged]);

	return (
		<GameContext.Provider
			value={{ score: gameState.score, getTiles, moveTiles, startGame }}
		>
			{children}
		</GameContext.Provider>
	);
}
