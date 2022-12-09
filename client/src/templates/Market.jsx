import {Button, Center, Container, Grid, Input, Pagination, Select, Space} from "@mantine/core";
import {useForm} from "@mantine/form";
import {ENDPOINT} from "../App.jsx";
import {redirect} from "react-router-dom";
import Posts from "./Posts.jsx";


function Market() {
    const form = useForm({
            initialValues: {
                searchFor: 'title',
                searchInput: ''
            },
        }
    )

    async function onSubmit(event) {
        event.preventDefault()
        const data = await fetch(`${ENDPOINT}/market/search`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form.values)
        }).then((r) => r.json())
        if (data) {
            return redirect('/market/search')
        } else {

        }
    }

    return (
        <>
            <Container px={"xs"} size={"xs"}>
                <Posts board={"market"}/>

                <Space h="lg" />
                <Space h="lg" />
                {/*Search Area*/}
                <form onSubmit={onSubmit}>
                    <Grid>
                        <Grid.Col span={2}>
                            <Select
                                size="xs"
                                // label="검색"
                                placeholder="검색 항목"
                                clearable={false}
                                defaultValue="title"
                                data={[
                                    {value: 'title', label: '제목'},
                                    {value: 'text', label: '내용'},
                                    {value: 'titleAndText', label: '제목+내용'},
                                    {value: 'writer', label: '작성자'},
                                ]}
                                {...form.getInputProps("searchFor")}
                            />
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                            <Input
                                size={"xs"}
                                // placeholder="Your email"
                                {...form.getInputProps("searchInput")}
                            />
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Button type={"submit"} size={"xs"}>
                                검색
                            </Button>
                        </Grid.Col>
                    </Grid>

                </form>

                <Space h="lg" />
                <Center>
                    <Pagination total={20} siblings={2} initialPage={1} withControls={false}/>
                </Center>

            </Container>
        </>
    )
}

export default Market