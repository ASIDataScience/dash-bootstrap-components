library(dashBootstrapComponents)
library(dashHtmlComponents)

cards <- dbcCard(
  dbcCardBody(
    list(
      htmlH5("Custom CSS", className = "card-title"),
      htmlP(
        paste(
          "This card has inline styles applied controlling the width.",
          "You could also apply the same styles with a custom CSS class."
        )
      )
    )
  ),
  style = list(width = "18rem"),
)
