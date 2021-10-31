# Hawkeye

By Grant Chiu - [Hawkeye](https://hawkeye-app.herokuapp.com/)

Hawkeye is a clone of the website Robinhood, it is a commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free! 

## Technologies Used

### Languages
 * Javascript
 * Python 
 * HTML
 * CSS

### Frontend 
 * React
 * Redux
 * React-chartjs

### Backend
 * Flask
 * SQLAlchemy
 * Node.js
 
### Deployment
 * Github
 * Heroku
 * Docker


## Features
To see the full feature list, user stories, RESTful routes, please visit https://github.com/grantc00/Hawkeye_app
 * Users
   * Users can signup, login, login as demo, and logout
   * Users can only visit '/' page due to protected routes
   * Users can put in buyingpower during signup
   
 * Dashboard
   * Logged in users can visit '/dashboard'
   * Users can see search bar, each owned stocks (tickers, costs, shares)
   * Users can see owned watchlist
   
 * Searchbar
   * Logged in users can search stocks on search bar
   * Users can click on specific stock and go to that stock's detailed page 

 * Stocks
   * Logged in users can visit detailed stock page
   * Users can point cursor to a certain time and checkout the price of the stock of the certian time
   * Users can buy the stock when have valid shares input also efficient buyingpower
   * Users can sell the stock when have valid shares
   * Users can add stock to watchlist
  
 * Watchlist 
   * Logged in users can create watchlists on '/dashboard', with emoji and title
   * Users can edit watchlists emoji or title on '/dashboard'
   * Users can delete watchlists on '/dashboard'
   * Users can click on dropdown to see what stocks are in each watchlist 



## Future Features
 * can click to stock detail page from watchlist
 * news feed on '/dashboard'
 * news feed for specific stock on stock detail page





