from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Stock


stock_routes = Blueprint('stocks', __name__)


# Get all stocks
@stock_routes.route('/')
def get_stocks():
    stocks = Stock.query.all()
    return {'stocks': [stock.to_dict() for stock in stocks]}


# Get one stock
@stock_routes.route('/<int:stock_id>')
def get_stock(stock_id):
    stock = Stock.query.get(stock_id)
    return stock.to_dict()
