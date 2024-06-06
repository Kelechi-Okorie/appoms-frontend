

import { Link } from 'react-router-dom';
import { Button, Table, Box } from '@mantine/core';

import { useGetAllCategories } from '../../api/categories';

export default function Categories(props) {

    // const { data, isLoading, error } = useGetAllUser();
    const { data, isLoading, error } = useGetAllCategories();

    return (
        <>
            <div className="flex items-center">
                <h1>Categories</h1>
                <Button variant="filled" className="ml-auto">
                    <Link to="/dashboard/new-category">New</Link>
                    </Button>
            </div>

            <div>
                <div>
                    <Table striped>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Name</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {data?.data?.categories?.map((category, index) => {
                                const { id, name } = category;

                                return (
                                    <Table.Tr
                                        key={index}
                                        // sx={(theme) => ({
                                        //     backgroundColor: theme.colors.gray[0],
                                        //     '&:hover': {
                                        //       backgroundColor: theme.colors.gray[1],
                                        //     },
                                        // })}
                                        sx={{ backgroundColor: 'red' }}
                                        onClick={() => console.log('clicked')}
                                    >
                                        <Table.Td>{index + 1}</Table.Td>
                                        <Table.Td><Link to={`/dashboard/category-details/${id}`}>{name}</Link></Table.Td>
                                    </Table.Tr>
                                );
                            })}
                        </Table.Tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}