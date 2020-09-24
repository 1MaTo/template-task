import React from 'react';
import { Menu } from './components/menu/Menu';

export const PagesConstructor = ({ page: Page }) => {
    return (
        <React.Fragment>
            <Page />
            <Menu />
        </React.Fragment>
    )
}