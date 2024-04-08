export type Tile = {
	id?: string;
	position: [number, number]; // y & x axis
	value: number;
};

export type TileMap = {
	[id: string]: Tile;
};
