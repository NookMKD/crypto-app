import { useState, useEffect } from 'react';

export default function tableDataFunc() {
    const [tableData, setTableData] = useState();
    let data;
    useEffect(() => {
        if (!tableData) {
            data = fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=1000&page=1&sparkline=false&locale=en&x_cg_demo_api_key=CG-tv1r3zetrp9kpPuczqfCmRJj")
                .then((data) => data.json())
                .then((data) => setTableData(data))
        }
        // setTableData(data;
        // fetch("https://api.coingecko.com/api/v3/coins/markets/?&x_cg_demo_api_key=CG-tv1r3zetrp9kpPuczqfCmRJj")

        console.log(tableData);

    })
    return tableData
}