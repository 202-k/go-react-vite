import {useState} from "react";
import {Center, Pagination} from "@mantine/core";

function MyPagination() {
    const [activePage, setPage] = useState(1);

    return (
        <>
            <Center>
                <Pagination page={activePage} onChange={setPage} total={20} siblings={2} />
            </Center>

        </>

    )
}


export default MyPagination