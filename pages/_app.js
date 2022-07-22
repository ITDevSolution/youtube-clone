import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"

import { ThemeProvider } from "next-themes"
import Header from "components/Header"

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
