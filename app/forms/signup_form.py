from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use.")


def username_exists(form, field):
    # Checking if username is already in use
    usersname = field.data
    user = User.query.filter(User.usersname == usersname).first()
    if user:
        raise ValidationError("Username is already in use.")


class SignUpForm(FlaskForm):
    usersname = StringField("usersname", validators=[DataRequired(), username_exists])
    email = StringField("email", validators=[DataRequired(), user_exists])
    password = StringField("password", validators=[DataRequired()])
    buying_power = IntegerField("buying_power", validators=[DataRequired()])
