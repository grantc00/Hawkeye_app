import flask
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired


class ProfileEditForm(FlaskForm):
    first_name = StringField("First Name", validators=[DataRequired()])
    last_name = StringField("Last Name", validators=[DataRequired()])
    email = StringField("Email", validators=[DataRequired()])


class BuyingPowerEditForm(FlaskForm):
    buying_power = StringField("Buying Power", validators=[DataRequired()])
