

import react, { useContext, useEffect, useState } from "react";
import './Home.css';
import { CoinContext } from "../../context/CoinContext";
import { all } from "axios";
import { Link } from "react-router-dom";

const Home = () => {

    // getting allcoin data from context

    const {allCoin,currency} = useContext(CoinContext);
    const [displayCoin,setDisplayCoin] = useState([]);
    // searchbox

    const [input,SetInput] = useState('');

    const inputHandler=(e)=>{
        SetInput(e.target.value);

        if(e.target.value === ""){
            setDisplayCoin(allCoin);
        }
    }

    // now filtering apidata (form onsubmit)

    const searchHandler= async(event)=>{
        // to avoid reloading
        event.preventDefault();

        // filtering on search input
        const coins = await allCoin.filter((item)=>{
           return item.name.toLowerCase().includes(input.toLowerCase())
        })
        // bitcoin 
        // bitcoin includes bit then it display whole bitcoin
        setDisplayCoin(coins);
    }


    // add allcoindata in displaycoin

    useEffect(()=>{
        setDisplayCoin(allCoin);
    },[allCoin])

    return (
        <div className="home">
            <div className="hero">
                <h1>Largest <br /> Crypto Marketplace </h1>
                <p>Welcome to the world's largest cryptocurrency
                    marketplace.Sign up to eploremore about cryptos
                </p>
                <form onSubmit={searchHandler} >
                        <input onChange={inputHandler} type="text" value={input} placeholder="Search Crypto.." required />
                        <button type="submit" >Search</button>
                </form>

            </div>

            <div className="crypto-table">
                <div className="table-layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p style={{textAlign:"center"}} >24H Change</p>
                    <p className="market-cap">Market cap</p>
                </div>

                {
                    // because we only want first 10 data
                    displayCoin.slice(0,10).map((item,index)=>(
                        <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                            <p>{item.market_cap_rank}</p>
                            <div className="coin-img" >
                                <img src={item.image} alt="" />
                                <p>{item.name + " - "+ item.symbol}</p>
                            </div>
                            <p>{currency.Symbol}{item.current_price.toLocaleString()}</p>
                            <p className={item.price_change_24h >0 ?"green":"red"} >
                                { Math.floor( item.price_change_24h*100)/100}
                                
                            </p>
                            <p className="market-cap">{currency.Symbol}{item.market_cap.toLocaleString()}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
export default Home;