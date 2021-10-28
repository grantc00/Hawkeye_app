import flask
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired


class NewAssetForm(FlaskForm):
    ticker = StringField("ticker", validators=[DataRequired()])
    shares = IntegerField("shares", validators=[DataRequired()])
    cost = FloatField("cost", validators=[DataRequired()])
