
import { Link } from 'react-router-dom';
import { Button, Table, Box } from '@mantine/core';

import { useGetAllServices } from '../../api/services';

export default function Services(props) {

    const { data, isLoading, error } = useGetAllServices();
    console.log(data)

    return (
        <>
            <div className="flex items-center">
                <h1>Service</h1>
                <Button variant="filled" className="ml-auto">
                    <Link to="/dashboard/new-service">New</Link>
                </Button>
            </div>

            <div>
                <div>
                    <Table striped>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Category</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {data?.data?.services?.map((service, index) => {
                                const { id, name, Category } = service;
                                const { name: categoryName } = Category;

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
                                        <Table.Td>
                                            <Link to={`/dashboard/service-details/${id}`}>{name}</Link>
                                        </Table.Td>
                                        <Table.Td>{categoryName}</Table.Td>
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