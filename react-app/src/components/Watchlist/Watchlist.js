import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Watchlist/Watchlist.css";
import { getWatchlists, postWatchlist } from "../../store/watchlist";
import {getAllAssets} from '../../store/asset'
import List from "../WatchlistList/WatchlistList";
import Picker from "emoji-picker-react";

const WatchList = (watchlist) => {
  const dispatch = useDispatch();
  const [toggleCreateList, setToggleCreateList] = useState(false);
  const watchlists = useSelector((state) => state.watchlist[0]);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [emoji, setEmoji] = useState(`\u{1f600}`);
  const [title, setTitle] = useState();
  const assets = useSelector((state) => state.asset[0])

  useEffect(() => {
    dispatch(getAllAssets())
  }, [dispatch])


  const handleCreateWatchList = () => {
    let form = {
      title,
      emoji,
    };
    dispatch(postWatchlist(form));
  };

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setChosenEmoji(emojiObject);
    setEmoji(emojiObject.emoji);
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
        {assets?.map((asset) => (
          <div>
            <div>{asset.cost}</div>
            <div>{asset.ticker}</div>
            <div>{asset.shares} shares</div>
          </div>

        ))}
        {/* <ul>
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
        </ul> */}
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
                <div className="edit-modal-emoji">
                  <span
                    onClick={() => setShowPicker((val) => !val)}
                    onChange={(e) => setEmoji(e.target.value)}
                    value={emoji}
                  >
                    {emoji}
                    {showPicker && <Picker onEmojiClick={onEmojiClick} className='dark'/>}
                  </span>
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

