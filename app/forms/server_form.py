from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, IntegerField
from wtforms.validators import DataRequired, URL


class ServerForm(FlaskForm):
    private = BooleanField('Private')
    name = StringField('Name', validators=[DataRequired()])
    server_image = StringField('Image')
    owner_id = IntegerField('Owner')
    submit = SubmitField('Submit')
