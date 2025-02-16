import { createContext, useEffect, useState } from "react";


export const CoinContext = createContext();

// create context provider function

const CoinContextProvider =(props)=>{

    // store api data

    const [allCoin,setAllCoin] = useState([]);
    const [currency,setCurrency] = useState({
        name:"usd",
        Symbol:"$"
    })

    const FetchAllcoin = async()=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'x-cg-demo-api-key': 'CG-t4WweGPYKdXeMkhAyaNpd8ng	'
            }
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => setAllCoin(res))
            .catch(err => console.error(err));
    }


    useEffect(()=>{
        FetchAllcoin();
    },[currency])

    // whenwver the currcy gets upadted it will agoin execute Fetall coin function


    const contextValue = {
        // passing values
        allCoin,currency,setCurrency
        // now these 3 are accesible to all componenets
        
    }
    return(
        <CoinContext value={contextValue} >
            {props.children}
        </CoinContext>
    )
}

export default CoinContextProvider;