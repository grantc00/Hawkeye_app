from app.models import db, Asset

def seed_assets():
    assetDemo = Asset(
        user_id=1,
        stock_id=1,
        cost=2000,
        shares=100
    )

    db.session.add(assetDemo)

    db.session.commit()

def undo_assets():
    db.session.execute("TRUNCATE assets RESTART IDENTITY CASCADE;")
    db.session.commit()
