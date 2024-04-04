import { tileCountPerDimension } from "@/constants";
import { Tile, TileMap } from "@/models/tile";
import { uid } from "uid";

type State = {
	board: string[][];
	// hashmap
	// contains many elements which will be mapped with Tile model.
	tiles: TileMap;
};

type Action = {
	type: "create_tile";
	tile: Tile;
};

function createBoard() {
	const board: string[][] = []; // 2-dimensional array

	for (let i = 0; i < tileCountPerDimension; i++) {
		board[i] = new Array(tileCountPerDimension).fill(undefined);
	}

	return board;
}

// [
// 	[0, 0, 0, 0],
// 	[0, 0, 0, 0],
// 	[0, 0, 0, 0],
// 	[0, 0, 0, 0],
// ];

export const initialState: State = { board: createBoard(), tiles: {} };

export function gameReducer(state = initialState, action: Action) {
	switch (action.type) {
		case "create_tile": {
			const tileId = uid((length = 1)); // placeholder ID for the new tile
			const [x, y] = action.tile.position; // axis
			const newBoard = JSON.parse(JSON.stringify(state.board)); // creates a deep copy =>  ensures the original state is not mutated
			newBoard[y][x] = tileId;

			// [
			// 	[0, 0, 0, 0],
			// 	[0, 0, "00001", 0],
			// 	[0, 0, 0, 0],
			// 	[0, 0, 0, 0],
			// ];

			return {
				...state,
				board: newBoard,
				tiles: {
					...state.tiles,
					[tileId]: action.tile,
				},
			};
		}
		default:
			return state;
	}
}
