import "@/styles/globals.css";
import "@/styles/main.scss";
import "@/styles/variables.scss";
import "@/styles/components/dashboard.scss";
import "@/styles/components/header.scss";
import "@/styles/components/additional-info.scss";
import "@/styles/components/temperature-list.scss";
import "@/styles/components/displayed-lists.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
