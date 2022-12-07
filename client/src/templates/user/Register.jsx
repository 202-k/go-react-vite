
import {ENDPOINT} from "../../App.jsx";
import {useForm} from "@mantine/form";
import {Group, TextInput, Button, Select, Box} from "@mantine/core";

function checkEmail(email) {
    if (email.compare() === 'ac.kr') {

    }
}

export function Register() {
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            school: ''
        },
    });

    async function onSubmit(event) {
        event.preventDefault()
        if (form.values.password !== form.values.password_confirm) {
            console.log("check password")
        }
        else {
            await fetch(`${ENDPOINT}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form.values)
            }).then((r) => r.json())
        }
    }

    const schools =[
        { value: 'yonsei', label: '연세대' },
        { value: 'korea', label: '고려대' },
        { value: 'sejong', label: '세종대' },
    ]

    return (
        <>
            <Box sx={{ maxWidth: 400 }} mx="auto">
                <form onSubmit={onSubmit}>
                    <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
                    <TextInput label="Email" placeholder="Email" {...form.getInputProps('email')} />
                    <TextInput label="password" placeholder="password" type={"password"} {...form.getInputProps('password')} />
                    <TextInput label="password_confirm" placeholder="password_confirm" type={"password"} {...form.getInputProps('password_confirm')} />
                    <Select
                        label="school"
                        placeholder="Pick school"
                        data={schools}
                        searchable
                        maxDropdownHeight={280}
                        {...form.getInputProps('school')}
                    />
                    <Group position="center" mt="xl">
                        <Button type={"submit"} variant="outline">
                            register
                        </Button>
                    </Group>
                </form>
            </Box>
        </>
    )
}