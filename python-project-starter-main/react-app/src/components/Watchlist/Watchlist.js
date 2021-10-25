import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Watchlist/Watchlist.css";
import { getWatchlists } from "../../store/watchlist";
import List from "../WatchlistList/WatchlistList";
import { postWatchlist } from "../../store/watchlist";

const WatchList = () => {
  const dispatch = useDispatch();
  const [toggleCreateList, setToggleCreateList] = useState(false);
  const watchlists = useSelector((state) => state.watchlist[0]);
  const [emoji, setEmoji] = useState(`\u{1f369}`);
  const [title, setTitle] = useState();

  const handleCreateWatchList = () => {
    let form = {
      title,
      emoji,
    };
    dispatch(postWatchlist(form));
  };

  useEffect(() => {
    dispatch(getWatchlists());
  }, [dispatch]);

  return (
    <div className="watch-list-container">
      <div className="stocks-container">
        <header>
          <label>Stocks</label>
        </header>
      </div>

      <div className="assest-stocks-container">
        <ul>
          <li>
            <a href="#">
              <div className="assest-stocks-list">
                <div className="assest-stock">
                  <span>TSLA</span>
                </div>
                <div className="mini-chart">📈</div>
                <div className="assest-stock-price">
                  <span>$500</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="assest-stocks-list">
                <div className="assest-stock">
                  <span>APPL</span>
                </div>
                <div className="mini-chart">📈</div>
                <div className="assest-stock-price">
                  <span>$400</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="assest-stocks-list">
                <div className="assest-stock">
                  <span>FB</span>
                </div>
                <div className="mini-chart">📈</div>
                <div className="assest-stock-price">
                  <span>$300</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="assest-stocks-list">
                <div className="assest-stock">
                  <span>SPY</span>
                </div>
                <div className="mini-chart">📈</div>
                <div className="assest-stock-price">
                  <span>$2000</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div className="my-watchlist-container">
        <div>
          <header className="create-my-watchlist">
            <span>Lists</span>
            <span
              className="create-watchlist-toggle"
              onClick={() =>
                toggleCreateList === false
                  ? setToggleCreateList(true)
                  : setToggleCreateList(false)
              }
            >
              +
            </span>
          </header>
        </div>
        {toggleCreateList === true && (
          <div className="watchlist-form-container">
            <form onSubmit={handleCreateWatchList}>
              <div className="watchlist-form-header">
                <div>
                  {/* <span>💡</span> */}
                  <select
                    name="goodies"
                    id="goodies"
                    onChange={(e) => {
                      setEmoji(e.target.value);
                    }}
                    value={emoji}
                  >
                    <option value={`\u{1f369}`}>{`\u{1F680}`}</option>
                    <option value={`\u{1F315}`}>{`\u{1F315}`}</option>
                    <option value={`\u{1F386}`}>{`\u{1F386}`}</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Watchlist Name"
                    maxLength={50}
                  />
                </div>
              </div>

              <div className="watchlist-form-body">
                <div>
                  <button
                    onClick={() =>
                      toggleCreateList === false
                        ? setToggleCreateList(true)
                        : setToggleCreateList(false)
                    }
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <button type="submit">Create List</button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="watch-list-categories">
          <ul>
            {watchlists?.map((watchlist) => (
              <List key={watchlist.id} {...watchlist} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WatchList;
