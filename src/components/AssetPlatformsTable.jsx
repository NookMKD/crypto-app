import { Virtuoso } from 'react-virtuoso'
import Button from '@mui/material/Button';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
// import data from '../assets/markets.json';
import { Block } from '@mui/icons-material';
import React from 'react';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import props from 'prop-types';
import { Toolbar } from '@mui/material';
import { GridEventListener } from '@mui/x-data-grid';
import { useGridApiRef } from '@mui/x-data-grid';
import { useGridApiEventHandler } from '@mui/x-data-grid';


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

export default function AssetPlatformsTable() {
    const [tableData, setTableData] = useState([]);
    const [coins, setCoins] = useState([]);
    const [tableDataStatus, setTableDataStatus] = useState(false);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        const data = fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=1000&page=1&sparkline=false&locale=en&x_cg_demo_api_key=CG-tv1r3zetrp9kpPuczqfCmRJj")
            .then((data) => data.json())
            .then((data) => setTableData(data))
            .then(setTableDataStatus(true))
    }, [])
    let i = 0;
    console.log(tableData);
    // let data = JSON.parse(localStorage.getItem("data"));

    const getCoins = (index) => {
        // console.log("data od index = ", data[index]);
        // return data[index];
    }

    function generateCoins(length, startIndex) {
        let Array;
        // return Array.from({ length }).map((_, i) => getCoin(i + startIndex));

    }

    const loadMore = useCallback(() => {
        return setTimeout(() => {
            setCoins((coins) => [...coins, ...generateCoins(10, coins.length)])
        }, 1000)
    }, []);

    console.log(coins);

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
                <Box sx={{ margin: "auto", }}>
                    {tableDataStatus
                        ? <>
                            < DataGrid sx={{ height: 578 }}
                                rows={coins}
                                columns={columns}
                                pageSizeOptions={[0]}
                                disableRowSelectionOnClick
                                hideFooter
                            />
                        </> : <>
                            <></>
                        </>}
                </Box>
            </Box  >
            <Button
                onClick={scrollToTop}
                variant="contained"
                sx={{
                    display: 'flex', backgroundColor: '#AB003C', borderRadius: '15%', margin: 'auto', mt: 2, ':hover': {
                        bgcolor: 'black',
                    }
                }}

            >
                <KeyboardDoubleArrowUpIcon
                    fontSize='large'
                >
                </KeyboardDoubleArrowUpIcon>
            </Button >
            {/* <Footer context={{ loadMore, loading }} data={coins} sx={{}}></Footer> */}
        </>
    )
}
