import React from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../helpers/getToken';
import ProvidersList from '../components/providers/ProvidersList';
import { useGetUser } from '../api/users';
import Header from '../components/Header';

import {
    Group,
    Button,
    Box,
    Container, Title, Text
} from '@mantine/core';
import classes from '../styles/HeaderMegaMenu.module.css';

export default function UserDetails(props) {

    const token = getToken();
    const { data, isLoading, error } = useGetUser(1);

    console.log(data)

    return (
        <>
            <Header />
            <div className={classes.root}>
                <Container size="lg">
                    <div className={classes.inner}>
                        the user
                    </div>

                </Container>

            </div>


        </>
    );
}
