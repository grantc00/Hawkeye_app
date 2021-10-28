from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Asset
from app.forms import NewAssetForm


asset_routes = Blueprint("assets", __name__)


# Get all asset
@asset_routes.route("/")
def get_assets():
    assets = Asset.query.all()
    return {"assets": [asset.to_dict() for asset in assets]}


# Get one asset
@asset_routes.route("/<int:asset_id>")
def get_asset(id):
    asset = Asset.query.get(id)
    return asset.to_dict()


# Post asset
@asset_routes.route("/new-asset", methods=["POST"])
@login_required
def post_asset():
    form = NewAssetForm()

    new_assest = Asset(
        user_id=current_user.get_id(),
        ticker=form.ticker.data,
        shares=form.shares.data,
        cost=form.cost.data,
    )
    db.session.add(new_assest)
    db.session.commit()
    return new_assest.to_dict()


# Edit asset
@asset_routes.route("/<int:asset_id>", methods=["PATCH"])
@login_required
def edit_asset(asset_id):
    asset = Asset.query.get(asset_id)
    form = NewAssetForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if current_user and form.validate_on_submit():
        asset.ticker = form.ticker.data
        asset.shares = form.shares.data
        asset.cost = form.cost.data
        db.session.commit()

    return asset.to_dict()


# Delete asset
@asset_routes.route("/<int:asset_id>", methods=["DELETE"])
@login_required
def delete_asset(asset_id):
    asset = Asset.query.get(asset_id)

    # user_id = current_user.get_id()
    # if int(user_id) == asset(asset.user_id):
    db.session.delete(asset)
    db.session.commit()

    return asset.to_dict()
