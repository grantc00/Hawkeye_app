import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Watchlist/Watchlist.css";
import { getWatchlists, postWatchlist } from "../../store/watchlist";
import { getAllAssets } from "../../store/asset";
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
  const assets = useSelector((state) => state.asset[0]);
  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(getAllAssets());
  }, [dispatch]);

  console.log(assets);

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
        {assets
          ?.filter((asset) => asset.user_id == userId)
          .map((item) => (
            <div className="assest-stocks-list">
              <div>{item.ticker}</div>
              <div>${item.cost}</div>
              <div>{item.shares} shares</div>
            </div>
          ))}
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
                    {showPicker && (
                      <Picker onEmojiClick={onEmojiClick} className="dark" />
                    )}
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
                  <span
                    onClick={() =>
                      toggleCreateList === false
                        ? setToggleCreateList(true)
                        : setToggleCreateList(false)
                    }
                  >
                    Cancel
                  </span>
                </div>
                <div>
                  <span type="submit">Create List</span>
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
