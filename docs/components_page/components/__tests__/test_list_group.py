"""
Testing of callbacks in non-Python ListGroup snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


def test_r_list_group(dashr):
    r_app = load_r_app((HERE.parent / "list_group" / "links.R"), "list_group")
    dashr.start_server(r_app)
    check_list_group_callbacks(dashr)


def test_jl_list_group(dashjl):
    jl_app = load_jl_app(
        (HERE.parent / "list_group" / "links.jl"), "list_group"
    )
    dashjl.start_server(jl_app)
    check_list_group_callbacks(dashjl)


def check_list_group_callbacks(runner):
    runner.find_element("#button-item").click()
    wait.until(
        lambda: runner.find_element("#counter").text
        == "Button clicked 1 times",
        timeout=4,
    )
