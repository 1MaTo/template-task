import React, { useState } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import styles from '../../styles/Menu.module.scss'
import clsx from 'clsx';
import { Link } from 'react-router-dom';


export const Menu = () => {

    const [page, setPage] = useState('tasks');

    const handlePageChange = (event, newValue) => {
        setPage(newValue);
    };

    return (
        <BottomNavigation className={styles.background} showLabels value={page} onChange={handlePageChange}>
            <BottomNavigationAction
                className={clsx(styles.item, {
                    [styles.selected]: (page === "challenges"),
                })}
                label="Челенджи"
                value="challenges"
                icon={<ListAltIcon />}
                component={Link}
                to="/challenges"
            />
            <BottomNavigationAction
                className={clsx(styles.item, {
                    [styles.selected]: (page === "tasks"),
                })}
                label="Задания"
                value="tasks"
                icon={<AssignmentIcon />}
                component={Link}
                to="/tasks"
            />
        </BottomNavigation>
    );
}