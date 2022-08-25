import React from 'react';
import Home from '../components/Home/Home';
import Layout from '../components/Layout/Layout';

const Routes = () => {
    return (
        <React.Fragment>
            <Layout>
                <Home/>
            </Layout>
        </React.Fragment>
    );
};

export default Routes;