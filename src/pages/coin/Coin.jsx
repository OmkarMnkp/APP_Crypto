import React, { useContext, useEffect, useState } from "react";
import './Coin.css';
import { useParams } from "react-router-dom";
import { CoinContext } from '../../context/CoinContext';
import LineChart from "../../components/Linechart/LineChart";

const Coin = () => {
    const { coinId } = useParams();
    const [coinData, setCoinData] = useState(null); // Set initial state to null
    const [historicalData, setHistoricalData] = useState(null); // Set initial state to null
    const { currency } = useContext(CoinContext);

    // Fetch coin data
    const fetchCoinData = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-t4WweGPYKdXeMkhAyaNpd8ng'
            }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
            .then(res => res.json())
            .then(res => setCoinData(res))
            .catch(err => console.error(err));
    };

    // Fetch historical data
    const fetchHistoricalData = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-t4WweGPYKdXeMkhAyaNpd8ng'
            }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
            .then(res => res.json())
            .then(res => setHistoricalData(res))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchCoinData();
        fetchHistoricalData();
    }, [coinId, currency]);

    // Check if both coinData and historicalData are available before rendering
    if (!coinData || !historicalData) {
        return (
            <div className="spinner">
                <div className="spin">
                    {/* You can add a spinner/loading animation here */}
                    {/* Loading... */}
                </div>
            </div>
        );
    }

    // Safely access data to avoid undefined errors
    const currentPrice = coinData.market_data?.current_price?.[currency.name];
    const marketCap = coinData.market_data?.market_cap?.[currency.name];
    const high24 = coinData.market_data?.high_24h?.[currency.name];
    const low24 = coinData.market_data?.low_24h?.[currency.name];

    return (
        <div className="coin">
            <div className="coin-name">
                <img src={coinData.image.large} alt={`${coinData.name} logo`} />
                <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
            </div>

            {/* Mounting LineChart */}
            <div className="coin-chart">
                <LineChart historicalData={historicalData} />
            </div>

            {/* coin information */}
            <div className="coin-info">
                <ul>
                    <li>Crypto Market Rank</li>
                    <li>{coinData.market_cap_rank}</li>
                </ul>
                <ul>
                    <li>Current Price</li>
                    <li>{currency.Symbol}{currentPrice ? currentPrice.toLocaleString() : 'N/A'}</li>
                </ul>
                <ul>
                    <li>Market Cap</li>
                    <li>{currency.Symbol}{marketCap ? marketCap.toLocaleString() : 'N/A'}</li>
                </ul>
                <ul>
                    <li>24 Hour High</li>
                    <li>{currency.Symbol}{high24 ? high24.toLocaleString() : 'N/A'}</li>
                </ul>
                <ul>
                    <li>24 Hour Low</li>
                    <li>{currency.Symbol}{low24 ? low24.toLocaleString() : 'N/A'}</li>
                </ul>
            </div>
        </div>
    );
};

export default Coin;
