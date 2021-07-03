"""
Testing of callbacks in non-Python Progress snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


def test_r_progress(dashr):
    r_app = load_r_app((HERE.parent / "progress" / "animated.R"), "progress")
    dashr.start_server(r_app)
    check_progress_callbacks(dashr)


def test_jl_progress(dashjl):
    jl_app = load_jl_app(
        (HERE.parent / "progress" / "animated.jl"), "progress"
    )
    dashjl.start_server(jl_app)
    check_progress_callbacks(dashjl)


def check_progress_callbacks(runner):

    wait.until(
        lambda: runner.find_element(
            "div[class^='progress-bar']"
        ).get_attribute("class")
        == "progress-bar progress-bar-striped",
        timeout=4,
    )

    runner.find_element("#animation-toggle").click()
    wait.until(
        lambda: runner.find_element(
            "div[class^='progress-bar']"
        ).get_attribute("class")
        == "progress-bar progress-bar-animated progress-bar-striped",
        timeout=4,
    )
