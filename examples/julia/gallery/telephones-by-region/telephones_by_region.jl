#=
Dash port of Shiny telephones by region example:

https://shiny.rstudio.com/gallery/telephones-by-region.html
=#

using Dash, DashBootstrapComponents, DashCoreComponents, DashHtmlComponents
using CSV, DataFrames, HTTP

data_path = "https://cdn.opensource.faculty.ai/world-phones/data.csv";
data = DataFrame(CSV.File(HTTP.get(data_path).body));

app = dash(external_stylesheets = [dbc_themes.BOOTSTRAP]);

controls = dbc_card(
    [
        dbc_formgroup([
            dbc_label("Region"),
            dcc_dropdown(
                id = "region-selector",
                options = [
                    Dict("label" => col, "value" => col) for
                    col in names(data) if col != "Year"
                ],
                value = "S.Amer",
            ),
        ]),
        html_hr(),
        html_p("Data from AT&T (1961) The World's Telephones.", className = "text-muted"),
    ],
    body = true,
)

app.layout = dbc_container(
    [
        html_h1("Telephones by region"),
        html_hr(),
        dbc_row(
            [dbc_col(controls, md = 4), dbc_col(dcc_graph(id = "phones-graph"), md = 8)],
            align = "center",
        ),
    ],
    fluid = true,
);


callback!(
    app,
    Output("phones-graph", "figure"),
    Input("region-selector", "value"),
) do region
    fig_data = [(y = data[:, region], type = "bar")]
    fig_layout = (
        xaxis = (tickvals = [i for i = 0:6], ticktext = data[:, "Year"], title = "Year"),
        yaxis = (title = "Number of Telephones",),
    )

    return (data = fig_data, layout = fig_layout)

end;

run_server(app, "0.0.0.0", 8888, debug = true);
