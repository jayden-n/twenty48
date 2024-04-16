import { render } from "@testing-library/react";
import GameProvider from "@/context/game-context";
import Board from "@/components/Board";
import Score from "@/components/Score";

describe("Score", () => {
	it("should display score", () => {
		const { container } = render(
			<GameProvider>
				<Score />
				<Board />
			</GameProvider>,
		);

		expect(container.querySelector(".score > div")?.textContent).toEqual(
			"0",
		);
	});
});
