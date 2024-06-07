

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Group, TextInput, Textarea, NativeSelect } from '@mantine/core';

import { useForm } from '@mantine/form';
import axios from 'axios';
import { setCookie } from 'nookies';

import { BASEURL } from '../../constants/baseApiUrl';
import { getToken } from '../../helpers/getToken';
import { useGetAllCategories } from '../../api/categories';
import PostSuccessModal from '../../components/modals/PostSuccessModal';
import PostFailureModal from '../../components/modals/PostFailureModal';

import {
    useMutation,
} from '@tanstack/react-query';

export const postService = async ({ name, description, category }) => {
    const response = await axios.post(`${BASEURL}/api/v1/services/new`, {
        name,
        description,
        category
    });
    return response.data;
};

export default function NewService(props) {

    // const { data, isLoading, error } = useGetAllUser();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [hasSucceded, setHasSucceded] = useState(false);

    const { data: categoryData, isLoading: isCategoryLoading, isError: isCategoryError } = useGetAllCategories();

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
            category: ''
        },

    });

    useEffect(() => {

        if (categoryData) {
            form.setFieldValue('category', categoryData?.data?.categories[0].name);
        }
    }, [categoryData, form]);

    const handleChangeCategory = (event) => {
        setCategory(event.currentTarget.value);
        form.setFieldValue('category', event.currentTarget.value);
    };

    const mutation = useMutation({
        mutationFn: postService,
        onSuccess: (data) => {
            console.log('has succedded', data);
        },
        onError: (error) => {
            console.log('has failed', error);
            setError(error.response.data.message);
        }
    });

    const onSubmit = async (evt) => {
        evt.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            // Mutations
            console.log(form.values, 'the forfm values')
            mutation.mutate(form.values);
            setHasSucceded(true);

        } catch (error) {
            console.log(error);
        }
        setIsSubmitting(false);
    };

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
        navigate('/dashboard/services');
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
                        {/* <NativeSelect
                            label="Input label"
                            description="Input description"
                            data={['React', 'Angular', 'Vue']}
                            key={form.key('category')}
                            {...form.getInputProps('category')}
                        /> */}

                        <NativeSelect
                            value={category}
                            onChange={handleChangeCategory}
                            data={categoryData?.data?.categories.map((category) => category.name)}
                        />

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
                                disabled={isSubmitting}
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