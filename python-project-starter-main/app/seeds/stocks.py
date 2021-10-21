from app.models import db, Stock


def seed_stocks():
    apple = Stock(
        name="Apple Inc",
        ticker="APPL",
        price="149",
        about="Apple, Inc. engages in the design, manufacture, and sale of smartphones, personal computers, tablets, wearables and accessories, and other variety of related services. It operates through the following geographical segments: Americas, Europe, Greater China, Japan, and Rest of Asia Pacific.",
    )
    microsoft = Stock(
        name="Microsoft",
        ticker="MSFT",
        price="307",
        about="Microsoft Corp. engages in the development and support of software, services, devices, and solutions.",
    )
    amazon = Stock(
        name="Amazon",
        ticker="AMZN",
        price="3643",
        about="Amazon.com, Inc. engages in the provision of online retail shopping services. It operates through the following business segments: North America, International, and Amazon Web Services (AWS).",
    )
    tesla = Stock(
        name="Tesla",
        ticker="TSLA",
        price="859",
        about="Tesla, Inc. engages in the design, development, manufacture, and sale of fully electric vehicles, energy generation and storage systems.",
    )

    db.session.add(apple)
    db.session.add(microsoft)
    db.session.add(amazon)
    db.session.add(tesla)

    db.session.commit()


def undo_stocks():
    db.session.execute("TRUNCATE stocks RESTART IDENTITY CASCADE;")
    db.session.commit()
