import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { destroyCookie } from 'nookies';

import { AppShell, Burger, Group, Skeleton, Text, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';

export function Root() {
    const [opened, { toggle }] = useDisclosure();

    const navigate = useNavigate();

    const navElements = [
        { label: 'Dashboard', icon: 'home', to: '/dashboard' },
        { label: 'Users', icon: 'home', to: '/dashboard/users' },
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
                    {/* <MantineLogo size={30} /> */}
                    <Link to="/">
                        <Text fw={700}>APPOMS</Text>
                    </Link>

                    <Button ml="auto" onClick={handleLogout}>Log out</Button>
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