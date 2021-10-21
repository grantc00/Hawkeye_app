from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Watchlist
from app.forms import WatchlistForm


watchlist_routes = Blueprint("watchlists", __name__)


# get all watchlist
@watchlist_routes.route("/")
@login_required
def get_watchlist():
    userId = current_user.id
    watchlists = Watchlist.query.filter(Watchlist.user_id == userId).all()

    return {"watchlists": [watchlist.to_dict() for watchlist in watchlists]}


# create watchlist for user
@watchlist_routes.route("/", method=["POST"])
@login_required
def create_watchlist(id):
    form = WatchlistForm

    if form.validate_on_submit():
        new_watchlist = Watchlist(
            user_id=current_user.get_id(), title=form.title.data, emoji=form.emoji.data
        )

    db.session.add(new_watchlist)
    db.session.commit()

    return new_watchlist.to_dict()


# edit watchlist for user
@watchlist_routes.route("/", method=["PATCH"])
@login_required
def edit_watchlist(id):
    body = request.json()
    watchlist = Watchlist.query.get(id)
    watchlist.title = body["title"]
    watchlist.emoji = body["emoji"]
    db.session.commit()

    return watchlist.to_dict()


# delete watchlist for user
@watchlist_routes.route("/", method=["DELETE"])
@login_required
def delete_watchlist(id):
    watchlist = Watchlist.query.get(id)
    db.session.delete(watchlist)
    db.session.commit()

    return watchlist.to_dict()
