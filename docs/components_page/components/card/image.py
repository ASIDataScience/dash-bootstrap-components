import dash_bootstrap_components as dbc
import dash_html_components as html

top_card = dbc.Card(
    [
        dbc.CardImg(src="/static/images/placeholder286x180.png", top=True),
        dbc.CardBody(
            html.P("This card has an image at the top", class_name="card-text")
        ),
    ],
    style={"width": "18rem"},
)

bottom_card = dbc.Card(
    [
        dbc.CardBody(
            html.P("This has a bottom image", class_name="card-text")
        ),
        dbc.CardImg(src="/static/images/placeholder286x180.png", bottom=True),
    ],
    style={"width": "18rem"},
)

cards = dbc.Row(
    [
        dbc.Col(top_card, width="auto"),
        dbc.Col(bottom_card, width="auto"),
    ]
)
