import React from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../helpers/getToken';
import { useGetAllUser } from '../api/users';

import {
    Group,
    Button,
    Box,
    Text
} from '@mantine/core';
import classes from '../styles/HeaderMegaMenu.module.css';


export default function Header(props) {
    const token = getToken();

    return (
        <Box pb={30} mb={30}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">

                    <Group h="100%" gap={0} visibleFrom="sm">
                        <Link to="/" className={classes.link}>
                            <Text fw={700}>APPOMS</Text>
                        </Link>
                    </Group>

                    {token ?
                        <Button variant="default">
                            <Link to="/dashboard" className={classes.link}>
                                Dashboard
                            </Link>
                        </Button>

                        :
                        <Group visibleFrom="sm">
                            <Button variant="default">
                                <Link to="/signin" className={classes.link}>
                                    Log in
                                </Link>
                            </Button>
                            <Button>
                                <Link to="/signup" className={classes.link}>
                                    Sign up
                                </Link>
                            </Button>
                        </Group>
                    }
                </Group>
            </header>
        </Box>
    );
}