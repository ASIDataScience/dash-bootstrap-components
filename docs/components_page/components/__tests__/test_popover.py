"""
Testing of callbacks in non-Python Popover snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


def test_r_popover(dashr):
    r_app = load_r_app(
        (HERE.parent / "popover" / "popover_callback.R"), "popover"
    )
    dashr.start_server(r_app)
    check_popover_callbacks(dashr)


def test_jl_popover(dashjl):
    jl_app = load_jl_app(
        (HERE.parent / "popover" / "popover_callback.jl"), "popover"
    )
    dashjl.start_server(jl_app)
    check_popover_callbacks(dashjl)


def check_popover_callbacks(runner):
    assert len(runner.find_elements("#popover")) == 0
    runner.find_element("#toggle").click()
    wait.until(
        lambda: len(runner.find_elements("#popover")) > 0,
        timeout=4,
    )
