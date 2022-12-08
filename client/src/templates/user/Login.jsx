import {ENDPOINT} from "../../App.jsx";
import {useForm} from "@mantine/form";
import {useFocusTrap} from "@mantine/hooks";
import {redirect} from "react-router-dom";
import {Box, Group, TextInput, Button} from "@mantine/core";

export function Login() {
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => ({
            email: (/^\S+@\S+ac.kr+$/.test(values.email) ? null : 'Invalid email'),
        }),
    });

    const focusTrapRef = useFocusTrap();

    async function onSubmit(event) {
        const data = fetch(`${ENDPOINT}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form.values)
        }).then((r) => r.json())
        if (data) {
            return redirect('/')
        }
    }

    return (
        <>
            <Box sx={{maxWidth: 400}} mx="auto">
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <TextInput label="Email" placeholder="Email" ref={focusTrapRef}
                               required={true} {...form.getInputProps('email')} />
                    <TextInput label="비밀 번호" placeholder="비밀 번호" type={"password"}
                               required={true} {...form.getInputProps('password')} />
                    <Group position="center" mt="xl">
                        <Button type={"submit"} variant="outline">
                            로그인
                        </Button>
                    </Group>
                </form>
            </Box>
        </>
    )
}

export default Login