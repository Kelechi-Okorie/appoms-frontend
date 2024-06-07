import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { destroyCookie } from 'nookies';

import { AppShell, Burger, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FaRegUserCircle } from "react-icons/fa";

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'

export function UserRoot() {
    const [opened, { toggle }] = useDisclosure();

    const navigate = useNavigate();

    const navElements = [
        { label: 'Profile', icon: 'home', to: '/user/profile' },
        { label: 'account', icon: 'home', to: '/user/account' }
    ];

    const handleLogout = () => {
        destroyCookie(null, 'token', { path: '/' }); // remove the token cookie
        navigate('/signin');
    }

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Link to="/">
                        <Text fw={700}>APPOMS</Text>
                    </Link>

                    <div className="ml-auto cursor-pointer">
                        {/* <FaRegUserCircle

                        /> */}
                        <Menu>
                            <MenuButton>
                                <FaRegUserCircle />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <Link to="/dashboard">Dashboard</Link>
                                </MenuItem>
                                <MenuItem>
                                    <span ml-2 onClick={handleLogout}>Log out</span>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <ul>
                    {navElements.map((element, index) => {
                        const { label, to } = element;
                        return (
                            <li
                                key={index}
                            >
                                <NavLink
                                    to={to}
                                    className={({ isActive, isPending }) => `block w-full ${isActive ? "bg-cyan-500" : ""}`}
                                >
                                    {label}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell >
    );
}