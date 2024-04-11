import {
	containerWidth,
	mergeAnimationDuration,
	tileCountPerDimension,
} from "@/constants";
import usePreviousProps from "@/hooks/use-previous-props";
import { Tile as TileProps } from "@/models/tile";
import styles from "@/styles/tile.module.css";
import { useEffect, useState } from "react";

const Tile = ({ position, value }: TileProps) => {
	const [scale, setScale] = useState(1);

	const previousValue = usePreviousProps(value); // catch the previous value before merging
	const hasChanged = previousValue != value; // if value changed => will trigger animation

	const positionToPixels = (position: number) => {
		return (position / tileCountPerDimension) * containerWidth;
	};

	// wait until the component is rendered, animation will be triggered, then go back to normal size
	useEffect(() => {
		if (hasChanged) {
			setScale(1.2);
			setTimeout(() => setScale(1), mergeAnimationDuration);
		}
	}, [hasChanged]);

	// position 0: (0 / 4) * 320 = 0px
	// position 1: (1 / 4) * 320 = 80px
	const style = {
		left: positionToPixels(position[0]),
		top: positionToPixels(position[1]),
		transform: `scale(${scale})`,
	};

	return (
		<div className={styles.tile} style={style}>
			{value}
		</div>
	);
};
export default Tile;
