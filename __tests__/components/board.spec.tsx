import { render } from "@testing-library/react";
import Board from "@/components/Board";
import GameProvider from "@/context/game-context";

describe("Board", () => {
	it("should render board with 16 cells", () => {
		const { container } = render(
			<GameProvider>
				<Board />
			</GameProvider>,
		);
		const cellElement = container.querySelectorAll(".cell");

		expect(cellElement.length).toEqual(16);
	});

	it("should render board with 2 tiles", () => {
		const { container } = render(
			<GameProvider>
				<Board />
			</GameProvider>,
		);
		const tileElement = container.querySelectorAll(".tile");

		expect(tileElement.length).toEqual(2);
	});
});
