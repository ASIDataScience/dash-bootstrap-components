library(dashBootstrapComponents)
library(dashHtmlComponents)

dropdown <- htmlDiv(
  list(
    dbcDropdownMenu(
      list(
        dbcDropdownMenuItem("A button", id = "dropdown-button", n_clicks = 0),
        dbcDropdownMenuItem(
          "Internal link", href = "/docs/components/dropdown_menu"
        ),
        dbcDropdownMenuItem(
          "External Link", href = "https://github.com"
        ),
        dbcDropdownMenuItem(
          "External relative",
          href = "/docs/components/dropdown_menu",
          external_link = TRUE
        )
      ),
      label = "Menu"
    ),
    htmlP(id = "item-clicks", className = "mt-3")
  )
)


app$callback(
  output("item-clicks", "children"),
  list(input("dropdown-button", "n_clicks")),
  function(n) {
    if (n > 0) {
      return(sprintf("Button clicked %d times.", n))
    }
    return(sprintf("Button not clicked yet"))
  }
)
