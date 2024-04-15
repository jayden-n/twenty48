import GameProvider from "@/context/game-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<GameProvider>
			<Component {...pageProps} />
		</GameProvider>
	);
}
