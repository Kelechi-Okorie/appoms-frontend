import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { useState } from 'react';
import { BASEURL } from '../constants/baseApiUrl';
import { getToken } from '../helpers/getToken';

// GET ALL USERS
const getAllCategories = async () => {
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

        const response = await axios.get(`${BASEURL}/api/v1/categories/`, config);

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

export const useGetAllCategories = () => {
    // const { data, isLoading, error } = useQuery(['getAllUser'], getAllUser);
    const { data, isLoading, error } = useQuery({ queryKey: ['getAllCategories'], queryFn: getAllCategories });
    // const queryClient = useQueryClient(); // it update the table by refetching it from the server
    // queryClient.invalidateQueries(['getAllUser']);
    return { data, isLoading, error };
};

export const postLogin = async ({ email, password }) => {
    const response = await axios.post(`${BASEURL}/api/v1/auth/login`, {
        email,
        password,
    });
    return response.data;
};

export const UsePostLogin = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: postLogin,
        onSuccess: () => {
            // Invalidate and refresh
            queryClient.invalidateQueries({ queryKey: 'getAllUser' });
        }
    });
    // const loginUser = async (userData) => {
    //     await mutation.mutate(userData);
    // };

    return {
        // loginUser,
        // isLoading,
        // data,
        // error,
        // isSuccess,
        mutation
    };
};

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

// hooks
export const UsePostRegister = () => {
    // const { mutate, data, isLoading, error, isError, isSuccess } =
    //     useMutation(postRegister, {
    //         onSuccess: (data) => console.log('successfull', data),
    //         onError: (error) => console.log('an error occured', error)
    //     });

    // const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: postLogin,
        // onSuccess: () => {
        //     // Invalidate and refresh
        //     queryClient.invalidateQueries({queryKey: 'getAllUser'});
        // }
    });

    const registerUser = async (userData) => {
        await mutation.mutate(userData);
    };


    return {
        registerUser,
        // isLoading,
        // data,
        // error,
        // isError,
        // isSuccess,
        // mutation
    };
};


