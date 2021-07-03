"""
Testing of callbacks in non-Python Button snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


def test_r_button(dashr):
    r_app = load_r_app((HERE.parent / "button" / "usage.R"), "button")
    dashr.start_server(r_app)
    check_button_callbacks(dashr)


def test_jl_button(dashjl):
    jl_app = load_jl_app((HERE.parent / "button" / "usage.jl"), "button")
    dashjl.start_server(jl_app)
    check_button_callbacks(dashjl)


def check_button_callbacks(runner):
    runner.find_element("#example-button").click()
    wait.until(
        lambda: runner.find_element("#example-output").text
        == "Clicked 1 times.",
        timeout=4,
    )
