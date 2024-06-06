
import { Button, Table, Box } from '@mantine/core';

import { useGetAllUser } from '../../api/users';

export default function Users(props) {

    const { data, isLoading, error } = useGetAllUser();

    return (
        <>
            <div className="flex items-center">
                <h1>Users</h1>
                <Button variant="filled" className="ml-auto">New</Button>
            </div>

            <div>

                <div>
                    <Box
                        sx={(theme) => ({
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                            textAlign: 'center',
                            padding: theme.spacing.xl,
                            borderRadius: theme.radius.md,
                            cursor: 'pointer',

                            '&:hover': {
                                backgroundColor:
                                    theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                            },
                        })}
                    >
                        Box lets you add inline styles with sx prop
                    </Box>
                </div>
                <div>
                    <Table striped>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Email</Table.Th>
                                <Table.Th>Phone</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {data?.data?.users?.map((user, index) => {
                                const { fullName, email, phone, isAdmin } = user;

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
                                        <Table.Td>{fullName}</Table.Td>
                                        <Table.Td>{email}</Table.Td>
                                        <Table.Td>{phone}</Table.Td>
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