import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { useState } from 'react';
import { BASEURL } from '../constants/baseApiUrl';
import { getToken } from '../helpers/getToken';

// GET ALL USERS
const getAllServices = async () => {
    try {
        const token = getToken();

        // Set the admin token as a cookie using nookies
        setCookie(null, 'token', token, {
            maxAge: 18000,
            path: '/',
        });

        const config = {
            headers: {
                Authorization: token,
                Accept: 'application/json',
            },
        };

        const response = await axios.get(`${BASEURL}/api/v1/services/`, config);

        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Custom hook that fetches user data from the server.
 * @returns {{data: any, isLoading: boolean, error: any}} An object with user data, loading state, and error.
 */

export const useGetAllServices = () => {
    // const { data, isLoading, error } = useQuery(['getAllUser'], getAllUser);
    const { data, isLoading, error } = useQuery({ queryKey: ['getAllServices'], queryFn: getAllServices });
    // const queryClient = useQueryClient(); // it update the table by refetching it from the server
    // queryClient.invalidateQueries(['getAllUser']);
    return { data, isLoading, error };
};

// GET SINGLE USERS
const getService = async (id) => {
    try {
        const token = getToken();

        // Set the admin token as a cookie using nookies
        setCookie(null, 'token', token, {
            maxAge: 18000,
            path: '/',
        });

        const config = {
            headers: {
                Authorization: token,
                Accept: 'application/json',
            },
        };

        console.log('the id is', id)

        const response = await axios.get(`${BASEURL}/api/v1/services/${id}`, config);

        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Custom hook that fetches user data from the server.
 * @returns {{data: any, isLoading: boolean, error: any}} An object with user data, loading state, and error.
 */

export const useGetService = (id) => {
    const { data, isLoading, error } = useQuery({ queryKey: ['getService', id], queryFn: () => getService(id) });
    return { data, isLoading, error };
};
