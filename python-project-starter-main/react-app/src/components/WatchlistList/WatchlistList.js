import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWatchlists } from "../../store/watchlist";
import { Modal } from "../../context/Modal";
import "./WatchlistList.css";
import Picker from "emoji-picker-react";
import { patchWatchlist } from "../../store/watchlist";

const List = (watchlist) => {
  const dispatch = useDispatch();
  const [toggleWatchList, setToggleWatchList] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [inputValue, setinputValue] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [emoji, setEmoji] = useState(watchlist.emoji);
  const [title, setTitle] = useState(watchlist.title);

  const handleEditWatchList = () => {
    const form = {
      title,
      emoji,
    };
    const watchlistId = watchlist.id;

    console.log(title, emoji);
    dispatch(patchWatchlist(form, watchlistId));
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
                      <span onClick={() => setShowModal(true)}>Edit</span>
                      {showModal && (
                        <Modal onClick={() => setShowModal(false)}>
                          <form onSubmit={handleEditWatchList}>
                            <div className="edit-modal-container">
                              <div className="edit-modal-header">
                                <h1>Edit List</h1>
                                <button onClick={() => setShowModal(false)}>
                                  close
                                </button>
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
                    </div>
                  </li>

                  <li>
                    <div className="dropdown-item">
                      <span>Remove</span>
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
            <li>
              <a href="#">
                <div className="my-watchlist-stocks">
                  <div className="watchlist-stock-name">
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
                <div className="my-watchlist-stocks">
                  <div className="watchlist-stock-name">
                    <span>APPL</span>
                  </div>
                  <div className="mini-chart">📈</div>
                  <div className="watchlist-stock-price">
                    <span>$300</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
};

export default List;
