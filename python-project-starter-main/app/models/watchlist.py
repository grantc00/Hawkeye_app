from .db import db
from datetime import datetime


class Watchlist(db.Model):
    __tablename__ = "watchlists"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # stock_id = db.Column(db.Integer, db.ForeignKey("stocks.id"), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    emoji = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow)

    #relationship
    users = db.relationship('User', foreign_keys=[user_id], back_populates='watchlists')
    # stocks = db.relationship('Stock', foreign_keys=[stock_id], back_populates='watchlists')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            # "stock_id": self.stock_id,
            "emoji": self.emoji,
            "buying_power": self.buying_power,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
