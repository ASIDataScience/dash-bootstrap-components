#=
Dash port of Shiny wordcloud example:

https://shiny.rstudio.com/gallery/word-cloud.html

Note: some functionality has been changed from the original
example.
=#

using Dash, DashBootstrapComponents, DashCoreComponents, DashHtmlComponents
using HTTP, WordCloud, Memoize, LRUCache, Base64

BASE_URL = "https://cdn.opensource.faculty.ai/wordcloud"

DOCUMENT_URLS = Dict(
    "midsummer" => "$BASE_URL/a-midsummer-nights-dream.txt",
    "venice" => "$BASE_URL/the-merchant-of-venice.txt",
    "randj" => "$BASE_URL/romeo-and-juliet.txt",
)

@memoize LRU{Any,Tuple{Any,Any}}(maxsize = 3) function load_word_frequencies(book)
    url = DOCUMENT_URLS[book]
    return HTTP.request("GET", url).body |> String |> processtext
end;

app = dash(external_stylesheets = [dbc_themes.BOOTSTRAP]);

dropdown = dcc_dropdown(
    id = "book",
    options = [
        Dict("label" => "A Midsummer Night's Dream", "value" => "midsummer"),
        Dict("label" => "The Merchant of Venice", "value" => "venice"),
        Dict("label" => "Romeo and Juliet", "value" => "randj"),
    ],
    value = "midsummer",
);

word_density_slider = html_div(
    dcc_slider(
        id = "word-density-slider",
        min = 0.1,
        max = 0.5,
        step = 0.05,
        value = 0.25,
        marks = Dict(i => string(convert(Int, i * 100)) * "%" for i = 0.1:0.1:0.5),
    ),
    className = "p-3 mb-2",
);

word_angles_slider = html_div(
    dcc_rangeslider(
        id = "word-angles-slider",
        min = -90,
        max = 90,
        step = 0.1,
        value = [-45, 45],
        marks = Dict(i => string(i) for i = -90:45:90),
    ),
    className = "p-3 mb-2",
);

max_vocab_slider = html_div(
    dcc_slider(
        id = "max-vocab-slider",
        min = 1,
        max = 300,
        step = 1,
        value = 100,
        marks = merge(Dict(1 => "1"), Dict(i => string(i) for i = 30:30:301)),
    ),
    className = "p-3",
);

controls = dbc_card(
    [
        dbc_formgroup([dbc_label("Choose a book:"), dropdown]),
        dbc_formgroup([dbc_label("Layout density:"), word_density_slider]),
        dbc_formgroup([dbc_label("Word angles:"), word_angles_slider]),
        dbc_formgroup([dbc_label("Maximum number of words:"), max_vocab_slider]),
    ],
    className = "mb-3",
    body = true,
);

spinner = dbc_spinner(
    color = "info",
    spinner_style = Dict("width" => "25rem", "height" => "25rem"),
);

app.layout = dbc_container(
    [
        html_h1("Word Cloud"),
        html_hr(),
        dbc_row(
            [
                dbc_col(controls, md = 5),
                dbc_col(
                    dbc_spinner(
                        id = "loading",
                        color = "info",
                        spinner_style = Dict("width" => "3rem", "height" => "3rem"),
                        children = dbc_card([dbc_cardimg(id = "wordcloud")]),
                    ),
                    md = 7,
                    className = "text-center",
                ),
            ],
            align = "center",
        ),
    ],
    fluid = true,
);

callback!(
    app,
    Output("wordcloud", "src"),
    Input("book", "value"),
    Input("word-density-slider", "value"),
    Input("word-angles-slider", "value"),
    Input("max-vocab-slider", "value"),
) do book, word_density, word_angles, max_vocab

    # Restrict the number of results
    word, freq = load_word_frequencies(book)
    frequencies = (word[1:max_vocab], freq[1:max_vocab])

    # Extract the required angle range
    angles = [i for i = word_angles[1]:10:word_angles[2]]

    # Create the wordcloud
    wc = wordcloud(
        frequencies,
        mask = shape(box, 1000, 500, 10),
        colors = WordCloud.randomscheme(),
        angles = angles, # WordCloud.randomangles(),
        density = word_density,
    )
    generate!(wc)

    # Encode the resulting image
    result = base64encode(String(copy(paintsvg(wc).bufferdata)))
    return "data:image/svg+xml;base64,$result"

end;

run_server(app, "0.0.0.0", 8888, debug = true);
