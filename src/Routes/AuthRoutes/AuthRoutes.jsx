//REACT
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "../../components/organisms/Layout/Layout";

//SKELETONS


//PAGES
const Home = lazy(() => import('../../Pages/Home/Home'))
const Author = lazy(() => import('../../Pages/Author/Author'))




const AuthRoutes = () => {

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
                            <Route
                                path="/author/1"
                                element={
                                    <Suspense fallback={<></>}>
                                        <Author></Author>
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
export default AuthRoutes;