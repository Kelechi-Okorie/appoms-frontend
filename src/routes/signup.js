import { useNavigate, Link } from 'react-router-dom';
import { Button, Group, TextInput } from '@mantine/core';
import {
    Box,
    Text
} from '@mantine/core';
import classes from './HeaderMegaMenu.module.css';

import { useForm } from '@mantine/form';
import axios from 'axios';
import { setCookie } from 'nookies';

import { BASEURL } from '../constants/baseApiUrl';

import {
    useMutation,
} from '@tanstack/react-query';

export const postRegister = async ({ firstName, lastName, phone, email, password }) => {
    const response = await axios.post(`${BASEURL}/api/v1/auth/register`, {
        firstName,
        lastName,
        phone,
        email,
        password,
    });
    return response.data;
};

export default function SignUp() {

    const navigate = useNavigate();
    const form = useForm({
        // mode: 'uncontrolled',
        initialValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const mutation = useMutation({
        mutationFn: postRegister,
        onSuccess: (data) => {
            console.log('has succedded', data);
            setCookie(null, 'token', data.data.token, {
                path: '/',
                maxAge: 18000,
            });
            navigate('/');
        },
    })


    const onSubmit = async (evt) => {
        evt.preventDefault();
        try {
            console.log(form.values);
            mutation.mutate(form.values);
        } catch (error) {
            console.log(error);
        }
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
                            <Button variant="default">
                                <Link to="/signin" className={classes.link}>
                                    Log in
                                </Link>
                            </Button>
                        </Group>
                    </Group>
                </header>
            </Box>

            <div style={{ paddingTop: '30px' }}>
                <div style={{ maxWidth: '340px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <form /* onSubmit={onSubmit} */>
                        <TextInput
                            withAsterisk
                            label="First Name"
                            placeholder="First name"
                            key={form.key('firstName')}
                            {...form.getInputProps('firstName')}
                        />
                        <TextInput
                            withAsterisk
                            label="Last Name"
                            placeholder="Last Name"
                            key={form.key('lastName')}
                            {...form.getInputProps('lastName')}
                        />
                        <TextInput
                            withAsterisk
                            label="Phone"
                            placeholder="Phone number"
                            key={form.key('phone')}
                            {...form.getInputProps('phone')}
                        />
                        <TextInput
                            withAsterisk
                            label="Email"
                            placeholder="your@email.com"
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            // withAsterisk
                            type="password"
                            label="Password"
                            placeholder="***********"
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                        />

                        <Group justify="flex-end" mt="md">
                            <Button
                                type="submit"
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