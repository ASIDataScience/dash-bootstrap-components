"""
Dash port of Shiny faithful example:

https://shiny.rstudio.com/gallery/faithful.html

Note: several features have been removed since figure_factory
does not exist for plotly.jl. This is a heavily simplified
version of the original R shiny implementation.
"""

using Dash, DashBootstrapComponents, DashCoreComponents, DashHtmlComponents
using CSV, DataFrames, HTTP

# import plotly.figure_factory as ff

# data_path = "https://cdn.opensource.faculty.ai/old-faithful/data.csv";
# DATA = DataFrame(CSV.File(HTTP.get(data_path).body));

DATA = DataFrame(CSV.File("data.csv"));

app = dash(external_stylesheets = [dbc_themes.BOOTSTRAP]);

dropdown = dbc_formgroup([
    dbc_label("Number of bins in histogram (approximate):"),
    dcc_dropdown(
        id = "dropdown",
        options = [Dict("label" => n, "value" => n) for n in [10, 20, 35, 50]],
        value = 20,
    ),
])


app.layout = dbc_container([
    html_h1("Old Faithful eruption data"),
    html_hr(),
    dbc_row([dbc_col(dropdown)]),
    html_br(),
    dcc_graph(id = "graph"),
])


callback!(app, Output("graph", "figure"), Input("dropdown", "value")) do dropdown_value
    fig_data = [(x = DATA[:, "eruptions"], nbinsx = dropdown_value, type = "histogram")]

    fig_layout = (
        title = "Geyser eruption duration",
        showlegend = false,
        xaxis = (title = "Duration (minutes)",),
        yaxis = (title = "Density",),
    )
    return (data = fig_data, layout = fig_layout)

end;

run_server(app, "0.0.0.0", 8888, debug = true);
