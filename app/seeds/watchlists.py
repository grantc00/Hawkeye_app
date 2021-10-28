from app.models import db, Watchlist


def seed_watchlists():
    watchlistDemo = Watchlist(
        user_id=1, title='watchlist demo', emoji='😅'
    )
    watchlist2 = Watchlist(
        user_id=2, title='watchlist demo2', emoji='☮️'
    )

    db.session.add(watchlistDemo)
    db.session.add(watchlist2)

    db.session.commit()






def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()
