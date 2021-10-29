from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Watchlist, Watchlist_stocks
from app.forms import AddStockForm


watchlist_stock_routes = Blueprint("watchlist_stocks", __name__)


# # add stock to watchlist
@watchlist_stock_routes.route("/<int:watchlist_id>/add", methods=["POST"])
@login_required
def add_to_watchlist(watchlist_id):
    form = AddStockForm()

    add_stock_watchlist = Watchlist_stocks(
        watchlist_id=watchlist_id, stock_ticker=form.stock_ticker.data
    )

    db.session.add(add_stock_watchlist)
    db.session.commit()

    return add_stock_watchlist.to_dict()


# get stocks from watchlist
@watchlist_stock_routes.route("/")
def get_watchlist_stocks():
    watchlist_stocks = Watchlist_stocks.query.all()
    return {
        "watchlist_stocks": [
            watchlist_stock.to_dict() for watchlist_stock in watchlist_stocks
        ]
    }
