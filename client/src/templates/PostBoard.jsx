import {useForm} from "@mantine/form";
import {Box, Button, createStyles, Space, Textarea, TextInput} from "@mantine/core";
import {ENDPOINT} from "../App.jsx";
import {redirect} from "react-router-dom";

const useStyles = createStyles((theme) => ({
    box: {
        maxWidth: 800,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    button: {
        marginLeft: 750
    },
    gird: {
        // subscribe to color scheme changes right in your styles
        // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.radius.sm,
        fontSize: 1
    },
    textArea: {

    }
}))


function PostBoard() {
    const {classes} = useStyles();
    const form = useForm({
        initialValues: {
            title: '',
            text: '',
        }
    })

    async function onSubmit(event) {
        event.preventDefault()
        const data = await fetch(`${ENDPOINT}/posts/write`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form.values)
        }).then((r) => r.json())

        if (data) {
            return redirect(`/post/:${data.id}```)
        } else {

        }
    }
    return (
        <Box className={classes.box}>
            <form>
                <TextInput required={true} label={'제목'}>

                </TextInput>
                <Space h="lg"/>
                <Textarea className={classes.textArea} required={true} label={'내용'} minRows={10}>

                </Textarea>
                <Space h="lg"/>
                <Button className={classes.button} variant="light" size="xs" compact type={"submit"}>
                    작성
                </Button>
            </form>

        </Box>
    )
}

export default PostBoard