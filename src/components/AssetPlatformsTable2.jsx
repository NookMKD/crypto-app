import Button from '@mui/material/Button';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import data from '../assets/markets.json';
import React from 'react';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbarColumnsButton } from '@mui/x-data-grid';
import { GridToolbarContainer } from '@mui/x-data-grid';
// import SearchBar from './SearchBar';
// import SearchBar from "material-ui-search-bar";
import Box from '@mui/material/Box';


export const columns = [
    {
        headerName: 'Logo',
        field: "image",
        renderCell: (params) => <img height={40} src={params.value} />,
        margine: "auto",
        headerAlign: 'center',
        align: 'center',
        width: 135,

    },
    {
        field: 'name',
        headerName: 'Name',
        headerAlign: 'center',
        align: 'center',
        width: 135
    },
    // { field: 'id', headerName: 'ID' },
    {
        field: 'symbol', headerName: 'Symbol',
        headerAlign: 'center',
        align: 'center',
        width: 135
    },
    {
        field: 'market_cap_rank', headerName: 'Rank',
        headerAlign: 'center',
        align: 'center',
        width: 90
    },

    {
        field: 'price_change_percentage_24h', headerName: '24Hr Price Change',
        headerAlign: 'center',
        align: 'center',
        width: 175
    },
]

function scrollToTop() {
    window.scrollTo(0, 0)
}

export const Footer = ({ context: { loadMore, loading } }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Button disabled={loading} onClick={loadMore}
                variant="contained"
                bgcolor="#AB003C"
                sx={{
                    bgcolor: "#AB003C",
                    mt: 3, mb: 2, ":hover": {
                        bgcolor: "black",

                    }
                }}
            >
                {loading ? 'Loading...' : 'Press to load more'}
            </Button>
        </div>
    )
}

const getCoins = (index) => {
    if (!data[index]) {
        ;
        data[index] = coin(index)
    }
    return data[index]
}

function generateCoins(length, startIndex) {
    return Array.from({ length }).map((_, i) => getCoins(i + startIndex));
}


export default function App() {


    const [searchText, setSearchText] = useState("");
    const [coins, setCoins] = useState(() => []);
    const [loading, setLoading] = useState(false);
    const DATASET = coins;
    const [tableData, setTableData] = useState(DATASET);
    const divRef = useRef(null);



    const loadMore = useCallback(() => {
        setLoading(true)
        return setTimeout(() => {
            setCoins((coins) => [...coins, ...generateCoins(10, coins.length)])
            setLoading(() => false);
            setTableData(coins);
        }, 500)
    }, [setCoins, setLoading]);

    const requestSearch = (searchValue) => {
        const searchRegex = new RegExp(`.*${searchValue}.*`, "ig");
        const filteredRows = DATASET.filter((o) => {
            return Object.keys(o).some((k) => {
                return searchRegex.test(o[k].toString());
            });
        });
        setTableData(filteredRows);
    };



    const cancelSearch = () => {
        setSearchText("");
        requestSearch(searchText);
    };

    const CustomToolbar = (props) => (
        <div>
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
            </GridToolbarContainer>
            <SearchBar {...props} />
        </div>
    );


    useEffect(() => {
        const timeout = loadMore()
        return () => clearTimeout(timeout)
    }, []);

    function scrollToTop() {
        document.querySelector('.MuiDataGrid-virtualScroller').scrollTop = 0;
    }

    return (
        <>
            <Box maxWidth={"100%"} id="back-to-top-anchor" sx={{ justifyContent: 'center', display: 'flex', margin: "auto", }}>
                <Box maxWidth={1} sx={{ margin: "auto", }}>
                    <DataGrid sx={{ height: 578, }}
                        rows={tableData}
                        columns={columns}
                        pageSizeOptions={[0]}
                        disableRowSelectionOnClick
                        hideFooter

                    />
                </Box>


            </Box  >
            <Button
                onClick={scrollToTop}
                variant="contained"
                sx={{
                    display: 'flex', backgroundColor: "#AB003C", borderRadius: "15%", margin: "auto", mt: 2, ":hover": {
                        bgcolor: "black",
                    }
                }}

            >
                <KeyboardDoubleArrowUpIcon
                    fontSize="large"
                >
                </KeyboardDoubleArrowUpIcon>
            </Button >
            <Footer context={{ loadMore, loading }} data={coins} sx={{}}></Footer>
        </>
    )
}
