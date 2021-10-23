import React from 'react';
import WatchList from '../Watchlist/Watchlist';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <>
      <div className='dashboard-container'>
        <div className='dashboard-main'>
          <div className='dashboard-graph'>
            <h1>Dashboard Page</h1>
            <img
              src='https://cdn.robinhood.com/assets/generated_assets/6da8e43c2ce2585fa5f4384a506a5eda.svg'
              alt=''
              width='600px'
              height='400px'
            />
          </div>
          <div className='dashboard-watchlist'>{<WatchList />}</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
