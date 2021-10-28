from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Watchlist, watchlist_stocks
from app.forms import WatchlistForm, AddStockForm


watchlist_routes = Blueprint("watchlists", __name__)


# get all watchlist
@watchlist_routes.route("/")
# @login_required
def get_watchlist():
    # userId = current_user.id
    # watchlists = Watchlist.query.filter(Watchlist.user_id == userId).all()
    watchlists = Watchlist.query.all()

    return {"watchlists": [watchlist.to_dict() for watchlist in watchlists]}


# create watchlist for user
@watchlist_routes.route("/new-watchlist", methods=["POST"])
@login_required
def create_watchlist():
    form = WatchlistForm()

    new_watchlist = Watchlist(
        user_id=current_user.get_id(), title=form.title.data, emoji=form.emoji.data
    )

    db.session.add(new_watchlist)
    db.session.commit()

    return new_watchlist.to_dict()


# edit watchlist for user
@watchlist_routes.route("/<int:watchlist_id>/edit", methods=["PATCH"])
@login_required
def edit_watchlist(watchlist_id):
    watchlist = Watchlist.query.get(watchlist_id)
    form = WatchlistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if current_user and form.validate_on_submit():
        watchlist.title = form.title.data
        watchlist.emoji = form.emoji.data
        db.session.commit()

    return watchlist.to_dict()


# delete watchlist for user
@watchlist_routes.route("/<int:watchlist_id>/delete", methods=["DELETE"])
@login_required
def delete_watchlist(watchlist_id):
    watchlist = Watchlist.query.get(watchlist_id)

    db.session.delete(watchlist)
    db.session.commit()

    return watchlist.to_dict()


# add stock to watchlist
@watchlist_routes.route("/<int:watchlist_id>/add", methods=["POST"])
@login_required
def add_to_watchlist():
    form = AddStockForm()
    watchlist_id = form.watchlist_id.data
    # stock_ticker = form.stock_ticker.data

    watchlist = Watchlist.query.get(watchlist_id)

    db.session.commit()

    return watchlist.to_dict()
