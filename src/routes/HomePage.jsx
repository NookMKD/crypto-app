
import * as React from 'react';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar'
import DataTable from "../components/HomePageTable";

export default function HomePage() {
    return (
        <Box>
            <NavBar />
            <DataTable footer="hideFooter"></DataTable>
        </Box>
    )
}