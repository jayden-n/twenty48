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
			expect(Object.values(state.tiles)).toEqual([tile]);
		});
	});

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
	});
});