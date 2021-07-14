# sortable_table

This example demontrates how to make a `dbc.table` sortable, using a [sorttable.js]
(https://www.kryogenix.org/code/browser/sorttable/), a JavaScript library dedicated to this.

It should be considered as an exception to the Dash bottom line which is that you should not write any JavaScript
to make your application: Dash takes care of generating the required JavaScript to implemeent the components and
their associated callbacks. The recommended approach for powerful tables in Dash is [Dash Table]
(https://dash.plotly.com/datatable) but there are some occasions where it cannot be used, mainly when you need
to fill your table with objects other than text, numbers and dropdown menus (e.g. a column using switches, accordions
or icons). This example shows how to preserve the sort capability of the Dash Table, using `dbc.Table`. 

The basic trick to achieve this is to run a small piece of JavaScript as a client-side callback when the table is
created. This JS code will mark the table as sortable. As in a real application, you may have several tables built 
with `dbc.Table` and you don't wont to write one callback per table to do this, the example shows how to use one
callback for all tables using a composite (dict) ID and pattern-matching callbacks. Note that it is not a requirement
to use this form of ID: it will work also with standard IDs but if you have several tables, it may be more tricky to
manage the inputs and to retrieve the table IDs.