import { tileCountPerDimension } from "@/constants";
import { Tile, TileMap } from "@/models/tile";
import { isNil } from "lodash";
import { uid } from "uid";

type State = {
	board: string[][];
	// hashmap
	// contains many elements which will be mapped with Tile model.
	tiles: TileMap;
};

type Action =
	| {
			type: "create_tile";
			tile: Tile;
	  }
	| { type: "move_up" };

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

		case "move_up": {
			const newBoard = createBoard();
			const newTiles: TileMap = {};

			for (let x = 0; x < tileCountPerDimension; x++) {
				// game moves up ⬆️
				// Y axis always 0
				let newY = 0;

				// loop through each cell in the current column
				for (let y = 0; y < tileCountPerDimension; y++) {
					// get the tile ID at the current cell position
					const tileId = state.board[y][x];

					// check if there is a tile at the current position
					if (!isNil(tileId)) {
						newBoard[newY][x] = tileId; // Set the tile ID in the new board at the updated position
						newTiles[tileId] = {
							...state.tiles[tileId],
							position: [x, newY],
						};
						newY++;
					}
				}
			}

			return {
				...state,
				board: newBoard,
				tiles: newTiles,
			};
		}

		default:
			return state;
	}
}
