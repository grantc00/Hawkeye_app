from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Asset
from app.forms import NewAssetForm


asset_routes = Blueprint("assets", __name__)


# Get all asset
@asset_routes.route("")
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
    # body = request.json
    form = NewAssetForm()
    # asset = Asset(
    #     user_id=body["user_id"],
    #     # ticker=body["ticker"],
    #     shares=body["shares"],
    #     cost=body["cost"],
    # )
    new_assest = Asset(
        user_id=current_user.get_id(),
        stock_id=current_user.get_id(),
        shares=form.shares.data,
        cost=form.cost.data,
    )
    db.session.add(new_assest)
    db.session.commit()
    return new_assest.to_dict()


# Edit asset
@asset_routes.route("/<int:asset_id>", methods=["PATCH"])
@login_required
def edit_asset(id):
    body = request.json
    asset = Asset.query.get(id)
    asset.shares = body["shares"]
    asset.cost = body["cost"]
    db.session.commit()
    return asset.to_dict()


# Delete asset
@asset_routes.route("/<int:asset_id>", methods=["DELETE"])
@login_required
def delete_asset(id):
    asset = Asset.query.get(id)
    db.session.delete(asset)
    db.session.commit()

    return asset.to_dict()
