import {ENDPOINT} from "../../App.jsx";
import {useForm} from "@mantine/form";
import {Box, Button, Group, Select, TextInput} from "@mantine/core";
import {useFocusTrap} from "@mantine/hooks";
import {redirect} from "react-router-dom";

export function Register() {
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            school: ''
        },
        validate: (values) => ({
            name: values.name.length < 2 ? 'Too short name' : null,
            email: (/^\S+@\S+ac.kr+$/.test(values.email) ? null : 'Invalid email'),
            password: values.password === values.password_confirm ? null : 'Check password',
            schools: values.schools === '' ? 'plz select school' : null
        }),
    });
    const focusTrapRef = useFocusTrap();

    async function onSubmit(event) {
        event.preventDefault()
        const data = await fetch(`${ENDPOINT}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form.values)
        }).then((r) => r.json())
        if (data) {
            return redirect('/register/success')
        } else {

        }
    }

    const schools = [
        {value: 'yonsei', label: '연세대'},
        {value: 'korea', label: '고려대'},
        {value: 'sejong', label: '세종대'},
    ]

    return (
        <>
            <Box sx={{maxWidth: 400}} mx="auto">
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <TextInput ref={focusTrapRef} label="이름" placeholder="이름" required={true}
                               description={"본명을 입력해 주세요."} error={"!!!"} {...form.getInputProps('name')} />
                    <TextInput label="Email" placeholder="Email" required={true}
                               description={"학교 이메일을 입력해 주세요"} {...form.getInputProps('email')} />
                    <TextInput label="비밀번호" placeholder="비밀번호" type={"password"}
                               required={true} {...form.getInputProps('password')} />
                    <TextInput label="비밀번호 확인" placeholder="비밀번호 확인" type={"password"}
                               required={true} {...form.getInputProps('password_confirm')} />
                    <Select
                        label="학교"
                        placeholder="학교"
                        data={schools}
                        searchable
                        maxDropdownHeight={280}
                        {...form.getInputProps('school')}
                    />
                    <Group position="center" mt="xl">
                        <Button type={"submit"} variant="outline">
                            가입
                        </Button>
                    </Group>
                </form>
            </Box>
        </>
    )
}