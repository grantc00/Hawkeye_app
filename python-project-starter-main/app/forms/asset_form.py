import flask
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired


class NewAssetForm(FlaskForm):
    shares = IntegerField("shares", validators=[DataRequired()])
    cost = FloatField("cost", validators=[DataRequired()])
