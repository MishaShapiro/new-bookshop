import { PropsWithChildren } from "react"
import Header from "./Header"
import Head from "next/head"

function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Head>
                <>
                    <title>New bookshop</title>
                </>
            </Head>
            <Header />
            {children}
        </>
    )
}

export default Layout