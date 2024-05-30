import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { UsePostRegister } from '../api/users';

export default function SignUp() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const { registerUser, data, error, isLoading, isSuccess, isError }: any =
    UsePostRegister();

    const onSubmit = async () => {
        try {
            console.log(form.values);
            // await registerUser(form.values);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{paddingTop: '30px'}}>
            <div style={{ maxWidth: '340px', marginLeft: 'auto', marginRight: 'auto' }}>
                <form onSubmit={onSubmit}>
                    <TextInput
                        withAsterisk
                        label="First Name"
                        placeholder="First name"
                        key={form.key('firstName')}
                        {...form.getInputProps('firstName')}
                    />
                    <TextInput
                        withAsterisk
                        label="Last Name"
                        placeholder="Last Name"
                        key={form.key('lastName')}
                        {...form.getInputProps('lastName')}
                    />
                    <TextInput
                        withAsterisk
                        label="Phone"
                        placeholder="Phone number"
                        key={form.key('phone')}
                        {...form.getInputProps('phone')}
                    />
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        // withAsterisk
                        type="password"
                        label="Password"
                        placeholder="***********"
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </div>
        </div>
    );
}