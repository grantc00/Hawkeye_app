import flask
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class WatchlistForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    emoji = StringField("Emoji", validators=[DataRequired()])

class AddStockForm(FlaskForm):
    watchlist_id = IntegerField('Watchlist_id')
    # stock_ticker = StringField('Stock_ticker')
