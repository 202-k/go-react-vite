import {useForm} from "@mantine/form";
import {Textarea, TextInput} from "@mantine/core";


function PostBoard() {
    const form = useForm({
        initialValues: {
            title: '',
            text: '',
        }
    })
    return (
        <>
            <form>
                <TextInput required={true} label={'제목'}>

                </TextInput>

                <Textarea required={true} label={'내용'}>

                </Textarea>
            </form>
        </>
    )
}

export default PostBoard