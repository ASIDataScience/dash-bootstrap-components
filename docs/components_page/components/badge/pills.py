import dash_bootstrap_components as dbc
import dash_html_components as html

badges = html.Span(
    [
        dbc.Badge("Primary", pill=True, color="primary", class_name="mr-1"),
        dbc.Badge(
            "Secondary", pill=True, color="secondary", class_name="mr-1"
        ),
        dbc.Badge("Success", pill=True, color="success", class_name="mr-1"),
        dbc.Badge("Warning", pill=True, color="warning", class_name="mr-1"),
        dbc.Badge("Danger", pill=True, color="danger", class_name="mr-1"),
        dbc.Badge("Info", pill=True, color="info", class_name="mr-1"),
        dbc.Badge("Light", pill=True, color="light", class_name="mr-1"),
        dbc.Badge("Dark", pill=True, color="dark"),
    ]
)
