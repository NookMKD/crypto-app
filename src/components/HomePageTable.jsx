import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
// import data from '../assets/markets.json';
import tableDataFunc from './TableData';


const columns = [
    {
        field: 'market_cap_rank', headerName: 'Rank',
        headerAlign: 'center',
        align: 'center',
        width: 65,
        sortable: false,
        disableColumnMenu: true,
        ReadOnly: true
    },
    {
        headerName: 'Logo',
        field: "image",
        renderCell: (params) => <img height={40} src={params.value} />,
        margine: "auto",
        headerAlign: 'center',
        align: 'center',
        width: 65,
        sortable: false,
        disableColumnMenu: true,
        ReadOnly: true

    },
    {
        field: 'name',
        headerName: 'Name',
        headerAlign: 'center',
        align: 'center',
        width: 135,
        sortable: false,
        disableColumnMenu: true,
        ReadOnly: true
    },
    // { field: 'id', headerName: 'ID' },
    {
        field: 'symbol', headerName: 'Symbol',
        headerAlign: 'center',
        align: 'center',
        width: 135,
        sortable: false,
        disableColumnMenu: true,
        ReadOnly: true
    },

    {
        field: 'high_24h', headerName: '24h high',
        headerAlign: 'center',
        align: 'center',
        width: 135,
        sortable: false,
        disableColumnMenu: true,
        ReadOnly: true
    },
    {
        field: 'low_24h', headerName: '24h low',
        headerAlign: 'center',
        align: 'center',
        width: 135,
        sortable: false,
        disableColumnMenu: true,
        ReadOnly: true
    },
]


export default function DataTable() {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        const data = fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=1000&page=1&sparkline=false&locale=en&x_cg_demo_api_key=CG-tv1r3zetrp9kpPuczqfCmRJj")
            .then((data) => data.json())
            .then((data) => setTableData(data))
    }, [])

    console.log(tableData);


    localStorage.setItem("data", JSON.stringify(tableData));

    return (
        <Box sx={{
            height: 580, width: '100%', align: 'center'
        }
        } marginTop={5}>

            <Box maxWidth={700} sx={{ justifyContent: 'center', display: 'flex', margin: "auto" }}>
                <DataGrid
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                                width: "100%",
                            },
                        },

                        alignItems: "center",

                    }}
                    hideFooter
                    rows={tableData} className="htCenter"
                    justifyContent='center'
                    columns={columns}
                />
            </Box>
        </Box>
    );
}

