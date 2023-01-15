from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, IntegerField
from wtforms.validators import DataRequired, URL


class ChannelForm(FlaskForm):
    private = BooleanField('Private')
    name = StringField('Name', validators=[DataRequired()])
    server_id = IntegerField('Server Id')
    submit = SubmitField('Submit')
