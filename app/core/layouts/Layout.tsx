import { Head, BlitzLayout } from "blitz"
import Header from "../components/Header"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "frontend-dev-test"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="bg-gray-200 w-full bg-opacity-80 px-2">
        <main className="max-w-5xl pt-28 pb-20 min-h-screen mx-auto">{children}</main>
      </div>
    </>
  )
}

export default Layout
