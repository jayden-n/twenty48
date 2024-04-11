import { Tile } from "@/models/tile";
import { gameReducer, initialState } from "@/reducers/game-reducer";
import { act, renderHook } from "@testing-library/react";
import { isNil } from "lodash";
import { useReducer } from "react";

describe("gameReducer", () => {
	describe("createTile", () => {
		it("should create a new tile", () => {
			const tile: Tile = {
				position: [0, 0],
				value: 2,
			};

			const { result } = renderHook(() =>
				useReducer(gameReducer, initialState),
			);
			const [, dispatch] = result.current;

			act(() => dispatch({ type: "create_tile", tile }));

			const [state] = result.current; // grab the current state after dispatching

			expect(state.board[0][0]).toBeDefined();
			expect(Object.values(state.tiles)).toEqual([
				{ id: state.board[0][0], ...tile },
			]);
		});
	});

	// ================================================ MOVE UP ⬆️ ================================================
	describe("move_up", () => {
		it("should move tiles to the top of the board", () => {
			const tile1: Tile = {
				position: [0, 1],
				value: 2,
			};

			const tile2: Tile = {
				position: [1, 3],
				value: 4,
			};

			const { result } = renderHook(() =>
				useReducer(gameReducer, initialState),
			);
			const [, dispatch] = result.current;

			act(() => {
				dispatch({ type: "create_tile", tile: tile1 });
				dispatch({ type: "create_tile", tile: tile2 });
			});

			// ============== BEFORE MOVING ==============
			const [stateBefore] = result.current;

			// confirm if top-left corner is truthy when tiles move up... [y, x]

			//   board: [
			//     [ null, null, null, null ],
			//     [ '2', null, null, null ],
			//     [ null, null, null, null ],
			//     [ null, '4', null, null ]
			//   ],

			expect(isNil(stateBefore.board[0][0])).toBeTruthy();
			expect(isNil(stateBefore.board[0][1])).toBeTruthy();
			expect(typeof stateBefore.board[1][0]).toBe("string");
			expect(typeof stateBefore.board[3][1]).toBe("string");

			act(() => dispatch({ type: "move_up" }));

			// ============== AFTER MOVING ==============
			const [stateAfter] = result.current;

			expect(typeof stateAfter.board[0][0]).toBe("string");
			expect(typeof stateAfter.board[0][1]).toBe("string");
			expect(isNil(stateAfter.board[1][0])).toBeTruthy();
			expect(isNil(stateAfter.board[3][1])).toBeTruthy();
		});

		// ============== TILE STACKING ==============
		it("should stack tiles with the same value on top of each other", () => {
			const tile1: Tile = {
				position: [0, 1],
				value: 2,
			};
			const tile2: Tile = {
				position: [0, 3],
				value: 2,
			};

			const { result } = renderHook(() =>
				useReducer(gameReducer, initialState),
			);
			const [, dispatch] = result.current;

			act(() => {
				dispatch({ type: "create_tile", tile: tile1 });
				dispatch({ type: "create_tile", tile: tile2 });
			});

			// ============== BEFORE MOVING ==============
			const [stateBefore] = result.current;

			// vertical line
			expect(isNil(stateBefore.board[0][0])).toBeTruthy();
			expect(typeof stateBefore.board[1][0]).toBe("string");
			expect(isNil(stateBefore.board[2][0])).toBeTruthy();
			expect(typeof stateBefore.board[3][0]).toBe("string");

			act(() => dispatch({ type: "move_up" }));

			// ============== AFTER MOVING ==============
			const [stateAfter] = result.current;

			// vertical line
			expect(typeof stateAfter.board[0][0]).toBe("string");
			expect(isNil(stateAfter.board[1][0])).toBeTruthy();
			expect(isNil(stateAfter.board[2][0])).toBeTruthy();
			expect(isNil(stateAfter.board[3][0])).toBeTruthy();
		});

		// ============== TILE MERGING ==============
		it("should merge tiles with the same value on top of each other", () => {
			const tile1: Tile = {
				position: [0, 1],
				value: 2,
			};
			const tile2: Tile = {
				position: [0, 3],
				value: 2,
			};

			const { result } = renderHook(() =>
				useReducer(gameReducer, initialState),
			);
			const [, dispatch] = result.current;

			act(() => {
				dispatch({ type: "create_tile", tile: tile1 });
				dispatch({ type: "create_tile", tile: tile2 });
			});

			// ============== BEFORE MOVING ==============
			const [stateBefore] = result.current;

			// vertical line
			expect(isNil(stateBefore.board[0][0])).toBeTruthy();
			expect(stateBefore.tiles[stateBefore.board[1][0]].value).toBe(2);
			expect(isNil(stateBefore.board[2][0])).toBeTruthy();
			expect(stateBefore.tiles[stateBefore.board[3][0]].value).toBe(2);

			act(() => dispatch({ type: "move_up" }));

			// ============== AFTER MOVING ==============
			const [stateAfter] = result.current;

			// vertical line
			expect(stateAfter.tiles[stateAfter.board[0][0]].value).toBe(4);
			expect(isNil(stateAfter.board[1][0])).toBeTruthy();
			expect(isNil(stateAfter.board[2][0])).toBeTruthy();
			expect(isNil(stateAfter.board[3][0])).toBeTruthy();
		});
	});
	// ================================================ MOVE DOWN ⬇️ ================================================
	describe("move_down", () => {
		it("should move tiles to the bottom of the board", () => {
			const tile1: Tile = {
				position: [0, 1],
				value: 2,
			};

			const tile2: Tile = {
				position: [1, 3],
				value: 4,
			};

			const { result } = renderHook(() =>
				useReducer(gameReducer, initialState),
			);
			const [, dispatch] = result.current;

			act(() => {
				dispatch({ type: "create_tile", tile: tile1 });
				dispatch({ type: "create_tile", tile: tile2 });
			});

			// ============== BEFORE MOVING ==============
			const [stateBefore] = result.current;

			// checking the soon-to-be filled is null first
			expect(isNil(stateBefore.board[0][0])).toBeTruthy();
			// check if the tile is filled with strings
			expect(typeof stateBefore.board[1][0]).toBe("string");
			expect(typeof stateBefore.board[3][1]).toBe("string");

			act(() => dispatch({ type: "move_down" }));

			// ============== AFTER MOVING ==============
			const [stateAfter] = result.current;

			expect(typeof stateAfter.board[3][0]).toBe("string");
			expect(typeof stateAfter.board[3][1]).toBe("string");
			expect(isNil(stateAfter.board[1][0])).toBeTruthy();
		});

		// ============== TILE STACKING ==============
		it("should stack tiles with the same value at bottom of each other", () => {
			const tile1: Tile = {
				position: [0, 1],
				value: 2,
			};
			const tile2: Tile = {
				position: [0, 3],
				value: 2,
			};

			const { result } = renderHook(() =>
				useReducer(gameReducer, initialState),
			);
			const [, dispatch] = result.current;

			act(() => {
				dispatch({ type: "create_tile", tile: tile1 });
				dispatch({ type: "create_tile", tile: tile2 });
			});

			// ============== BEFORE MOVING ==============
			const [stateBefore] = result.current;

			// vertical line
			expect(isNil(stateBefore.board[0][0])).toBeTruthy();
			expect(typeof stateBefore.board[1][0]).toBe("string");
			expect(isNil(stateBefore.board[2][0])).toBeTruthy();
			expect(typeof stateBefore.board[3][0]).toBe("string");

			act(() => dispatch({ type: "move_down" }));

			// ============== AFTER MOVING ==============
			const [stateAfter] = result.current;

			// vertical line
			expect(isNil(stateAfter.board[0][0])).toBeTruthy();
			expect(isNil(stateAfter.board[1][0])).toBeTruthy();
			expect(isNil(stateAfter.board[2][0])).toBeTruthy();
			expect(typeof stateAfter.board[3][0]).toBe("string");
		});

		// ============== TILE MERGING ==============
		it("should merge tiles with the same value at bottom of each other", () => {
			const tile1: Tile = {
				position: [0, 1],
				value: 2,
			};
			const tile2: Tile = {
				position: [0, 3],
				value: 2,
			};

			const { result } = renderHook(() =>
				useReducer(gameReducer, initialState),
			);
			const [, dispatch] = result.current;

			act(() => {
				dispatch({ type: "create_tile", tile: tile1 });
				dispatch({ type: "create_tile", tile: tile2 });
			});

			// ============== BEFORE MOVING ==============
			const [stateBefore] = result.current;

			// vertical line
			expect(isNil(stateBefore.board[0][0])).toBeTruthy();
			expect(stateBefore.tiles[stateBefore.board[1][0]].value).toBe(2);
			expect(isNil(stateBefore.board[2][0])).toBeTruthy();
			expect(stateBefore.tiles[stateBefore.board[3][0]].value).toBe(2);

			act(() => dispatch({ type: "move_down" }));

			// ============== AFTER MOVING ==============
			const [stateAfter] = result.current;

			// vertical line
			expect(isNil(stateAfter.board[0][0])).toBeTruthy();
			expect(isNil(stateAfter.board[1][0])).toBeTruthy();
			expect(isNil(stateAfter.board[2][0])).toBeTruthy();
			expect(stateAfter.tiles[stateAfter.board[3][0]].value).toBe(4);
		});
	});
});

// ================================================ MOVE LEFT ⬅️ ================================================

describe("move_left", () => {
	it("should move tiles to the left of the board", () => {
		const tile1: Tile = {
			position: [0, 1],
			value: 2,
		};

		const tile2: Tile = {
			position: [1, 3],
			value: 4,
		};

		const { result } = renderHook(() =>
			useReducer(gameReducer, initialState),
		);
		const [, dispatch] = result.current;

		act(() => {
			dispatch({ type: "create_tile", tile: tile1 });
			dispatch({ type: "create_tile", tile: tile2 });
		});

		// ============== BEFORE MOVING ==============
		const [stateBefore] = result.current;

		expect(isNil(stateBefore.board[3][0])).toBeTruthy();
		expect(typeof stateBefore.board[1][0]).toBe("string");
		expect(typeof stateBefore.board[3][1]).toBe("string");

		act(() => dispatch({ type: "move_left" }));

		// ============== AFTER MOVING ==============
		const [stateAfter] = result.current;

		expect(typeof stateAfter.board[1][0]).toBe("string");
		expect(typeof stateAfter.board[3][0]).toBe("string");
		expect(isNil(stateAfter.board[3][1])).toBeTruthy();
	});

	// ============== TILE STACKING ==============
	it("should stack tiles with the same value to the left of each other", () => {
		const tile1: Tile = {
			position: [0, 1],
			value: 2,
		};
		const tile2: Tile = {
			position: [3, 1],
			value: 2,
		};

		const { result } = renderHook(() =>
			useReducer(gameReducer, initialState),
		);
		const [, dispatch] = result.current;

		act(() => {
			dispatch({ type: "create_tile", tile: tile1 });
			dispatch({ type: "create_tile", tile: tile2 });
		});

		// ============== BEFORE MOVING ==============
		const [stateBefore] = result.current;

		// horizontal line
		expect(isNil(stateBefore.board[1][1])).toBeTruthy();
		expect(typeof stateBefore.board[1][0]).toBe("string");
		expect(isNil(stateBefore.board[1][2])).toBeTruthy();
		expect(typeof stateBefore.board[1][3]).toBe("string");

		act(() => dispatch({ type: "move_left" }));

		// ============== AFTER MOVING ==============
		const [stateAfter] = result.current;

		// horizontal line
		expect(typeof stateAfter.board[1][0]).toBe("string");
		expect(isNil(stateAfter.board[1][1])).toBeTruthy();
		expect(isNil(stateAfter.board[1][2])).toBeTruthy();
		expect(isNil(stateAfter.board[1][3])).toBeTruthy();
	});
});

// ================================================ MOVE RIGHT 👉🏼 ================================================
describe("move_right", () => {
	it("should move tiles to the left of the board", () => {
		const tile1: Tile = {
			position: [0, 1],
			value: 2,
		};

		const tile2: Tile = {
			position: [1, 3],
			value: 4,
		};

		const { result } = renderHook(() =>
			useReducer(gameReducer, initialState),
		);
		const [, dispatch] = result.current;

		act(() => {
			dispatch({ type: "create_tile", tile: tile1 });
			dispatch({ type: "create_tile", tile: tile2 });
		});

		// ============== BEFORE MOVING ==============
		const [stateBefore] = result.current;

		expect(isNil(stateBefore.board[1][3])).toBeTruthy();
		expect(isNil(stateBefore.board[3][3])).toBeTruthy();
		expect(typeof stateBefore.board[1][0]).toBe("string");
		expect(typeof stateBefore.board[3][1]).toBe("string");

		act(() => dispatch({ type: "move_right" }));

		// ============== AFTER MOVING ==============
		const [stateAfter] = result.current;

		expect(typeof stateAfter.board[1][3]).toBe("string");
		expect(typeof stateAfter.board[3][3]).toBe("string");
		expect(isNil(stateAfter.board[1][0])).toBeTruthy();
		expect(isNil(stateAfter.board[3][1])).toBeTruthy();
	});

	// ============== TILE STACKING ==============
	it("should stack tiles with the same value to the right of each other", () => {
		const tile1: Tile = {
			position: [0, 1],
			value: 2,
		};
		const tile2: Tile = {
			position: [3, 1],
			value: 2,
		};

		const { result } = renderHook(() =>
			useReducer(gameReducer, initialState),
		);
		const [, dispatch] = result.current;

		act(() => {
			dispatch({ type: "create_tile", tile: tile1 });
			dispatch({ type: "create_tile", tile: tile2 });
		});

		// ============== BEFORE MOVING ==============
		const [stateBefore] = result.current;

		// horizontal line
		expect(isNil(stateBefore.board[1][1])).toBeTruthy();
		expect(typeof stateBefore.board[1][0]).toBe("string");
		expect(isNil(stateBefore.board[1][2])).toBeTruthy();
		expect(typeof stateBefore.board[1][3]).toBe("string");

		act(() => dispatch({ type: "move_right" }));

		// ============== AFTER MOVING ==============
		const [stateAfter] = result.current;

		// horizontal line
		expect(isNil(stateAfter.board[1][0])).toBeTruthy();
		expect(isNil(stateAfter.board[1][1])).toBeTruthy();
		expect(isNil(stateAfter.board[1][2])).toBeTruthy();
		expect(typeof stateAfter.board[1][3]).toBe("string");
	});
});
