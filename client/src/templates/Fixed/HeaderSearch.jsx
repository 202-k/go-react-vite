import {
    Burger,
    createStyles,
    Drawer,
    Group,
    Header,
    Button,
    Anchor,
    ActionIcon
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {IconSearch, IconChevronDown, IconAlbum} from '@tabler/icons';
import {MantineLogo} from '@mantine/ds';

const useStyles = createStyles((theme) => ({
    header: {
        marginBottom: 50,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },

    inner: {
        height: 56,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    search: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
}));

let links = []

class Link {
    constructor(label, link) {
        this.link = link
        this.label = label
        links.push(this)
    }
}

new Link("장터", "/market")
new Link("Q&A", "/login")
new Link("자유게시판", "/login")
new Link("Feature", "/login")

export function HeaderSearch() {
    const [opened, {toggle}] = useDisclosure(false, {});
    const {classes} = useStyles();

    const items = links.map((link) => (
        <Anchor
            component={"a"}
            key={link.label}
            href={link.link}
            className={classes.link}
        >
            {link.label}
        </Anchor>
    ));

    return (
        <Header height={56} className={classes.header} >
            <div className={classes.inner}>
                <Group>
                    <Burger opened={opened} onClick={toggle} size="sm"/>
                    <Drawer
                        opened={opened}
                        onClose={toggle}
                        title="Menu"
                        padding="xl"
                        size="l"
                    >
                        {items}
                    </Drawer>
                    <ActionIcon component={'a'} href={'/'} size={50}> <MantineLogo size={28} /> </ActionIcon>

                </Group>

                <Group>
                    <Group ml={50} spacing={3} className={classes.links}>
                        {items}
                    </Group>
                    {/*<Input*/}
                    {/*    className={classes.search}*/}
                    {/*    placeholder="Search"*/}
                    {/*    icon={<IconSearch size={16} stroke={1.5}/>}*/}
                    {/*/>*/}
                    <Button variant="default" component={"a"} href={"/login"} >
                        Login
                    </Button>
                    <Button component={"a"} href={"/register"}>Sign up</Button>
                </Group>
            </div>
        </Header>
    );
}