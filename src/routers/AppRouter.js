import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const loading = (<div>...loading</div>);

const Page1 = Loadable({
    loader: () => import('../components/Page1'),
    loading: () => loading
});

const Page2 = Loadable({
    loader: () => import('../components/Page2'),
    loading: () => loading
});

const NotFound = Loadable({
    loader: () => import('../components/NotFound'),
    loading: () => loading
});

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/page1" component={Page1} />
                <Route path="/page2" component={Page2} />
                <Route path="/NotFound" component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;