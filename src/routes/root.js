import { Outlet, Link, NavLink } from 'react-router-dom';

import { AppShell, Burger, Group, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';

export function Root() {
    const [opened, { toggle }] = useDisclosure();

    const navElements = [
        { label: 'Dashboard', icon: 'home', to: '/' },
        { label: 'Users', icon: 'home', to: '/users' },
    ]

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
                    <Text fw={700}>Appoms</Text>
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