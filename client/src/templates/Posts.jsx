import {createStyles, Grid} from "@mantine/core";


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




function Posts(){
    const { classes } = useStyles();
    return (
        <>
            <Grid columns={24} className={classes.gird} >
                <Grid.Col span={3}>번호</Grid.Col>
                <Grid.Col span={9}>제목</Grid.Col>
                <Grid.Col span={5}>작성자</Grid.Col>
                <Grid.Col span={4}>날짜</Grid.Col>
                <Grid.Col span={2}>조회수</Grid.Col>
            </Grid>
        </>
    )
}