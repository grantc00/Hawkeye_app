from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Watchlist, Asset
from app.forms import ProfileEditForm


user_routes = Blueprint("users", __name__)


@user_routes.route("")
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route("/<int:id>")
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# edit user route
@user_routes.route("/<int:id>/edit", methods=["PATCH"])
@login_required
def edit_user(id):
    user = User.query.get(id)

    form = ProfileEditForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if current_user and form.validate_on_submit():
        user.first_name = form.first_name.data
        user.last_name = form.last_name.data
        user.email = form.email.data
        db.session.commit()

    return user.to_dict()


# get buying_power of user
@user_routes.route("/<int:id>/buying_power")
@login_required
def get_user_buying_power(buying_power):
    user_buying_power = User.query.get(buying_power)

    return user_buying_power.to_int()


# edit buying_power of user
@user_routes.route("/<int:id>/buying_power", methods=["PATCH"])
@login_required
def edit_buying_power_user(id):
    body = request.json
    user = User.query.get(id)
    user.body_power = body
    db.session.commit()

    return body.to_dict()


# Get watchlist of user
@user_routes.route("/<int:id>/watchlist")
@login_required
def get_watchlist(id):
    watchlists = Watchlist.query.filter(Watchlist.user_id == id).all()

    return watchlists.to_dict()


# Post watchlist of user
@user_routes.route("/<int:id>/watchlist")
@login_required
def post_watchlist(id):
    body = request.json
    new_watchlist = Watchlist(user_id=id, watchlist_name=body["title"])
    db.session.add(new_watchlist)
    db.session.commit()
    return new_watchlist.to_dict()


# Get asset of user
@user_routes.route("/<int:id>/asset")
@login_required
def user_asset(id):
    db_assets = Asset.query.filter(Asset.user_id == id.all())
    assets = {asset.to_dict() for asset in db_assets}
    return assets
