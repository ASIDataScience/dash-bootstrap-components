"""
Testing of callbacks in non-Python Spinner snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


def test_r_spinner(dashr):
    r_app = load_r_app(
        (HERE.parent / "spinner" / "loading.R"), "loading_spinner"
    )
    dashr.start_server(r_app)
    check_spinner_callbacks(dashr)


def test_jl_spinner(dashjl):
    jl_app = load_jl_app(
        (HERE.parent / "spinner" / "loading.jl"), "loading_spinner"
    )
    dashjl.start_server(jl_app)
    check_spinner_callbacks(dashjl)


def check_spinner_callbacks(runner):
    runner.find_element("#loading-button").click()
    wait.until(
        lambda: runner.find_element("#loading-output").text
        == "Output loaded 1 times",
        timeout=4,
    )
