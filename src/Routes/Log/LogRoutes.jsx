//REACT
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "../../components/organisms/Layout/Layout";

//SKELETONS


//PAGES
const Home = lazy(() => import('../../Pages/Home/Home'))




const LogRoutes = () => {

    return (
        <>
            <Routes>
                <Route
                    element={
                        <Layout />
                    }
                    children={
                        <>
                            <Route
                                path="/"
                                element={
                                    <Suspense fallback={<></>}>
                                        <Home></Home>
                                    </Suspense>
                                }
                            />
                        </>
                    }
                />
            </Routes>
        </>
    );
};
export default LogRoutes;