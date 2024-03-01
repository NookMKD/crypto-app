import * as React from 'react';
import CurrCard from './CryptocurrencySingleCard';
import { useState, useCallback, useEffect, useRef } from 'react'
import { Button } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Footer } from './AssetPlatformsTable';
import { Box } from '@mui/material';


let data = JSON.parse(localStorage.getItem("data"))


export default function CryptocurrenciesCards() {
    const [coins, setCoins] = useState(() => []);
    const [loading, setLoading] = useState(false);

    const getCoins = (index) => {
        return data[index];
    }

    function generateCoins(length, startIndex) {
        return Array.from({ length }).map((_, i) => getCoins(i + startIndex));
    }


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
            <Box display="flow" alignItems="center" margin={"auto"} maxWidth={800}
            >
                {coins.map((element, index) => (
                    <CurrCard sx={{ mb: 3 }} display="flex" coinID={index} coinData={data} />
                ))}
            </Box >
            <Box style={{
                width: "100%",
                display: "flex",
                // justifyContent: 'center',
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

                        fontSize="large"
                        onClick={scrollToTop}

                    >
                    </KeyboardDoubleArrowUpIcon>
                </Button>
            </Box>
            <Footer context={{ loadMore, loading }} data={coins} />

        </Box>
    );
}

