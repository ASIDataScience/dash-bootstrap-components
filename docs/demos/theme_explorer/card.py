import dash_bootstrap_components as dbc
import dash_html_components as html

from .util import make_subheading

cards = html.Div(
    [
        make_subheading("Card", "card"),
        dbc.CardDeck(
            [
                dbc.Card(
                    [
                        dbc.CardHeader("Header"),
                        dbc.CardBody(
                            [
                                html.H5(
                                    "This card has a title",
                                    class_name="card-title",
                                ),
                                html.P(
                                    "And some text", class_name="card-text"
                                ),
                            ]
                        ),
                    ]
                ),
                dbc.Card(
                    [
                        dbc.CardBody(
                            [
                                html.H5(
                                    "This card has a title",
                                    class_name="card-title",
                                ),
                                html.P(
                                    "and some text, but no header",
                                    class_name="card-text",
                                ),
                            ]
                        )
                    ],
                    outline=True,
                    color="primary",
                ),
                dbc.Card(
                    [
                        dbc.CardBody(
                            [
                                html.H5(
                                    "This card has a title",
                                    class_name="card-title",
                                ),
                                html.P(
                                    "and some text, and a footer!",
                                    class_name="card-text",
                                ),
                            ]
                        ),
                        dbc.CardFooter("Footer"),
                    ],
                    outline=True,
                    color="dark",
                ),
            ]
        ),
    ],
    class_name="mb-4",
)
