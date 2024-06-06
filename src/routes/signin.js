

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import { Button, Group, TextInput } from '@mantine/core';
import { FaRegEye } from "react-icons/fa";
import {
    Box,
    Text
} from '@mantine/core';
import classes from '../styles/HeaderMegaMenu.module.css';

import { useForm } from '@mantine/form';
import axios from 'axios';
import { setCookie } from 'nookies';

import { BASEURL } from '../constants/baseApiUrl';
import { getToken } from '../helpers/getToken';

import {
    useMutation,
} from '@tanstack/react-query';

export const postLogin = async ({ email, password }) => {
    const response = await axios.post(`${BASEURL}/api/v1/auth/login`, {
        email,
        password,
    });
    return response.data;
};

export default function SignIn() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (token) {
            navigate('/user/acount');
        }
    }, [navigate]);

    const form = useForm({
        // mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const mutation = useMutation({
        mutationFn: postLogin,
        onSuccess: (data) => {
            console.log('has succedded', data);
            setCookie(null, 'token', data.data.token, {
                path: '/',
                maxAge: 18000,
            });

            setCookie(null, 'user', JSON.stringify(data.data.user), {
                path: '/',
                maxAge: 18000,
            });

            navigate('/')
        },
        onError: (error) => {
            console.log('has failed', error);
            setError(error.response.data.message);
        }
    })


    const onSubmit = async (evt) => {
        evt.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            // Mutations
            mutation.mutate(form.values);

        } catch (error) {
            console.log(error);
        }
        setIsSubmitting(false);
    }

    return (
        <>
            <Box mb={50}>
                <header className={classes.header}>
                    <Group justify="space-between" h="100%">

                        <Group h="100%" gap={0} visibleFrom="sm">
                            <Link to="/" className={classes.link}>
                                <Text fw={700}>APPOMS</Text>
                            </Link>
                        </Group>

                        <Group visibleFrom="sm">
                            <Button>
                                <Link to="/signup" className={classes.link}>
                                    Sign up
                                </Link>
                            </Button>
                        </Group>
                    </Group>
                </header>
            </Box>



            <div style={{ paddingTop: '30px' }}>
                <div style={{ maxWidth: '340px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Alert status='error' display={error ? "block" : "none"}>
                        <AlertIcon />
                        {/* <AlertTitle>{error}</AlertTitle> */}
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                    <form /* onSubmit={onSubmit} */>
                        <TextInput
                            withAsterisk
                            label="Email"
                            placeholder="your@email.com"
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            // withAsterisk
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            placeholder="***********"
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                            rightSection={
                                <FaRegEye
                                    aria-label="Clear input"
                                    onClick={() => setShowPassword(!showPassword)}
                                    // style={{ cursor: 'pointer' }}
                                />
                            }
                        />

                        <Group justify="flex-end" mt="md">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                onClick={onSubmit}
                            >
                                Submit
                            </Button>
                        </Group>
                    </form>
                </div>
            </div>
        </>
    );
}