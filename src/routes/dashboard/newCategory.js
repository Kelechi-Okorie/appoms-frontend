

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
import PostSuccessModal from '../../components/modals/PostSuccessModal';
import PostFailureModal from '../../components/modals/PostFailureModal';

export const postCategory = async (requestData) => {
    const token = getToken();
    const config = {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            Accept: '*/*',
            'X-Requested-With': 'XMLHttpRequest', // Workaround for some browsers
        },
    };

    const response = await axios.post(`${BASEURL}/api/v1/user/services`, requestData, config);
    return response.data;
};



export default function NewCategory(props) {

    // const { data, isLoading, error } = useGetAllUser();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
    const [hasSucceded, setHasSucceded] = useState(false);

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

            // navigate('/dashboard/categories')
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
            setHasSucceded(true);
        } catch (error) {
            console.log(error);
        }
        setIsSubmitting(false);
    }

    const handleNew = () => {
        setHasSucceded(false);
        form.reset();
        window.scrollTo({
            left: 0,
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };


    const handleList = () => {
        setHasSucceded(false);
        navigate('/dashboard/categories');
    };

    const successActions = [
        { name: 'New', handler: handleNew },
        // {name: 'View', handler:  handleView},
        { name: 'List', handler: handleList }
    ]


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

            <PostSuccessModal
                title="Product Created Successfully"
                actions={successActions}
                slowTransitionOpened={hasSucceded}
                setSlowTransitionOpened={setHasSucceded}
            />
        </>
    );
}