from .db import db
from datetime import datetime


class Stock(db.Model):
    __tablename__ = "stocks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    ticker = db.Column(db.String(5), nullable=False, unique=True)
    price = db.Column(db.Integer, nullable=False)
    about = db.Column(db.String(1200), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow)
    assets = db.relationship('Asset', backref='assetRef')
    watchlist = db.relationship('Watchlist', backref='watchlistRef')


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "ticker": self.ticker,
            "price": self.price,
            "buying_power": self.buying_power,
            "about": self.about,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
