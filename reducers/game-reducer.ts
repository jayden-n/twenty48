import { Tile } from "@/models/title";

type State = {
	board: string[][];
	tiles: {
		// hashmap
		// contains many elements which will be mapped with Tile model.
		[id: string]: Tile;
	};
};

type Action = {
	type: "create_tile";
	tile: Tile;
};

// [
// 	[0, 0, 0, 0],
// 	[0, 0, 0, 0],
// 	[0, 0, 0, 0],
// 	[0, 0, 0, 0],
// ];

function createBoard(tileCountPerDimension: number = 4) {
	const board: string[][] = []; // 2-dimensional array

	for (let i = 0; i < tileCountPerDimension; i++) {
		board[i] = new Array(tileCountPerDimension).fill(undefined);
	}

	return board;
}

const initialState: State = { board: createBoard(), tiles: {} };

export function gameReducer(state = initialState, action: Action) {
	switch (action.type) {
		case "create_tile": {
			const tileId = "00001";
			const [x, y] = action.tile.position; // axis
			const newBoard = JSON.parse(JSON.stringify(state.board)); // creates a deep copy =>  ensures the original state is not mutated

			newBoard[y][x] = tileId;

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
