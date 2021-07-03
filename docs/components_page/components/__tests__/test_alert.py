"""
Testing of callbacks in non-Python Alert snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


def test_r_dismiss(dashr):
    r_app = load_r_app((HERE.parent / "alert" / "dismiss.R"), "alert")
    dashr.start_server(r_app)
    check_dismiss_callbacks(dashr)


def test_jl_dismiss(dashjl):
    jl_app = load_jl_app((HERE.parent / "alert" / "dismiss.jl"), "alert")
    dashjl.start_server(jl_app)
    check_dismiss_callbacks(dashjl)


def check_dismiss_callbacks(runner):
    assert runner.find_element("#alert-fade") != []
    runner.find_element("#alert-toggle-fade").click()
    wait.until(
        lambda: runner.find_elements("#alert-fade") == [],
        timeout=4,
    )

    assert runner.find_element("#alert-no-fade") != []
    runner.find_element("#alert-toggle-no-fade").click()
    wait.until(
        lambda: runner.find_elements("#alert-no-fade") == [],
        timeout=4,
    )
