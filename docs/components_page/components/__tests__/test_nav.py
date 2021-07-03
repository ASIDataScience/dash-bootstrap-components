"""
Testing of callbacks in non-Python Nav snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


def test_r_nav(dashr):
    r_app = load_r_app((HERE.parent / "nav" / "navlink.R"), "nav")
    dashr.start_server(r_app)
    check_nav_callbacks(dashr)


def test_jl_nav(dashjl):
    jl_app = load_jl_app((HERE.parent / "nav" / "navlink.jl"), "nav")
    dashjl.start_server(jl_app)
    check_nav_callbacks(dashjl)


def check_nav_callbacks(runner):
    runner.find_element("#button-link").click()
    wait.until(
        lambda: runner.find_element("#button-clicks").text
        == "Button clicked 1 times",
        timeout=4,
    )
