import { Box, Button } from "@mui/material";
import NavBar from "./NavBar"
import { columns } from "./AssetPlatformsTable";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";


export default function MyWallet() {

    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const [myCoins, setMyCoins] = React.useState(JSON.parse(localStorage.getItem("MyCoins")));

    const handleCoinChange = (coins) => {
        setMyCoins(coins);
    }

    const removeSelectedCoins = () => {
        if (myCoins) {
            const newMyCoins = myCoins.filter(item1 => !rowSelectionModel.some(item2 => item1.id == item2));
            handleCoinChange(newMyCoins)
            localStorage.setItem("MyCoins", JSON.stringify(newMyCoins))
        }
    };


    return (
        <>
            <Box justifyContent={'center'} >
                <NavBar />
                <Box maxWidth={1400} margin={"auto"} marginTop={5}>
                    <DataGrid sx={{ height: 500, scrollbarWidth: 0 }}
                        rows={myCoins}
                        columns={columns}
                        pageSizeOptions={[0]}
                        checkboxSelection
                        rowSelectionModel={rowSelectionModel}
                        onRowSelectionModelChange={(newRowSelectionModel) => {
                            setRowSelectionModel(newRowSelectionModel);
                        }}
                        maxWidth={700}
                    />
                    <Button margin={"auto"} sx={{ color: "#AB003C" }} onClick={removeSelectedCoins}>Remove Selected Coins</Button>
                </Box>

            </Box>
        </>
    )
}