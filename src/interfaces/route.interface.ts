import { FC } from 'react';

export default interface Route {
    key: string;
    title: string;
    path: string;
    enabled?: boolean;
    protected: boolean;
    component: FC<{}>;
    children?: Array<Route>;
}
