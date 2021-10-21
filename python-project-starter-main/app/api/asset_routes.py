from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Asset


asset_routes = Blueprint("assets", __name__)


# Get all asset
@asset_routes("/")
@login_required
def get_asset():
    assets = Asset.query.all()

    return {asset.to_dict() for asset in assets}


# Get one asset
@asset_routes("/<int:asset_id>")
@login_required
def get_asset(id):
    asset = Asset.query.get(id)

    return asset.to_dict()

# Post asset
@asset_routes("/<int:asset_id>")
@login_required
def post_asset(id):
    body = request.json
    asset = Asset(
        user_id=body['user_id'],
        ticker=body['ticker'],
        shares=body['shares'],
        cost=body['cost']
    )
    db.session.add(asset)
    db.session.commit()
    return asset.to_dict()

# Edit asset
@asset_routes("/<int:asset_id>", method=["PATCH"])
@login_required
def edit_asset(id):
    body = request.json
    asset = Asset.query.get(id)
    asset.shares = body["shares"]
    asset.cost = body["cost"]
    db.session.commit()

    return asset.to_dict()


# Delete asset
@asset_routes('/<int:asset_id>', method=["DELETE"])
@login_required
def delete_asset(id):
    asset = Asset.query.get(id)
    db.session.delete(asset)
    db.session.commit()

    return asset.to_dict()
