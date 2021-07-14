#!/usr/bin/env python

"""
A simple application demonstrating how to build a sortable dbc.Table using sorttable.js
(https://www.kryogenix.org/code/browser/sorttable/), a small JS library to make an html table sortable.
"""

import dash
import dash_bootstrap_components as dbc
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, MATCH, Output, State

DUMMY_STORE_TYPE = 'dummy-store'
SORTABLE_TABLE_TYPE = 'sortable-table'
COMPONENT_ID_INDEX = 1

# link fontawesome to get the chevron icons
FA = "https://use.fontawesome.com/releases/v5.8.1/css/all.css"

app = dash.Dash(__name__,
                external_stylesheets=[dbc.themes.BOOTSTRAP, FA],
                suppress_callback_exceptions=True)


def create_table(num_rows):
    return html.Div(
        [
            dbc.Table(
                [
                    html.Thead(
                        html.Tr([
                            html.Th([html.I('Name '),
                                     html.I(className="fas fa-sort mr-3")]),
                            html.Th([html.I('Number '),
                                     html.I(className="fas fa-sort mr-3")]),
                        ])
                    ),
                    html.Tbody([
                        html.Tr([
                            html.Td(5 * chr(ord('A') + i)),
                            html.Td(num_rows - i)
                        ]) for i in range(num_rows)
                    ])
                ],
                id={'type': SORTABLE_TABLE_TYPE, 'id': COMPONENT_ID_INDEX},
                bordered=True,
                hover=True,
                striped=True,
            ),
        ]
    )


app.layout = html.Div([
    dbc.Input(id='num_rows', placeholder='Number of table rows', min=0, max=1000, step=1, type="number"),
    html.Br(),
    html.P(id='status-msg'),
    html.Div(id='table-div'),
    # The dcc.Store associated with the table must be created in the layout for the callback to work
    dcc.Store(id={'type': DUMMY_STORE_TYPE, 'id': COMPONENT_ID_INDEX}, data=0),
])


@app.callback(
    Output("status-msg", "children"),
    Output('table-div', 'children'),
    Input("num_rows", "value"),
    prevent_initial_call=True,
)
def output_text(value):
    if value is None or value == '':
        value = 0
    return f'Number of rows created: {value}', create_table(int(value))


# This clientside callback is triggered by a change in the table contents (new table created) and mark the
# table as sortable by calling sorttable.makeSortable() JS function. An output is required despite not useful
# here as the goal of the callback is just to execute the JS function, so use a dcc.Store and write a dummy value.
# This version of the callback demonstrates how to use the same callback to manage several tables using pattern-matching
# callbacks.
app.clientside_callback(
    """
    function make_table_sortable(dummy, table_id) {
        /* Convert a dict ID into a string matching the JS ID*/
        if (!(typeof table_id === 'string' || table_id instanceof String)) {
            table_id = JSON.stringify(table_id, Object.keys(table_id).sort());
        };
        const tableObject = document.getElementById(table_id);
        sorttable.makeSortable(tableObject);
        return 0;
    }
    """,
    Output({'type': DUMMY_STORE_TYPE, 'id': MATCH}, 'data'),
    Input({'type': SORTABLE_TABLE_TYPE, 'id': MATCH}, 'children'),
    State({'type': SORTABLE_TABLE_TYPE, 'id': MATCH}, 'id'),
    prevent_initial_call=True
)

if __name__ == "__main__":
    app.run_server(debug=True)
