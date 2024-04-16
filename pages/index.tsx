import Board from "@/components/Board";
import Score from "@/components/Score";
import Head from "next/head";
import styles from "@/styles/index.module.css";
import { FaGithub } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

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

			<footer>
				<div style={{ fontSize: "17px" }}>
					Made with ❤️ by Jayden N.
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
						href="https://jaydennguyen.dev"
						target="_blank"
						rel="noopener"
					>
						<FaUserCircle style={{ color: "#776e65" }} size={30} />
					</a>
				</div>
			</footer>
		</div>
	);
}
