from .db import db

watchlist_stocks = db.Table(
    "watchlist_stocks",
    db.Column('watchlist_id', db.Integer, db.ForeignKey("watchlists.id"), primary_key=True ),
    db.Column('stock_ticker', db.String, db.ForeignKey('stocks.ticker'), primary_key=True)
)
