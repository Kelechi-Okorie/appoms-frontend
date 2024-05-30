import React from 'react';
import { Link } from 'react-router-dom';

import {
    Group,
    Button,
    Box,
    Container, Title, Text, TextInput, Image
} from '@mantine/core';
import classes from './HeaderMegaMenu.module.css';

export default function Index(props) {

    return (
        <>
            <Box pb={120} mb={120}>
                <header className={classes.header}>
                    <Group justify="space-between" h="100%">

                        <Group h="100%" gap={0} visibleFrom="sm">
                            <Link to="/" className={classes.link}>
                                <Text fw={700}>APPOMS</Text>
                            </Link>
                        </Group>

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
                    </Group>
                </header>
            </Box>

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
                </Container>
            </div>

        </>
    );
}
