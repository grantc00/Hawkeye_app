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
import {
  addAsset,
  updateAsset,
  sellAsset,
  getAllAssets,
} from "../../store/asset";
import { editBuyingPower } from "../../store/session";
import { searchStockData } from "../../store/stockData";
import { getWatchlists } from "../../store/watchlist";
import { addToWatchlist } from "../../store/watchlist_stock";
import { useParams } from "react-router-dom";
import { Modal } from "../../context/Modal";
import ListCheck from "../ListCheck/ListCheck";

const StockData = () => {
  const dispatch = useDispatch();
  // const userId = useSelector((state) => state.session.user.id);
  const userBuyingPower = useSelector(
    (state) => state.session.user.buying_power
  );
  const [myArray, setMyArray] = useState();
  const [openPrice, setOpenPrice] = useState();
  const [currentPrice, setCurrentPrice] = useState();
  const [shares, setShares] = useState(0);
  const [cost, setCost] = useState();
  const [buyOrSell, setBuyOrSell] = useState("buy");
  const { stockticker } = useParams();
  const [showModal, setShowModal] = useState(false);

  //checked add stock to watchlist
  const [checked, setChecked] = useState();

  const user = useSelector((state) => state.session.user);
  const userId = user.id;
  // const ticker = "AAPL";

  // ---------------
  const assets = useSelector((state) => state.asset[0]);
  const [assetId, setAssetId] = useState();
  const [ownStockShares, setOwnStockShares] = useState();
  const [disable, setDisable] = React.useState(false);
  const [ownedStockCost, setOwnStockCost] = useState();
  const watchlists = useSelector((state) => state.watchlist[0]);
  const [watchlistId, setWatchlistId] = useState();
  const [addToWatchlistId, setAddToWatchlistId] = useState();
  // console.log(watchlists, "---------------");

  const handleChange = (e) => {
    const target = e.target;
    if (target.checked) {
      setChecked(target.value);
    }
  };

  const handleAddStockSubmit = (e) => {
    e.preventDefault();
    const watchlist_id = addToWatchlistId;

    const form = {
      watchlist_id,
      stock_ticker: stockticker,
    };
    dispatch(addToWatchlist(form));
  };

  const handleWatchlistChange = (e) => {
    setWatchlistId(e.target.value);
  };

  useEffect(() => {
    if (assets !== undefined) {
      let findOwnedStock = assets.filter((i) => i.ticker.includes(stockticker));
      if (findOwnedStock.length) {
        setAssetId(findOwnedStock[0].id);
        setOwnStockShares(findOwnedStock[0].shares);
        setOwnStockCost(findOwnedStock[0].cost);
      } else {
        setDisable(true);
      }
    } else {
      console.log("cant find any assets");
    }
  }, [assets]);

  useEffect(() => {
    dispatch(getWatchlists());
  }, []);

  useEffect(() => {
    setCost(shares * currentPrice);
  }, [shares]);

  useEffect(() => {
    dispatch(getAllAssets());
  }, []);

  useEffect(() => {
    dispatch(searchStockData());
  }, []);

  /*
  *
  Using sandbox token. NEED to use production token before deploy
  *
  */
  // ========================================== Submission Functions

  let API_Call = `https://cloud.iexapis.com/stable/stock/${stockticker}/intraday-prices?token=${process.env.REACT_APP_API_KEY}`;

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
    if (buyOrSell === "buy") {
      if (cost < userBuyingPower) {
        let new_buying_power = userBuyingPower - cost;
        let buying_power = parseInt(new_buying_power);
        const buyingPowerForm = {
          buying_power,
        };
        // if the user doesnt own this stock
        if (assetId === undefined) {
          const form = {
            userId,
            ticker: stockticker,
            shares,
            cost,
          };
          dispatch(addAsset(form))
            .then(() => {
              dispatch(editBuyingPower(buyingPowerForm, userId));
            })
            .then(() => {
              window.location.href = "/dashboard";
            });
        } else {
          const form = {
            userId,
            ticker: stockticker,
            shares: Number(shares) + Number(ownStockShares),
            cost: Number(cost) + Number(ownedStockCost),
          };
          // if the user own this stock
          dispatch(updateAsset(form, assetId))
            .then(() => {
              dispatch(editBuyingPower(buyingPowerForm, userId));
            })
            .then(() => {
              window.location.href = "/dashboard";
            });
        }
      } else {
        alert("Insufficient Funds for Purchase");
      }
    } else if (buyOrSell === "sell") {
      if (shares == ownStockShares) {
        dispatch(sellAsset(assetId)).then(() => {
          window.location.href = "/dashboard";
        });
      } else if (shares > ownStockShares) {
        alert("Not enough shares to sell");
      } else if (shares < ownStockShares) {
        const form = {
          userId,
          ticker: stockticker,
          shares: Number(ownStockShares) - Number(shares),
          cost: Number(ownedStockCost) - Number(cost),
        };

        dispatch(updateAsset(form, assetId)).then(() => {
          let new_buying_power = userBuyingPower + cost;
          let buying_power = parseInt(new_buying_power);
          const buyingPowerForm = {
            buying_power,
          };
          dispatch(editBuyingPower(buyingPowerForm, userId)).then(() => {
            window.location.href = "/dashboard";
          });
        });
      }
    }
  };

  const sendWatchlistId = (value) => {
    setAddToWatchlistId(value);
  };

  const handleAddStock = (e) => {
    console.log(e.target.value);
    setChecked(e.target.value);
  };

  // ========================================== COMPONENT
  return (
    <div className="main_container">
      <div className="row">
        <div className="main_content">
          <h1>{stockticker}</h1>
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
                  Buy {stockticker}
                </span>
              </div>
              <div>
                <span onClick={() => setBuyOrSell("sell")}>
                  Sell {stockticker}
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
                <label className="buying-power-label">
                  ${userBuyingPower} buying power availabe
                </label>
              </footer>
            </div>
          </form>
          <span
            onClick={() => setShowModal(true)}
            className="add-watchlist-button"
          >
            add to watchlist
          </span>
          {showModal && (
            <Modal onClick={() => setShowModal(false)}>
              <div className="addstock-modal-container">
                <div className="addstock-modal-header">
                  <h1>Add to Your Lists</h1>
                  <button onClick={() => setShowModal(false)}>close</button>
                </div>
                <form onSubmit={handleAddStockSubmit}>
                  <div className="stock-list">
                    {watchlists?.map((watchlist) => (
                      // <ListCheck
                      //   key={watchlist.id}
                      //   watchlist={watchlist}
                      //   sendWatchlistId={sendWatchlistId}
                      // />
                      <div key={watchlist.id}>
                        <input
                          type="radio"
                          key={watchlist.id}
                          value={watchlist.id}
                          onChange={handleAddStock}
                        />
                        <label>{watchlist.title}</label>
                      </div>
                    ))}
                  </div>
                  <button className="save-button">save</button>
                </form>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockData;
