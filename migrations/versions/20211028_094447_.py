"""empty message

Revision ID: a6b9461b2d2b
Revises: 8fba9f2f30a0
Create Date: 2021-10-28 09:44:47.175212

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a6b9461b2d2b'
down_revision = '8fba9f2f30a0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('assets', 'cost')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('assets', sa.Column('cost', sa.INTEGER(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###