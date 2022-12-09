import {Button, createStyles, Grid} from "@mantine/core";
import {ENDPOINT} from "../App.jsx";


const useStyles = createStyles((theme) => ({
    box: {
        maxWidth: 800,
        width: '100%',
    },
    gird: {
        // subscribe to color scheme changes right in your styles
        // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: theme.radius.sm,
        fontSize: 1
    },
}))


function Posts({board}) {
    const {classes} = useStyles();
    console.log(board)
    // const data = fetch(`${ENDPOINT}/posts/${board}`, {}).then((r) => r.json())
    // const posts = data.map((post) => (
    //     <Grid>
    //
    //     </Grid>
    // ))

    return (
        <>
            <Grid>
                <Grid.Col offset={11} span={3}>
                    <Button variant="outline" radius="md" size="xs" component={'a'} href={""}>
                        글쓰기
                    </Button>
                </Grid.Col>
            </Grid>

            <Grid columns={24} className={classes.gird}>
                <Grid.Col span={3}>번호</Grid.Col>
                <Grid.Col span={12}>제목</Grid.Col>
                <Grid.Col span={3}>작성자</Grid.Col>
                <Grid.Col span={3}>날짜</Grid.Col>
                <Grid.Col span={3}>조회수</Grid.Col>
            </Grid>

        </>
    )
}

export default Posts