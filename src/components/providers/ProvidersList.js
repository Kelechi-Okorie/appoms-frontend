import ProviderCard from "./ProviderCard"
import { Grid } from '@mantine/core';

export default function ProvidersList(props) {
    const { providers } = props;

    return <>
        <Grid>
            {providers.map((provider, index) => {
                return (
                    <Grid.Col key={index} span={{ base: 12, md: 6, lg: 3 }}>
                        <ProviderCard provider={provider} />
                    </Grid.Col>
                )
            })}
        </Grid>
    </>
}