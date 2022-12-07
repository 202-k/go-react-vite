import {
    Input,
    Burger,
    createStyles,
    Drawer,
    Group,
    Header,
    Box,
    Button,
    Anchor,
    Center,
    ScrollArea,
    Divider,
    UnstyledButton, Collapse,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {IconSearch, IconChevronDown} from '@tabler/icons';
import {MantineLogo} from '@mantine/ds';

const useStyles = createStyles((theme) => ({
    header: {
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
    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
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

new Link("Feature", "/login")
new Link("Feature", "/login")
new Link("Feature", "/login")
new Link("Feature", "/login")

export function HeaderSearch() {
    const [opened, {toggle}] = useDisclosure(false, {
        onOpen() {

        },
        onClose() {

        }
    });
    const {classes} = useStyles();

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </a>
    ));

    return (
        <Box>
            <Header height={56} className={classes.header} mb={120}>
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
                        <MantineLogo size={28} />
                    </Group>


                    <Group>
                        <Group ml={50} spacing={3} className={classes.links}>
                            {items}
                        </Group>
                        <Input
                            className={classes.search}
                            placeholder="Search"
                            icon={<IconSearch size={16} stroke={1.5}/>}
                        />
                    </Group>

                    <Group className={classes.hiddenMobile}>
                        <Button variant="default">Log in</Button>
                        <Button>Sign up</Button>
                    </Group>
                </div>
            </Header>
        </Box>

    );
}