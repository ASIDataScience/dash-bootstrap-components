import dash_bootstrap_components as dbc
import dash_html_components as html
from dash.dependencies import Input, Output, State

modal = html.Div(
    [
        dbc.Button("Small modal", id="open-sm", class_name="mr-1", n_clicks=0),
        dbc.Button("Large modal", id="open-lg", class_name="mr-1", n_clicks=0),
        dbc.Button("Extra large modal", id="open-xl", n_clicks=0),
        dbc.Modal(
            [
                dbc.ModalHeader("Header"),
                dbc.ModalBody("A small modal."),
                dbc.ModalFooter(
                    dbc.Button(
                        "Close",
                        id="close-sm",
                        class_name="ml-auto",
                        n_clicks=0,
                    )
                ),
            ],
            id="modal-sm",
            size="sm",
            is_open=False,
        ),
        dbc.Modal(
            [
                dbc.ModalHeader("Header"),
                dbc.ModalBody("A large modal."),
                dbc.ModalFooter(
                    dbc.Button(
                        "Close",
                        id="close-lg",
                        class_name="ml-auto",
                        n_clicks=0,
                    )
                ),
            ],
            id="modal-lg",
            size="lg",
            is_open=False,
        ),
        dbc.Modal(
            [
                dbc.ModalHeader("Header"),
                dbc.ModalBody("An extra large modal."),
                dbc.ModalFooter(
                    dbc.Button(
                        "Close",
                        id="close-xl",
                        class_name="ml-auto",
                        n_clicks=0,
                    )
                ),
            ],
            id="modal-xl",
            size="xl",
            is_open=False,
        ),
    ]
)


def toggle_modal(n1, n2, is_open):
    if n1 or n2:
        return not is_open
    return is_open


app.callback(
    Output("modal-sm", "is_open"),
    [Input("open-sm", "n_clicks"), Input("close-sm", "n_clicks")],
    [State("modal-sm", "is_open")],
)(toggle_modal)

app.callback(
    Output("modal-lg", "is_open"),
    [Input("open-lg", "n_clicks"), Input("close-lg", "n_clicks")],
    [State("modal-lg", "is_open")],
)(toggle_modal)

app.callback(
    Output("modal-xl", "is_open"),
    [Input("open-xl", "n_clicks"), Input("close-xl", "n_clicks")],
    [State("modal-xl", "is_open")],
)(toggle_modal)
