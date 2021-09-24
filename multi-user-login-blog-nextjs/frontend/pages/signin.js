import Layout from "../components/Layout"
import Link from "next/link"
const Signin = () => {
    return (
        <Layout>
            <h2>from signin</h2>
            <Link href="/">
                <a>Home</a>
            </Link>
        </Layout>
    )
}

export default Signin
