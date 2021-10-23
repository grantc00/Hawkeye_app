import React, { useState } from "react";
import '../Watchlist/Watchlist.css'

const WatchList = () => {
  const [toggleCreateList, setToggleCreateList] = useState(false);
  const [toggleWatchList, setToggleWatchList] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);

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
            <form action="">
              <div className="watchlist-form-header">
                <div>
                  {/* <span>💡</span> */}
                  <select
                    name="goodies"
                    id="goodies"
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                    defaultValue={`\u{1f369}`}
                  >
                    <option value={`\u{1f369}`}>{`\u{1F680}`}</option>
                    <option value={`\u{1F315}`}>{`\u{1F315}`}</option>
                    <option value={`\u{1F386}`}>{`\u{1F386}`}</option>
                  </select>
                </div>
                <div>
                  <input type="text" />
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
                  <button>Create List</button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="watch-list-categories">
          <ul>
            <li>
              <div>
                <div className="my-watchlist-header">
                  <div className="my-watchlist-header-left">
                    <div className="my-watchlist-header-div">
                      <span>🚀</span>
                    </div>
                    <div className="my-watchlist-header-div">
                      <label>Title</label>
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
                              <span>Edit</span>
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
                            <span>$400</span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WatchList;
