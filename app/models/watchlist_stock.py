from .db import db
from datetime import datetime


class Watchlist_stocks(db.Model):
    __tablename__ = "watchlist_stocks"

    id = db.Column(db.Integer, primary_key=True)
    watchlist_id = db.Column(db.Integer, db.ForeignKey("watchlists.id"), nullable=False)
    stock_ticker = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow)

    # relationship
    watchlists = db.relationship(
        "Watchlist", foreign_keys=[watchlist_id], back_populates="watchlist_stocks"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "watchlist_id": self.watchlist_id,
            "stock_ticker": self.stock_ticker,
        }
