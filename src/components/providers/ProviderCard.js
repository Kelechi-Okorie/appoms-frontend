import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import {
    Card,
    Image,
    Text,
    ActionIcon,
    Badge,
    Group,
    Center,
    Avatar,
    useMantineTheme,
    rem,
} from '@mantine/core';
import classes from '../../styles/ArticleCard.module.css';

export default function ProviderCard(props) {
    const linkProps = { href: 'https://mantine.dev', target: '_blank', rel: 'noopener noreferrer' };
    const theme = useMantineTheme();
    const { provider } = props;

    return (
        <Card withBorder radius="md" className={classes.card}>
            <Card.Section>
                <a {...linkProps}>
                    <Image src="https://i.imgur.com/Cij5vdL.png" height={180} />
                </a>
            </Card.Section>

            <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
                outstanding
            </Badge>

            <Text className={classes.title} fw={500}>
                <Link to={`/user-details/${provider.id}`}>
                    {provider.fullName}
                </Link>
            </Text>

            <Text fz="sm" c="dimmed" lineClamp={4}>
                Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very
                different direction to its predecessor, namely the fact that this time round instead of
                fighting against various mutated zombies, you’re now dealing with more occult enemies like
                werewolves and vampires.
            </Text>

            <Group justify="space-between" className={classes.footer}>
                <Center>
                    <Avatar
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                        size={24}
                        radius="xl"
                        mr="xs"
                    />
                    <Text fz="sm" inline>
                        Bill Wormeater
                    </Text>
                </Center>

                <Group gap={8} mr={0}>
                    <ActionIcon className={classes.action}>
                        <IconHeart style={{ width: rem(16), height: rem(16) }} color={theme.colors.red[6]} />
                    </ActionIcon>
                    <ActionIcon className={classes.action}>
                        <IconBookmark
                            style={{ width: rem(16), height: rem(16) }}
                            color={theme.colors.yellow[7]}
                        />
                    </ActionIcon>
                    <ActionIcon className={classes.action}>
                        <IconShare style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} />
                    </ActionIcon>
                </Group>
            </Group>
        </Card>
    );

}