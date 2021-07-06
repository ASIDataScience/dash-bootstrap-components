import dash
import dash_bootstrap_components as dbc
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output, State

DBC_DOCS = "https://dash-bootstrap-components.opensource.faculty.ai/"
DBC_GITHUB = "https://github.com/facultyai/dash-bootstrap-components"

app = dash.Dash(external_stylesheets=[dbc.themes.BOOTSTRAP])

navbar = dbc.NavbarSimple(
    children=[
        dbc.NavItem(dbc.NavLink("GitHub", href=DBC_GITHUB)),
        dbc.DropdownMenu(
            nav=True,
            in_navbar=True,
            label="Menu",
            children=[
                dbc.DropdownMenuItem("Entry 1", href="https://google.com"),
                dbc.DropdownMenuItem("Entry 2", href="/test"),
                dbc.DropdownMenuItem(divider=True),
                dbc.DropdownMenuItem("A heading", header=True),
                dbc.DropdownMenuItem(
                    "Entry 3", href="/external-relative", external_link=True
                ),
                dbc.DropdownMenuItem("Entry 4 - does nothing"),
            ],
        ),
    ],
    brand="Dash Bootstrap Components",
    brand_href=DBC_DOCS,
    sticky="top",
)

header = html.Div(
    [
        html.P(
            [
                "This app demonstrates components available in ",
                html.Code("dash-bootstrap-components"),
            ]
        )
    ],
    class_name="mt-4",
)

alerts = html.Div(
    [
        html.H2("Alerts"),
        dbc.Alert("This is an alert", color="primary"),
        dbc.Alert("Danger!", color="danger"),
    ]
)

badges = html.Div(
    [
        html.H2("Badges"),
        html.H3(
            [
                "This is a heading with a badge!",
                dbc.Badge("New!", color="success"),
            ]
        ),
    ]
)

buttons = html.Div(
    [
        html.H2("Buttons"),
        html.Div(
            [
                dbc.Button("Primary", color="primary", class_name="mr-1"),
                dbc.Button("Secondary", color="secondary", class_name="mr-1"),
                dbc.Button("Success", color="success", class_name="mr-1"),
                dbc.Button("Warning", color="warning", class_name="mr-1"),
                dbc.Button("Danger", color="danger", class_name="mr-1"),
                dbc.Button("Info", color="info"),
            ]
        ),
        html.Br(),
        html.H4("Outline buttons"),
        html.Div(
            [
                dbc.Button(
                    "Primary", outline=True, color="primary", class_name="mr-1"
                ),
                dbc.Button(
                    "Secondary",
                    outline=True,
                    color="secondary",
                    class_name="mr-1",
                ),
                dbc.Button(
                    "Success", outline=True, color="success", class_name="mr-1"
                ),
                dbc.Button(
                    "Warning", outline=True, color="warning", class_name="mr-1"
                ),
                dbc.Button(
                    "Danger", outline=True, color="danger", class_name="mr-1"
                ),
                dbc.Button("Info", outline=True, color="info"),
            ]
        ),
        html.Br(),
        html.H4("Button group"),
        html.Div(
            dbc.ButtonGroup(
                [
                    dbc.Button("Primary", color="primary"),
                    dbc.Button("Secondary", color="secondary"),
                    dbc.Button("Success", color="success"),
                    dbc.Button("Warning", color="warning"),
                    dbc.Button("Danger", color="danger"),
                    dbc.Button("Info", color="info"),
                ]
            )
        ),
    ]
)

cards = html.Div(
    [
        html.H2("Cards"),
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
    ]
)

collapse = html.Div(
    [
        html.H2("Collapse"),
        dbc.Button(
            "Open collapse",
            id="collapse-button",
            style={"margin-bottom": "1rem"},
        ),
        dbc.Collapse(
            dbc.Card(dbc.CardBody("This content is hidden in the collapse")),
            id="collapse",
        ),
    ]
)

columns = html.Div(
    [
        html.H2("Columns"),
        dbc.Row(
            [
                dbc.Col(
                    html.Div(
                        "This is column 1",
                        style={"height": "100px", "border-style": "solid"},
                    ),
                    md=3,
                ),
                dbc.Col(
                    html.Div(
                        "This is column 2",
                        style={"height": "100px", "border-style": "solid"},
                    ),
                    md=6,
                ),
                dbc.Col(
                    html.Div(
                        "This is column 3",
                        style={"height": "100px", "border-style": "solid"},
                    ),
                    md=3,
                ),
            ]
        ),
        html.Br(),
        html.H4("Row with no gutters"),
        dbc.Row(
            [
                dbc.Col(
                    html.Div(
                        "This is column 1",
                        style={"height": "100px", "border-style": "solid"},
                    ),
                    md=3,
                ),
                dbc.Col(
                    html.Div(
                        "This is column 2",
                        style={"height": "100px", "border-style": "solid"},
                    ),
                    md=6,
                ),
                dbc.Col(
                    html.Div(
                        "This is column 3",
                        style={"height": "100px", "border-style": "solid"},
                    ),
                    md=3,
                ),
            ],
            no_gutters=True,
        ),
    ]
)

dropdownmenu = html.Div(
    [
        html.H2("DropdownMenu"),
        dbc.DropdownMenu(
            [
                dbc.DropdownMenuItem("Heading", header=True),
                dbc.DropdownMenuItem("Item 1", href=DBC_GITHUB),
                dbc.DropdownMenuItem(divider=True),
                dbc.DropdownMenuItem("Another heading", header=True),
                dbc.DropdownMenuItem("Item 2"),
            ],
            label="Open DropdownMenu",
        ),
    ]
)

fade = html.Div(
    [
        html.H2("Fade"),
        dbc.Button(
            "Toggle fade", id="fade-button", style={"margin-bottom": "1rem"}
        ),
        dbc.Fade(
            dbc.Card(
                dbc.CardBody(
                    html.P(
                        "This content fades in and out", class_name="card-text"
                    )
                )
            ),
            id="fade",
            is_in=True,
        ),
    ]
)

form = html.Div(
    [
        html.H2("Form"),
        dbc.Form(
            [
                dbc.FormGroup(
                    [
                        dbc.Label("Username"),
                        dbc.Input(
                            placeholder="Enter your username", type="text"
                        ),
                        dbc.FormText(
                            [
                                "Can't remember your username? ",
                                html.A(
                                    "Click here.",
                                    href="#",
                                    class_name="text-muted",
                                    style={"text-decoration": "underline"},
                                ),
                            ]
                        ),
                    ]
                ),
                dbc.FormGroup(
                    [
                        dbc.Label("Username"),
                        dbc.Input(
                            placeholder="Enter your password", type="password"
                        ),
                        dbc.FormText(
                            [
                                "Can't remember your password? ",
                                html.A(
                                    "Click here.",
                                    href="#",
                                    class_name="text-muted",
                                    style={"text-decoration": "underline"},
                                ),
                            ]
                        ),
                    ]
                ),
            ]
        ),
    ]
)

input_ = html.Div(
    [
        html.H2("Input"),
        dbc.FormGroup([dbc.Label("Text input"), dbc.Input(type="text")]),
        dbc.FormGroup(
            [
                dbc.Label("Valid text input"),
                dbc.Input(type="text", valid=True),
                dbc.FormFeedback("That's a valid input!", valid=True),
            ]
        ),
        dbc.FormGroup(
            [
                dbc.Label("Invalid text input"),
                dbc.Input(type="text", invalid=True),
                dbc.FormFeedback("That's an invalid input..."),
            ]
        ),
        html.H4("Checklist"),
        dbc.Checklist(
            options=[
                {"label": "Option {}".format(i), "value": i} for i in range(5)
            ],
            value=[],
        ),
        html.H5("Inline checklist", class_name="mt-3"),
        dbc.Checklist(
            options=[
                {"label": "Option {}".format(i), "value": i} for i in range(5)
            ],
            value=[],
            inline=True,
        ),
        html.H4("RadioItems", class_name="mt-5"),
        dbc.RadioItems(
            options=[
                {"label": "Option {}".format(i), "value": i} for i in range(5)
            ],
            value=0,
        ),
        html.H5("Inline radioitems", class_name="mt-3"),
        dbc.RadioItems(
            options=[
                {"label": "Option {}".format(i), "value": i} for i in range(5)
            ],
            value=0,
            inline=True,
        ),
    ]
)

input_group = html.Div(
    [
        html.H2("Input groups and addons"),
        dbc.InputGroup(
            [
                dbc.InputGroupAddon(
                    dbc.Button("To the left!", color="danger"),
                    addon_type="prepend",
                ),
                dbc.Input(type="text"),
            ]
        ),
        html.Br(),
        dbc.InputGroup(
            [
                dbc.Input(type="text"),
                dbc.InputGroupAddon(
                    dbc.Button("To the right!", color="success"),
                    addon_type="append",
                ),
            ]
        ),
        html.Br(),
        dbc.InputGroup(
            [
                dbc.InputGroupAddon("@", addon_type="prepend"),
                dbc.Input(type="text", placeholder="Enter username"),
            ]
        ),
    ]
)

jumbotron = html.Div(
    [
        html.H2("Jumbotron"),
        dbc.Jumbotron(
            [
                html.H2("This is a jumbotron"),
                html.P("It makes things big..."),
                dbc.Button("Click here", color="danger"),
            ]
        ),
    ]
)

list_group = html.Div(
    [
        html.H2("ListGroup"),
        dbc.ListGroup(
            [
                dbc.ListGroupItem("Item 1", color="primary", action=True),
                dbc.ListGroupItem("Item 2"),
                dbc.ListGroupItem("Item 3"),
                dbc.ListGroupItem(
                    [
                        dbc.ListGroupItemHeading("Item 4 heading"),
                        dbc.ListGroupItemText("Item 4 text"),
                    ]
                ),
            ]
        ),
    ]
)

popover = html.Div(
    [
        html.H2("Popover"),
        html.P(
            ["Click on the word ", html.Span("popover", id="popover-target")]
        ),
        dbc.Popover(
            [
                dbc.PopoverHeader("Popover header"),
                dbc.PopoverBody("Popover body"),
            ],
            id="popover",
            is_open=False,
            target="popover-target",
        ),
    ]
)

progress = html.Div(
    [
        html.H2("Progress"),
        dbc.Progress(id="progress", value=0, striped=True, animated=True),
    ]
)


table = html.Div(
    [
        html.H2("Table"),
        dbc.Table(
            [
                html.Thead(
                    html.Tr(
                        [
                            html.Th("#"),
                            html.Th("First name"),
                            html.Th("Last name"),
                        ]
                    )
                ),
                html.Tbody(
                    [
                        html.Tr(
                            [
                                html.Th("1", scope="row"),
                                html.Td("Tom"),
                                html.Td("Cruise"),
                            ]
                        ),
                        html.Tr(
                            [
                                html.Th("2", scope="row"),
                                html.Td("Jodie"),
                                html.Td("Foster"),
                            ]
                        ),
                        html.Tr(
                            [
                                html.Th("3", scope="row"),
                                html.Td("Chadwick"),
                                html.Td("Boseman"),
                            ]
                        ),
                    ]
                ),
            ],
            responsive=True,
            striped=True,
            hover=True,
        ),
    ]
)

tabs = html.Div(
    [
        html.H2("Tabs"),
        dbc.Tabs(
            [
                dbc.Tab(
                    html.H4("This is tab 1"),
                    label="Tab 1",
                    style={"padding": "10px"},
                ),
                dbc.Tab(
                    dbc.Card(
                        dbc.CardBody(
                            [
                                html.P(
                                    "This tab has a card!",
                                    class_name="card-text",
                                ),
                                dbc.Button("Click here", color="success"),
                            ]
                        )
                    ),
                    label="Tab 2",
                    style={"padding": "10px"},
                ),
            ]
        ),
    ]
)

tooltip = html.Div(
    [
        html.H2("Tooltip"),
        html.P(
            [
                "I wonder what ",
                html.Span(
                    "floccinaucinihilipilification", id="tooltip-target"
                ),
                " means?",
            ]
        ),
        dbc.Tooltip(
            "Noun: rare, "
            "the action or habit of estimating something as worthless.",
            target="tooltip-target",
        ),
    ]
)

app.layout = html.Div(
    [
        navbar,
        dbc.Container(
            [
                dcc.Interval(id="interval", interval=500, n_intervals=0),
                header,
                html.Br(),
                alerts,
                html.Br(),
                badges,
                html.Br(),
                buttons,
                html.Br(),
                cards,
                html.Br(),
                collapse,
                html.Br(),
                columns,
                html.Br(),
                dropdownmenu,
                html.Br(),
                fade,
                html.Br(),
                form,
                html.Br(),
                input_,
                html.Br(),
                input_group,
                html.Br(),
                jumbotron,
                html.Br(),
                list_group,
                html.Br(),
                popover,
                html.Br(),
                progress,
                html.Br(),
                table,
                html.Br(),
                tabs,
                html.Br(),
                tooltip,
                html.Div(style={"height": "200px"}),
            ]
        ),
    ]
)


@app.callback(
    Output("collapse", "is_open"),
    [Input("collapse-button", "n_clicks")],
    [State("collapse", "is_open")],
)
def toggle_collapse(n, is_open):
    if n:
        return not is_open
    return is_open


@app.callback(
    Output("fade", "is_in"),
    [Input("fade-button", "n_clicks")],
    [State("fade", "is_in")],
)
def toggle_fade(n, is_in):
    if n:
        return not is_in
    return is_in


@app.callback(
    Output("popover", "is_open"),
    [Input("popover-target", "n_clicks")],
    [State("popover", "is_open")],
)
def toggle_popover(n, is_open):
    if n:
        return not is_open
    return is_open


@app.callback(Output("progress", "value"), [Input("interval", "n_intervals")])
def advance_progress(n):
    # advance to 100 then pause for a bit
    return min(n % 111, 100)


if __name__ == "__main__":
    app.run_server(port=8888, debug=True)
