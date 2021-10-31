import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import "./WatchlistList.css";
import Picker from "emoji-picker-react";
import {
  patchWatchlist,
  removeWatchlist,
  getWatchlists,
} from "../../store/watchlist";
import { getWatchlistStocks } from "../../store/watchlist_stock";
import RemoveStock from "../RemoveStock/RemoveStock";

const List = (watchlist) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [toggleWatchList, setToggleWatchList] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [inputValue, setinputValue] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [emoji, setEmoji] = useState(watchlist.emoji);
  const [title, setTitle] = useState(watchlist.title);
  const watchlists = useSelector((state) => state.watchlist[0]);

  const allWatchListStocks = useSelector((state) => state.watchlist_stock[0]);

  useEffect(() => {
    dispatch(getWatchlistStocks());
  }, []);

  console.log(allWatchListStocks);
  console.log(watchlists, "----------------");

  const handleEditWatchList = () => {
    const form = {
      title,
      emoji,
      watchlist_id: watchlist.id,
    };
    dispatch(patchWatchlist(form));
  };

  const handleDeleteWatchlist = (e) => {
    e.preventDefault();
    const watchlistId = watchlist.id;
    // dispatch(removeWatchlist(watchlistId).then(() => {
    //   dispatch(getWatchlists())
    // }));
    dispatch(removeWatchlist(watchlistId));
    window.location.href = "/dashboard";
  };

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setChosenEmoji(emojiObject);
    setEmoji(emojiObject.emoji);
  };

  return (
    <li>
      <div>
        <div className="my-watchlist-header" key={watchlist.id}>
          <div className="my-watchlist-header-left">
            <div className="my-watchlist-header-div">
              <span>{watchlist.emoji}</span>
            </div>
            <div className="my-watchlist-header-div">
              <label>{watchlist.title}</label>
            </div>
          </div>

          <div className="my-watchlist-header-right">
            <div className="my-watchlist-header-div">
              <span
                onClick={() =>
                  toggleDropdown === false
                    ? setToggleDropdown(true)
                    : setToggleDropdown(false)
                }
              >
                •••
              </span>
            </div>
            {toggleDropdown && (
              <div className="dropdown">
                <ul>
                  <li>
                    <div className="dropdown-item">
                      <span
                        className="edit-modal-edit"
                        onClick={() => setShowModal(true)}
                      >
                        Edit
                      </span>
                      {showModal && (
                        <Modal onClick={() => setShowModal(false)}>
                          <form onSubmit={handleEditWatchList}>
                            <div className="edit-modal-container">
                              <div className="edit-modal-header">
                                <h1>Edit List</h1>
                                <span onClick={() => setShowModal(false)}>
                                  Ｘ
                                </span>
                              </div>
                              <div className="emojititlesave-container">
                                <div className="edit-modal-mid">
                                  <div className="edit-modal-emoji">
                                    <span
                                      onClick={() =>
                                        setShowPicker((val) => !val)
                                      }
                                      onChange={(e) => setEmoji(e.target.value)}
                                      value={emoji}
                                    >
                                      {emoji}
                                      {showPicker && (
                                        <Picker onEmojiClick={onEmojiClick} />
                                      )}
                                    </span>
                                  </div>
                                  <option value="emoji"></option>
                                  <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="edit-title"
                                    type="text"
                                    // placeholder={watchlist.title}
                                  />
                                </div>
                                <div className="edit-modal-footer">
                                  <button type="submit">Save</button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </Modal>
                      )}
                      <li>
                        <span
                          className="edit-modal-remove"
                          onClick={handleDeleteWatchlist}
                        >
                          Remove
                        </span>
                      </li>{" "}
                    </div>
                  </li>
                </ul>
              </div>
            )}
            <div>
              <span
                onClick={() =>
                  toggleWatchList === false
                    ? setToggleWatchList(true)
                    : setToggleWatchList(false)
                }
              >
                ▽
              </span>
            </div>
          </div>
        </div>
      </div>

      {toggleWatchList === true && (
        <div>
          <ul>
            <div>
              <ul>
                {allWatchListStocks
                  ?.filter((stock) => stock.watchlist_id == watchlist.id)
                  .map((s) => {
                    return (
                      <li>
                        <div className="watchlist-stocks-container">
                          <div>{s.stock_ticker}</div>
                          <div>
                            <RemoveStock {...s} />
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </ul>
        </div>
      )}
    </li>
  );
};

export default List;
