using DashBootstrapComponents, DashHtmlComponents

email_input = html_div([
    dbc_formgroup([
        dbc_label("Email"),
        dbc_input(id="email-input", type="email", value=""),
        dbc_formtext("We only accept gmail..."),
        dbc_formfeedback("That looks like a gmail address :-)", valid=true),
        dbc_formfeedback("Sorry, we only accept gmail for some reason...", valid=false),
    ]),
]);


callback!(
    app,
    Output("email-input", "invalid"),
    Input("email-input", "value"),
) do text
    if length(text) > 0
        is_gmail = endswith(text, "@gmail.com")
        return !is_gmail
    end
    return false
end;

callback!(
    app,
    Output("email-input", "valid"),
    Input("email-input", "value"),
) do text
    if length(text) > 0
        is_gmail = endswith(text, "@gmail.com")
        return is_gmail
    end
    return false
end;
