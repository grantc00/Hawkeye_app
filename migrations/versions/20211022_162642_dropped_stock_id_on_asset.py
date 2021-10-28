"""dropped stock_id on asset

Revision ID: d97fd1ace464
Revises: 00807cab80b6
Create Date: 2021-10-22 16:26:42.303295

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd97fd1ace464'
down_revision = '00807cab80b6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('assets_stock_id_fkey', 'assets', type_='foreignkey')
    op.drop_column('assets', 'stock_id')
    op.alter_colum('assets', 'cost', existing_type=sa.Integer(), type_=sa.Float())
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('assets', sa.Column('stock_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.create_foreign_key('assets_stock_id_fkey', 'assets', 'stocks', ['stock_id'], ['id'])
    op.alter_colum('assets', 'cost', existing_type=sa.Float(), type_=sa.Integer())
    # ### end Alembic commands ###