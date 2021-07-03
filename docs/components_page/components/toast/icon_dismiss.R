library(dashBootstrapComponents)
library(dashHtmlComponents)

toast <- htmlDiv(
  list(
    dbcButton(
      "Open toast",
      id = "simple-toast-toggle",
      color = "primary",
      n_clicks = 0,
      className = "mb-3",
    ),
    dbcToast(
      list(htmlP("This is the content of the toast", className = "mb-0")),
      id = "simple-toast",
      header = "This is the header",
      icon = "primary",
      dismissable = TRUE
    )
  )
)


app$callback(
  output("simple-toast", "is_open"),
  list(input("simple-toast-toggle", "n_clicks")),
  function(n) {
    if (n > 0) {
      return(TRUE)
    }
    return(dashNoUpdate())
  }
)
