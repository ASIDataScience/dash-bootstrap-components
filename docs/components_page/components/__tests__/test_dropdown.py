"""
Testing of callbacks in non-Python Dropdown snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


def test_r_dropdown(dashr):
    r_app = load_r_app((HERE.parent / "dropdown" / "menu_items.R"), "dropdown")
    dashr.start_server(r_app)
    check_dropdown_callbacks(dashr)


def test_jl_dropdown(dashjl):
    jl_app = load_jl_app(
        (HERE.parent / "dropdown" / "menu_items.jl"), "dropdown"
    )
    dashjl.start_server(jl_app)
    check_dropdown_callbacks(dashjl)


def check_dropdown_callbacks(runner):
    runner.find_element(".btn").click()

    runner.find_element("#dropdown-button").click()

    wait.until(
        lambda: runner.find_element("#item-clicks").text
        == "Button clicked 1 times.",
        timeout=4,
    )
