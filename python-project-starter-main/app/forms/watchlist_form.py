import flask
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class WatchlistForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    emoji = StringField('Emoji', validators=[DataRequired()])
