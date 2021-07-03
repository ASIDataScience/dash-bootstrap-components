"""
Testing of callbacks in non-Python Fade snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


def test_r_fade(dashr):
    r_app = load_r_app((HERE.parent / "fade" / "fade.R"), "fade")
    dashr.start_server(r_app)
    check_fade_callbacks(dashr)


def test_jl_fade(dashjl):
    jl_app = load_jl_app((HERE.parent / "fade" / "fade.jl"), "fade")
    dashjl.start_server(jl_app)
    check_fade_callbacks(dashjl)


def check_fade_callbacks(runner):
    assert runner.find_element("#fade") != []
    runner.find_element("#fade-button").click()
    wait.until(
        lambda: runner.find_element("#fade").get_attribute("style")
        == "visibility: hidden;",
        timeout=4,
    )


def test_r_fade_transition(dashr):
    r_app = load_r_app((HERE.parent / "fade" / "transition.R"), "fade")
    dashr.start_server(r_app)
    check_fade_transition_callbacks(dashr)


def test_jl_fade_transition(dashjl):
    jl_app = load_jl_app((HERE.parent / "fade" / "transition.jl"), "fade")
    dashjl.start_server(jl_app)
    check_fade_transition_callbacks(dashjl)


def check_fade_transition_callbacks(runner):
    wait.until(
        lambda: len(runner.find_elements("#fade-transition")) == 1,
        timeout=4,
    )

    runner.find_element("#fade-transition-button").click()
    wait.until(
        lambda: runner.find_element("#fade-transition").get_attribute("style")
        == "transition: opacity 2000ms ease 0s; visibility: hidden;",
        timeout=5,
    )
