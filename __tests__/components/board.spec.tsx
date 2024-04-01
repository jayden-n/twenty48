import { render } from "@testing-library/react";
import Board from "@/components/Board";

describe("Board", () => {
	it("should render board with 16 cells", () => {
		const { container } = render(<Board />);
		const cellElement = container.querySelectorAll(".cell");

		expect(cellElement.length).toEqual(16);
	});
});
