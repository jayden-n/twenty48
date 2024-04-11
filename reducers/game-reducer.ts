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
	| { type: "move_up" }
	| { type: "move_down" }
	| { type: "move_left" }
	| { type: "move_right" };

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
		// ====================== CREATE TILE ACTION ======================
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
					[tileId]: { id: tileId, ...action.tile }, // assigned ID for each tile getting created
				},
			};
		}

		// ====================== MOVE UP ACTION ======================
		case "move_up": {
			const newBoard = createBoard();
			const newTiles: TileMap = {};

			for (let x = 0; x < tileCountPerDimension; x++) {
				// game moves up ⬆️
				// Y axis always 0
				let newY = 0;
				let previousTile: Tile | undefined;

				// loop through each cell in the current column
				for (let y = 0; y < tileCountPerDimension; y++) {
					// get the tile ID at the current cell position
					const tileId = state.board[y][x];
					const currentTile = state.tiles[tileId];

					if (!isNil(tileId)) {
						// if there was a tile above it with the same value, stacks together
						if (previousTile?.value === currentTile.value) {
							// merging...
							newTiles[previousTile.id as string] = {
								...previousTile,
								value: previousTile.value * 2,
							};

							// stacking...
							newTiles[tileId] = {
								...currentTile,
								position: [x, newY - 1],
							};
							// resetting
							previousTile = undefined;
							continue;
						}

						newBoard[newY][x] = tileId; // updates the position of the tile in new game board after moving it upwards

						newTiles[tileId] = {
							...currentTile,
							position: [x, newY],
						};

						previousTile = newTiles[tileId];
						// increments 'newY' to track the next available position in the current column for placing a tile
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

		// ====================== MOVE DOWN ACTION ======================
		case "move_down": {
			const newBoard = createBoard();
			const newTiles: TileMap = {};

			for (let x = 0; x < tileCountPerDimension; x++) {
				// game moves down ⬇️
				let newY = tileCountPerDimension - 1;
				let previousTile: Tile | undefined;

				for (let y = 0; y < tileCountPerDimension; y++) {
					// get the tile ID at the current cell position
					const tileId = state.board[y][x];
					const currentTile = state.tiles[tileId];

					if (!isNil(tileId)) {
						if (previousTile?.value === currentTile.value) {
							// merging...
							newTiles[previousTile.id as string] = {
								...previousTile,
								value: previousTile.value * 2,
							};

							// stacking...
							newTiles[tileId] = {
								...currentTile,
								position: [x, newY + 1],
							};
							// resetting
							previousTile = undefined;
							continue;
						}

						newBoard[newY][x] = tileId; // updates the position of the tile in new game board
						newTiles[tileId] = {
							...currentTile,
							position: [x, newY],
						};

						previousTile = newTiles[tileId];
						newY--;
					}
				}
			}

			return {
				...state,
				board: newBoard,
				tiles: newTiles,
			};
		}
		// ====================== MOVE LEFT ACTION ======================
		case "move_left": {
			const newBoard = createBoard();
			const newTiles: TileMap = {};

			for (let y = 0; y < tileCountPerDimension; y++) {
				// game moves left ⬅️
				let newX = 0;
				let previousTile: Tile | undefined;

				// loop through each cell in the current column
				for (let x = 0; x < tileCountPerDimension; x++) {
					// get the tile ID at the current cell position
					const tileId = state.board[y][x];
					const currentTile = state.tiles[tileId];

					if (!isNil(tileId)) {
						if (previousTile?.value === currentTile.value) {
							newTiles[tileId] = {
								...currentTile,
								position: [newX - 1, y],
							};
							// resetting
							previousTile = undefined;
							continue;
						}

						newBoard[y][newX] = tileId; // Set the tile ID in the new board at the updated position
						newTiles[tileId] = {
							...currentTile,
							position: [newX, y],
						};

						previousTile = newTiles[tileId];
						newX++;
					}
				}
			}

			return {
				...state,
				board: newBoard,
				tiles: newTiles,
			};
		}

		// ====================== MOVE RIGHT ACTION ======================
		case "move_right": {
			const newBoard = createBoard();
			const newTiles: TileMap = {};

			for (let y = 0; y < tileCountPerDimension; y++) {
				// game moves right 👉🏼
				let newX = tileCountPerDimension - 1;
				let previousTile: Tile | undefined;

				// loop through each cell in the current column
				for (let x = 0; x < tileCountPerDimension; x++) {
					// get the tile ID at the current cell position
					const tileId = state.board[y][x];
					const currentTile = state.tiles[tileId];

					if (!isNil(tileId)) {
						if (previousTile?.value === currentTile.value) {
							newTiles[tileId] = {
								...currentTile,
								position: [newX + 1, y],
							};
							// resetting
							previousTile = undefined;
							continue;
						}

						newBoard[y][newX] = tileId; // Set the tile ID in the new board at the updated position
						newTiles[tileId] = {
							...currentTile,
							position: [newX, y],
						};

						previousTile = newTiles[tileId];
						newX--;
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
