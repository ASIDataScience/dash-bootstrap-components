import dash_bootstrap_components as dbc

carousel = dbc.Carousel(
    items=[
        {"key": "1", "src": "/static/images/slide1.svg"},
        {"key": "2", "src": "/static/images/slide2.svg"},
        {"key": "3", "src": "/static/images/slide3.svg"},
    ],
    controls=True,
    indicators=True,
)
