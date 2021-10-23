"""first

Revision ID: 7a1fb3a5b066
Revises:
Create Date: 2021-10-20 15:37:29.657711

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "7a1fb3a5b066"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "stocks",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("ticker", sa.String(length=5), nullable=False),
        sa.Column("price", sa.Integer(), nullable=False),
        sa.Column("about", sa.String(length=1200), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("ticker"),
    )
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("first_name", sa.String(length=255), nullable=False),
        sa.Column("last_name", sa.String(length=255), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("buying_power", sa.Integer(), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("email"),
    )
    op.create_table(
        "assets",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("stock_id", sa.Integer(), nullable=False),
        sa.Column("ticker", sa.String(), nullable=False),
        sa.Column("cost", sa.Float(), nullable=False),
        sa.Column("shares", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(
            ["stock_id"],
            ["stocks.id"],
        ),
        sa.ForeignKeyConstraint(
            ["ticker"],
            ["stocks.ticker"],
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "watchlists",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("stock_id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=50), nullable=False),
        sa.Column("emoji", sa.String(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(
            ["stock_id"],
            ["stocks.id"],
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "watchlist_stocks",
        sa.Column("watchlist_id", sa.Integer(), nullable=False),
        sa.Column("stock_ticker", sa.String(), nullable=False),
        sa.ForeignKeyConstraint(
            ["stock_ticker"],
            ["stocks.ticker"],
        ),
        sa.ForeignKeyConstraint(
            ["watchlist_id"],
            ["watchlists.id"],
        ),
        sa.PrimaryKeyConstraint("watchlist_id", "stock_ticker"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("watchlist_stocks")
    op.drop_table("watchlists")
    op.drop_table("assets")
    op.drop_table("users")
    op.drop_table("stocks")
    # ### end Alembic commands ###
