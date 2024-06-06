

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import { Button, Group, TextInput, Textarea } from '@mantine/core';
import { FaRegEye } from "react-icons/fa";
import {
    Box,
    Text
} from '@mantine/core';
// import classes from '../styles/HeaderMegaMenu.module.css';

import { useForm } from '@mantine/form';
import axios from 'axios';
import { setCookie } from 'nookies';

import { BASEURL } from '../../constants/baseApiUrl';
import { getToken } from '../../helpers/getToken';

import {
    useMutation,
} from '@tanstack/react-query';

export const postCategory = async ({ name, description }) => {
    const response = await axios.post(`${BASEURL}/api/v1/categories/new`, {
        name,
        description,
    });
    return response.data;
};



export default function NewCategory(props) {

    // const { data, isLoading, error } = useGetAllUser();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);


    const navigate = useNavigate();

    // useEffect(() => {
    //     const token = getToken();
    //     console.log(token);
    //     if (token) {
    //         navigate('/dashboard');
    //     }
    // }, [navigate]);

    const form = useForm({
        // mode: 'uncontrolled',
        initialValues: {
            name: '',
            description: '',
        },

    });

    const mutation = useMutation({
        mutationFn: postCategory,
        onSuccess: (data) => {
            console.log('has succedded', data);
            setCookie(null, 'token', data.data.token, {
                path: '/',
                maxAge: 18000,
            });

            navigate('/dashboard/categories')
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
            <div className="flex items-center">
                <h1>New Category</h1>
            </div>

            <div style={{ paddingTop: '30px' }}>
                <div style={{ maxWidth: '340px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <form /* onSubmit={onSubmit} */>
                        <TextInput
                            withAsterisk
                            label="Name"
                            placeholder="name"
                            key={form.key('name')}
                            {...form.getInputProps('name')}
                        />

                        <Textarea
                            withAsterisk
                            label="Description"
                            placeholder="Description"
                            key={form.key('description')}
                            {...form.getInputProps('description')}
                            minRows={10}
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