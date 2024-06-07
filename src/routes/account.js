import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Image, Text, Badge, Button, Group, NativeSelect, Chip, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FaCircleUser } from "react-icons/fa6";
import { getToken } from '../helpers/getToken';
import { getCurrentUser } from '../helpers/getCurrentUser';
import { useGetUser } from '../api/users';
import axios from 'axios';
import { BASEURL } from '../constants/baseApiUrl';
import { useGetAllCategories, useGetCategoryServices } from '../api/categories';
import {
    useMutation,
} from '@tanstack/react-query';
import * as _ from 'underscore';

const postUserServices = async (formData) => {
    const response = await axios.post(`${BASEURL}/api/v1/users/services`, formData);
    return response.data;
};

const postDescription = async (formData) => {
    const response = await axios.post(`${BASEURL}/api/v1/users/add-description`, formData);
    return response.data;
};


export default function Account(props) {
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSucceded, setHasSucceded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);

    const descriptionForm = useForm({
        // mode: 'uncontrolled',
        initialValues: {
            description: '',
        },

    });

    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate('/signin');
        }
    }, [navigate]);

    const currentUser = getCurrentUser();

    const { data: userData } = useGetUser(currentUser.id);
    const { data: categoriesData } = useGetAllCategories();
    const { data: categoryServicesData } = useGetCategoryServices(selectedCategory?.id || '');

    const servicesMutation = useMutation({
        mutationFn: postUserServices,
        onSuccess: (data) => {
            console.log('has succedded', data);
            navigate('/user/profile');
        },
        onError: (error) => {
            console.log('has failed', error);
        }
    });

    const descriptionMutation = useMutation({
        mutationFn: postDescription,
        onSuccess: (data) => {
            console.log('has succedded', data);
            navigate('/user/profile');
        },
        onError: (error) => {
            console.log('has failed', error);
        }
    });

    // Append new services to the existing list without duplicates
    useEffect(() => {
        if (categoryServicesData?.data?.services) {
            setServices((prevServices) => {
                const newServices = categoryServicesData.data.services.filter(
                    (service) => !prevServices.some((prevService) => prevService.id === service.id)
                );
                return [...prevServices, ...newServices];
            });
        }
    }, [categoryServicesData?.data?.services]);

    const handleChangeCategory = (evt, category) => {
        // setCategory(event.currentTarget.value);
        // console.log({evt, category})
        setSelectedCategory(category);

        // categoryForm.setFieldValue('category', event.currentTarget.value);
    };

    const handleChangeService = (evt, service) => {
        setSelectedServices((prevServices) => {
            return [...prevServices, service];
        });

    }

    const handleSubmitServices = () => {
        const currentUser = getCurrentUser()

        const services = _.pluck(selectedServices, 'id');

        const requestData = {services, userId: currentUser.id};

        setIsSubmitting(true);
        try {
            // Mutations
            servicesMutation.mutate(requestData);
            setHasSucceded(true);
        } catch (error) {
            console.log(error);
        }
        setIsSubmitting(false);
    };

    const handleSubmitDescription = (evt) => {
        evt.preventDefault();

        const currentUser = getCurrentUser()

        const requestData = {description: descriptionForm.values.description, userId: currentUser.id};
        setIsSubmitting(true);
        try {
            // Mutations
            descriptionMutation.mutate(requestData);
            setHasSucceded(true);
        } catch (error) {
            console.log(error);
        }
        setIsSubmitting(false);
    };

    return (
        <>
            <div className="mb-5">
                <h1>User account details</h1>
            </div>

            <Card shadow="sm" padding="lg" radius="md" withBorder className='mb-6'>
                <div className='flex'>
                    <div className='mr-6'><FaCircleUser style={{ fontSize: '6rem' }} /></div>
                    <div>
                        <Text size="xl" weight={700}>{userData?.data.user.fullName}</Text>
                        <Text size="sm" weight={500}>{userData?.data.user.email}</Text>
                        <Text size="sm" weight={500}>{userData?.data.user.phone}</Text>
                    </div>
                </div>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder className='mb-6'>
                <div><h1>Describe yourself professionally</h1></div>

                <div>
                <form /* onSubmit={onSubmit} */>

                        <Textarea
                            withAsterisk
                            label="Description"
                            placeholder="Description"
                            key={descriptionForm.key('description')}
                            {...descriptionForm.getInputProps('description')}
                            minRows={10}
                        />

                        <Group justify="flex-end" mt="md">
                            <Button
                                type="submit"
                                onClick={handleSubmitDescription}
                            >
                                Submit
                            </Button>
                        </Group>
                    </form>

                </div>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder className='mb-6'>
                <div><h1>Category</h1></div>
                <hr />
                <div className='flex flex-wrap'>
                    {categoriesData?.data?.categories.map((category) => {
                        return (
                            <Chip
                                key={category.id}
                                onClick={(evt) => handleChangeCategory(evt, category)}
                                color={category.id === category ? 'magenta' : 'gray'}
                            >
                                {category.name}
                            </Chip>
                        );
                    })}
                </div>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder className='mb-6'>
                <div><h1>Services</h1></div>
                <hr />
                <div className='flex'>
                    <div>

                        <div className='flex flex-wrap'>
                            {services.map((service) => {
                                return (
                                    <Chip
                                        key={service.id}
                                        onClick={(evt) => handleChangeService(evt, service)}
                                    // color={category.id === category ? 'blue' : 'gray'}
                                    >
                                        {service.name}
                                    </Chip>
                                );
                            })}

                        </div>

                    </div>
                </div>
            </Card>

            <div>
                <Group justify="flex-end" mt="md">
                    <Button
                        type="submit"
                        onClick={handleSubmitServices}
                        disabled={isSubmitting}
                    >
                        Submit
                    </Button>
                </Group>

            </div>

        </>
    );
}