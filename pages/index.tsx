import Board from "@/components/Board";
import Score from "@/components/Score";
import Head from "next/head";
import styles from "@/styles/index.module.css";
import { FaGithub } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaChessKnight } from "react-icons/fa";

export default function Home() {
	return (
		<div className={styles.twenty48}>
			<Head>
				<title>Play Twenty48!</title>
				<meta name="description" content="2048 Game" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="favicon.ico" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="favicon32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="favicon16.png"
				/>
			</Head>
			<header>
				<h1>2048</h1>
				<Score />
			</header>
			<main>
				<Board />
			</main>

			<div className={styles.howToPlay}>
				<p>
					<span className={styles.highlight}>HOW TO PLAY:</span> Use
					your <span className={styles.highlight}>arrow keys</span> to
					move the tiles. Tiles with the same number{" "}
					<span className={styles.highlight}>merge into one</span>{" "}
					when they touch. Add them up to reach{" "}
					<span className={styles.highlight}>2048!</span>
				</p>
			</div>
			<div className={styles.line} />
			<footer>
				<div style={{ fontSize: "17px" }}>
					Made with ❤️ by{" "}
					<a
						href="https://jaydennguyen.dev"
						target="_blank"
						rel="noopener"
						style={{ color: "#776e65" }}
					>
						Jayden N.
					</a>
				</div>
				<div className={styles.socials}>
					<a
						href="https://github.com/jayden-n/twenty48"
						target="_blank"
						rel="noopener"
					>
						<FaGithub style={{ color: "#776e65" }} size={29} />
					</a>

					<a
						href="https://www.chess.com/member/aintthatjayden"
						target="_blank"
						rel="noopener"
					>
						<FaChessKnight style={{ color: "#776e65" }} size={28} />
					</a>
				</div>
			</footer>
		</div>
	);
}
