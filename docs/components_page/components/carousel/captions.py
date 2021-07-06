import dash_bootstrap_components as dbc

carousel = dbc.Carousel(
    items=[
        {
            "key": "1",
            "src": "/static/images/slide1.svg",
            "header": "With header ",
            "caption": "and caption",
        },
        {
            "key": "2",
            "src": "/static/images/slide2.svg",
            "header": "With header only",
            "caption": "",
        },
        {
            "key": "3",
            "src": "/static/images/slide3.svg",
            "header": "",
            "caption": "This slide has a caption only",
        },
    ]
)
