import * as React from "react";
import "./StockData.css";
import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAsset, editAsset, deleteAsset } from "../../store/asset";
import { editBuyingPower } from "../../store/user";

const StockData = () => {
  const dispatch = useDispatch();
  // const userId = useSelector((state) => state.session.user.id);
  const buyingPower = useSelector((state) => state.session.user.buying_power);
  const [myArray, setMyArray] = useState();
  const [openPrice, setOpenPrice] = useState();
  const [currentPrice, setCurrentPrice] = useState();
  const [shares, setShares] = useState(0);
  const [cost, setCost] = useState();
  const [buyOrSell, setBuyOrSell] = useState("buy");
  let StockSymbol = "COIN";
  const user = useSelector((state) => state.session.user);
  const userId = user.id;
  const ticker = "COIN";
  useEffect(() => {
    setCost(shares * currentPrice);
  }, [shares]);

  /*
  *
  Using sandbox token. NEED to use production token before deploy
  *
  */
  // ========================================== Submission Functions

  let API_Call = `https://sandbox.iexapis.com/stable/stock/${StockSymbol}/intraday-prices?token=${process.env.REACT_APP_API_KEY}`;

  React.useEffect(() => {
    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const dataChart = [];
        if (!data) return;
        setOpenPrice(data[0]["open"]);
        for (let i = 0; i < data.length; i += 5) {
          dataChart.push({
            name: data[i]["label"],
            price: data[i]["close"],
          });
        }
        setCurrentPrice(dataChart[dataChart.length - 1]["price"]);
        setMyArray(dataChart);
      })
      .catch(function () {
        console.log("Failed to load API data");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(ticker);
    const form = {
      userId,
      ticker,
      shares,
      cost,
    };
    if (buyOrSell === "buy") {
      if (cost < buyingPower) {
        const buying_power = buyingPower - cost;
        const buyingPowerForm = {
          userId,
          buying_power,
        };
        dispatch(addAsset(form)).then(() => {
          // dispatch(editBuyingPower(buyingPowerForm));
        });
      } else {
        console.log("You need more $_$");
      }
    } else if (buyOrSell === "sell") {
      console.log("sell button clicked");
    }
  };

  //  const handleSubmit = () => {
  //   const form = {
  //     user_id: userId,
  //     ticker: ticker,
  //     shares,
  //     cost
  //   }
  //   dispatch(addAsset(form))
  //  }

  // ========================================== COMPONENT
  return (
    <div className="main_container">
      <div className="row">
        <div className="main_content">
          <h1>{StockSymbol}</h1>
          <LineChart width={676} height={196} data={myArray}>
            <div></div>
            <Tooltip />
            <XAxis dataKey="name" hide={true} />
            <YAxis hide={true} domain={["dataMin", "dataMax"]} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="green"
              strokeWidth={2}
              dot={false}
            />
            <ReferenceLine
              y={openPrice}
              strokeWidth={1.5}
              strokeHeight={1.5}
              strokeDasharray="1 6"
              stroke="lightslategray"
            />
          </LineChart>
        </div>
        <div className="main_trade">
          <form onSubmit={handleSubmit}>
            <div className="trade_stock_header">
              <div>
                <span onClick={() => setBuyOrSell("buy")}>
                  Buy {StockSymbol}
                </span>
              </div>
              <div>
                <span onClick={() => setBuyOrSell("sell")}>
                  Sell {StockSymbol}
                </span>
              </div>
            </div>

            <div className="trade_stock_main">
              <div className="trade_stock_shares_header">
                <div>
                  <label>Invest in</label>
                </div>
                <div>
                  <label>Share</label>
                </div>
              </div>

              <div className="trade_stock_shares">
                <div>
                  <label>Shares</label>
                </div>
                <div>
                  <label>
                    <input
                      className="trade_stock_input"
                      type="number"
                      min="0"
                      value={shares}
                      placeholder="shares"
                      onChange={(e) => setShares(e.target.value)}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="trade_stock_price">
                <div>
                  <label>Market Price</label>
                </div>
                <div>
                  <label>${currentPrice}</label>
                </div>
              </div>

              <div className="trade_stock_est_credit">
                <div>
                  {buyOrSell === "buy" ? (
                    <label>Estimated Cost</label>
                  ) : (
                    <label>Estimated Credit</label>
                  )}
                </div>
                <div>
                  <label>
                    ${shares && (Math.round(cost * 100) / 100).toFixed(2)}
                  </label>
                </div>
              </div>

              {buyOrSell === "buy" ? (
                <div className="submit_order_btn">
                  <button type="submit" className="buy_order_btn">
                    Submit Buy Order
                  </button>
                </div>
              ) : (
                <div className="submit_order_btn">
                  <button type="submit" className="sell_order_btn">
                    Submit Sell Order
                  </button>
                </div>
              )}

              <footer className="trade_stock_footer">
                <label>${buyingPower} buying power availabe</label>
              </footer>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StockData;
