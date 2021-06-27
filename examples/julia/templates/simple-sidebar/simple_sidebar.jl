#=
This app creates a simple sidebar layout using inline style arguments and the
dbc_nav component.

dcc_location is used to track the current location, and a callback uses the
current location to render the appropriate page content. The active prop of
each NavLink is set automatically according to the current pathname. To use
this feature you must install dash-bootstrap-components >= 0.11.0.

For more details on building multi-page Dash applications, check out the Dash
documentation: https://dash.plot.ly/urls
=#

using Dash, DashBootstrapComponents, DashCoreComponents, DashHtmlComponents

app = dash(external_stylesheets = [dbc_themes.BOOTSTRAP])

# the style arguments for the sidebar. We use position => fixed and a fixed width
SIDEBAR_STYLE = Dict(
    "position" => "fixed",
    "top" => 0,
    "left" => 0,
    "bottom" => 0,
    "width" => "16rem",
    "padding" => "2rem 1rem",
    "background-color" => "#f8f9fa",
)

# the styles for the main content position it to the right of the sidebar and
# add some padding.
CONTENT_STYLE =
    Dict("margin-left" => "18rem", "margin-right" => "2rem", "padding" => "2rem 1rem")

sidebar = html_div(
    [
        html_h2("Sidebar", className = "display-4"),
        html_hr(),
        html_p("A simple sidebar layout with navigation links", className = "lead"),
        dbc_nav(
            [
                dbc_navlink("Home", href = "/", active = "exact"),
                dbc_navlink("Page 1", href = "/page-1", active = "exact"),
                dbc_navlink("Page 2", href = "/page-2", active = "exact"),
            ],
            vertical = true,
            pills = true,
        ),
    ],
    style = SIDEBAR_STYLE,
)

content = html_div(id = "page-content", style = CONTENT_STYLE)

app.layout = html_div([dcc_location(id = "url"), sidebar, content])


callback!(app, Output("page-content", "children"), Input("url", "pathname")) do pathname
    if pathname == "/"
        return html_p("This is the content of the home page!")
    elseif pathname == "/page-1"
        return html_p("This is the content of page 1. Yay!")
    elseif pathname == "/page-2"
        return html_p("Oh cool, this is page 2!")
    else
        # If the user tries to reach a different page, return a 404 message
        return dbc_jumbotron([
            html_h1("404: Not found", className = "text-danger"),
            html_hr(),
            html_p("The pathname $pathname was not recognised..."),
        ])
    end
end

run_server(app, "0.0.0.0", 8888)
