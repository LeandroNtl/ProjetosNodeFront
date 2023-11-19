import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Layout from "../../components/Layout"
import Main from "../../components/Main";


const Page = () => {

    return (
        <Layout>
            <Header />
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </Layout>
    );

};

export default Page;