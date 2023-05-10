import { app, db } from '../../firebaseConfig';
import "../styles/globals.css"
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} firebase={{app, db}} />
}
