"""
Testing of callbacks in non-Python Collapse snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


# simple
def test_r_collapse_simple(dashr):
    r_app = load_r_app((HERE.parent / "collapse" / "simple.R"), "collapse")
    dashr.start_server(r_app)
    check_collapse_simple_callbacks(dashr)


def test_jl_collapse_simple(dashjl):
    jl_app = load_jl_app((HERE.parent / "collapse" / "simple.jl"), "collapse")
    dashjl.start_server(jl_app)
    check_collapse_simple_callbacks(dashjl)


def check_collapse_simple_callbacks(runner):
    runner.find_element("#collapse-button").click()
    wait.until(
        lambda: runner.find_elements("#collapse") != [],
        timeout=4,
    )


# --------------------------------------------
# multiple


def test_r_collapse_multiple(dashr):
    r_app = load_r_app((HERE.parent / "collapse" / "multiple.R"), "collapses")
    dashr.start_server(r_app)
    check_collapse_multiple_callbacks(dashr)


def test_jl_collapse_multiple(dashjl):
    jl_app = load_jl_app(
        (HERE.parent / "collapse" / "multiple.jl"), "collapses"
    )
    dashjl.start_server(jl_app)
    check_collapse_multiple_callbacks(dashjl)


def check_collapse_multiple_callbacks(runner):

    runner.find_element("#left").click()
    wait.until(
        lambda: runner.find_element("#left-collapse").get_attribute("class")
        == "collapse",
        timeout=4,
    )

    runner.find_element("#right").click()
    wait.until(
        lambda: runner.find_element("#right-collapse").get_attribute("class")
        == "collapse",
        timeout=4,
    )

    runner.find_element("#both").click()
    wait.until(
        lambda: runner.find_element("#right-collapse").get_attribute("class")
        == "collapse show",
        timeout=4,
    )


# --------------------------------------------
# accordion


def test_r_collapse_accordion(dashr):
    r_app = load_r_app((HERE.parent / "collapse" / "accordion.R"), "accordion")
    dashr.start_server(r_app)
    check_collapse_accordion_callbacks(dashr)


def test_jl_collapse_accordion(dashjl):
    jl_app = load_jl_app(
        (HERE.parent / "collapse" / "accordion.jl"), "accordion"
    )
    dashjl.start_server(jl_app)
    check_collapse_accordion_callbacks(dashjl)


def check_collapse_accordion_callbacks(runner):

    runner.find_element("#group-1-toggle").click()
    wait.until(
        lambda: runner.find_element("#collapse-1").get_attribute("class")
        == "collapse show",
        timeout=4,
    )

    runner.find_element("#group-2-toggle").click()
    wait.until(
        lambda: runner.find_element("#collapse-2").get_attribute("class")
        == "collapse show",
        timeout=4,
    )

    runner.find_element("#group-3-toggle").click()
    wait.until(
        lambda: runner.find_element("#collapse-3").get_attribute("class")
        == "collapse show",
        timeout=4,
    )
