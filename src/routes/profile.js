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
import { useGetUserServices } from '../api/users';

export default function Profile(props) {
    const currentUser = getCurrentUser();
    const { data: userData } = useGetUser(currentUser.id);
    const { data: servicesData } = useGetUserServices(currentUser.id);

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
                <div className='mb-2'><h1>Describe yourself professionally</h1></div>
                <hr className='mb-5' />
                <Text weight={500}>{userData?.data.user.description}</Text>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder className='mb-6'>
                <div className='mb-2'><h1>Services I render</h1></div>
                <hr className='mb-5' />
                <div className='flex flex-wrap'>
                    {servicesData?.data?.services.map((service) => {
                        const { name } = service;
                        return (
                            <Chip
                                key={service.id}
                                defaultChecked
                            >
                                {name}
                            </Chip>
                        );
                    })}
                </div>
            </Card>

        </>
    )
}
