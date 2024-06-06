import React from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../helpers/getToken';
import ProvidersList from '../components/providers/ProvidersList';
import { useGetAllUser } from '../api/users';
import Header from '../components/Header';

import {
    Group,
    Button,
    Box,
    Container, Title, Text
} from '@mantine/core';
import classes from '../styles/HeaderMegaMenu.module.css';

export default function Index(props) {

    const token = getToken();
    const { data, isLoading, error } = useGetAllUser();


    return (
        <>
            <Header />

            <div className={classes.root}>
                <Container size="lg">
                    <div className={classes.inner}>
                        <div className={classes.content}>
                            <Title className={classes.title}>
                                A fully featured React components library
                            </Title>

                            <Text className={classes.description} mt={30}>
                                This platform helps you showcase your handwork and to also find the best professionals close to you to handle your projects. We provide everything from getting professionals to booking appointments and getting your projects done.
                            </Text>

                            <Button
                                variant="gradient"
                                // gradient={{ from: 'pink', to: 'yellow' }}
                                size="xl"
                                className={classes.control}
                                mt={40}
                            >
                                Get started
                            </Button>
                        </div>
                    </div>

                    <div>
                        {isLoading
                            ?
                            <div>Loading...</div>
                            :
                            <ProvidersList providers={data.data.users} />
                        }
                    </div>
                </Container>

            </div>


        </>
    );
}
