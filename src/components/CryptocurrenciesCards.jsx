import * as React from 'react';
import CurrCard from './CryptocurrencySingleCard';
import { useState, useCallback, useEffect, useRef } from 'react'
import { Button } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Footer } from './AssetPlatformsTable';
import { Box } from '@mui/material';

export default function CryptocurrenciesCards() {
    let tableData = [];
    const [data, setTableData] = useState([]);

    const getCoins = (index) => {
        // console.log("data od index = ", data[index]);
        // return data[index];
    }

    function generateCoins(length, startIndex) {
        return Array.from({ length }).map((_, i) => getCoins(i + startIndex));
    }

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        setLoading(true)
        tableData = fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=1000&page=1&sparkline=false&locale=en&x_cg_demo_api_key=CG-tv1r3zetrp9kpPuczqfCmRJj")
            .then((tableData) => tableData.json())
            .then((tableData) => {
                setTableData(tableData);
                setLoading(false);
            }), []
    }
    console.log(tableData);

    const [coins, setCoins] = useState(() => []);
    const [loading, setLoading] = useState(false);

    const loadMore = useCallback(() => {
        setLoading(true)
        return setTimeout(() => {
            setCoins((coins) => [...coins, ...generateCoins(10, coins.length)])
            setLoading(() => false)
        }, 500)
    }, [setCoins, setLoading]);

    useEffect(() => {
        const timeout = loadMore()
        return () => clearTimeout(timeout)
    }, []);

    function scrollToTop() {
        window.scrollTo(0, 0)
    }

    return (
        <Box marginTop={5}>
            <Box display="flow" alignItems="center" margin={"auto"} justifyContent='center' maxWidth={800}
            >
                {coins.map((element, index) => (
                    <CurrCard sx={{ mb: 3 }} display="flex" coinID={index} coinData={data} />
                ))}
            </Box >
            <Box style={{
                width: "100%",
                display: "flex",
                justifyContent: 'center',
            }}
            >
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
                        maxWidth="100%"
                        fontSize="large"
                        onClick={scrollToTop}
                        // margin={"auto"}
                        sx={{ justifyContent: 'center' }}
                    >
                    </KeyboardDoubleArrowUpIcon>
                </Button>
            </Box>
            <Footer context={{ loadMore, loading }} data={coins} />

        </Box>
    );
}

