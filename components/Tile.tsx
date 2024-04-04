import { containerWidth, tileCountPerDimension } from "@/constants";
import { Tile as TileProps } from "@/models/tile";
import styles from "@/styles/tile.module.css";

const Tile = ({ position, value }: TileProps) => {
	const positionToPixels = (position: number) => {
		return (position / tileCountPerDimension) * containerWidth;
	};

	// position 0: (0 / 4) * 320 = 0px
	// position 1: (1 / 4) * 320 = 80px

	const style = {
		left: positionToPixels(position[0]),
		top: positionToPixels(position[1]),
	};

	return (
		<div className={styles.tile} style={style}>
			{value}
		</div>
	);
};
export default Tile;
