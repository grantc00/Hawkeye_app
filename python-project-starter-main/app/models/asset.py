from .db import db
from datetime import datetime


class Asset(db.Model):
    __tablename__ = "assets"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey("stocks.id"), nullable=False)
    ticker = db.Column(db.String, db.ForeignKey('stocks.ticker'), nullable=False)
    cost = db.Column(db.Integer, nullable=False)
    shares = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "stock_id": self.stock_id,
            "ticker": self.ticker,
            "cost": self.cost,
            "shares": self.shares,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
