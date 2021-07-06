import os
from pathlib import Path

import dash
import dash_bootstrap_components as dbc
import dash_html_components as html
from jinja2 import Environment, FileSystemLoader

from .components.table.simple import table_body, table_header
from .components.tabs.simple import tab1_content, tab2_content
from .markdown_parser import parse

SERVE_LOCALLY = os.getenv("DBC_DOCS_MODE", "production") == "dev"

HERE = Path(__file__).parent
COMPONENTS = HERE / "components"
TEMPLATES = HERE.parent / "templates"

LOREM = (COMPONENTS / "modal" / "lorem.txt").read_text().strip()

HIGHLIGHT_JS_CSS = (
    "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.13.1/"
    "build/styles/monokai-sublime.min.css"
)

INDEX_STRING_TEMPLATE = """{% from "macros/navbar.html" import navbar %}
{% extends "docs.html" %}
{% block head %}
{{ super() }}
{{ "{%metas%}{%css%}" }}
{% endblock %}
{% block title %}
<title>{{ "{%title%}" }}</title>
{% endblock %}
{% block header %}{{ navbar("docs") }}{% endblock %}
{% block content %}
{{ "{%app_entry%}" }}
{% endblock %}
{% block scripts %}
<footer>
  {{ "{%config%}{%scripts%}{%renderer%}" }}
  {{ super() }}
</footer>
{% endblock %}
"""


def _get_label(slug):
    if slug == "button_group":
        return "ButtonGroup"
    if slug == "dropdown_menu":
        return "DropdownMenu"
    if slug == "input_group":
        return "InputGroup"
    if slug == "list_group":
        return "ListGroup"
    return slug.capitalize()


def register_apps():
    component_bodies = {
        "alert": {"markdown_path": COMPONENTS / "alert.md"},
        "badge": {"markdown_path": COMPONENTS / "badge.md"},
        "button": {"markdown_path": COMPONENTS / "button.md"},
        "button_group": {"markdown_path": COMPONENTS / "button_group.md"},
        "card": {"markdown_path": COMPONENTS / "card.md"},
        "carousel": {"markdown_path": COMPONENTS / "carousel.md"},
        "collapse": {"markdown_path": COMPONENTS / "collapse.md"},
        "dropdown_menu": {"markdown_path": COMPONENTS / "dropdown.md"},
        "fade": {"markdown_path": COMPONENTS / "fade.md"},
        "form": {"markdown_path": COMPONENTS / "form.md"},
        "input": {"markdown_path": COMPONENTS / "input.md"},
        "input_group": {"markdown_path": COMPONENTS / "input_group.md"},
        "jumbotron": {"markdown_path": COMPONENTS / "jumbotron.md"},
        "layout": {"markdown_path": COMPONENTS / "layout.md"},
        "list_group": {"markdown_path": COMPONENTS / "list_group.md"},
        "modal": {
            "markdown_path": COMPONENTS / "modal.md",
            "extra_env_vars": {"LOREM": LOREM},
        },
        "nav": {"markdown_path": COMPONENTS / "nav.md"},
        "navbar": {"markdown_path": COMPONENTS / "navbar.md"},
        "popover": {"markdown_path": COMPONENTS / "popover.md"},
        "progress": {"markdown_path": COMPONENTS / "progress.md"},
        "spinner": {"markdown_path": COMPONENTS / "spinner.md"},
        "table": {
            "markdown_path": COMPONENTS / "table.md",
            "extra_env_vars": {
                "dbc": dbc,
                "table_header": table_header,
                "table_body": table_body,
            },
        },
        "tabs": {
            "markdown_path": COMPONENTS / "tabs.md",
            "extra_env_vars": {
                "tab1_content": tab1_content,
                "tab2_content": tab2_content,
            },
        },
        "toast": {"markdown_path": COMPONENTS / "toast.md"},
        "tooltip": {"markdown_path": COMPONENTS / "tooltip.md"},
    }

    sidenav_items = [
        {
            "name": "quickstart",
            "href": "/docs/quickstart",
            "label": "Quickstart",
        },
        {"name": "themes", "href": "/docs/themes", "label": "Themes"},
        {"name": "faq", "href": "/docs/faq", "label": "FAQ"},
        {"name": "dashr", "href": "/docs/dashr", "label": "Dash for R"},
        {
            "name": "components",
            "href": "/docs/components",
            "label": "Components",
            "children": [
                {
                    "name": slug,
                    "href": f"/docs/components/{slug}",
                    "label": _get_label(slug),
                }
                for slug in component_bodies
            ],
        },
    ]

    routes = {}
    env = Environment(loader=FileSystemLoader(TEMPLATES.as_posix()))
    template = env.from_string(INDEX_STRING_TEMPLATE)

    for slug, kwargs in component_bodies.items():
        app = dash.Dash(
            external_stylesheets=["/static/loading.css"],
            requests_pathname_prefix=f"/docs/components/{slug}/",
            suppress_callback_exceptions=True,
            serve_locally=SERVE_LOCALLY,
            index_string=template.render(
                sidenav_items=sidenav_items,
                sidenav_active="components",
                active_child=slug,
            ),
            update_title=None,
        )
        app.title = f"{_get_label(slug)} - dbc docs"

        if slug == "layout":
            app.layout = html.Div(
                parse(app, **kwargs), className="layout-demo"
            )
        elif slug == "button_group":
            app.layout = html.Div(
                parse(app, **kwargs), className="button-group-demo"
            )
        else:
            app.layout = parse(app, **kwargs)
        routes[f"/docs/components/{slug}"] = app

    return routes
