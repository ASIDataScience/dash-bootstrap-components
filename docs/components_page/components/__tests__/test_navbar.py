"""
Testing of callbacks in non-Python Navbar snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


def test_r_navbar(dashr):
    r_app = load_r_app((HERE.parent / "navbar" / "navbar.R"), "navbar")
    dashr.start_server(r_app)
    check_navbar_callbacks(dashr)


def test_jl_navbar(dashjl):
    jl_app = load_jl_app((HERE.parent / "navbar" / "navbar.jl"), "navbar")
    dashjl.start_server(jl_app)
    check_navbar_callbacks(dashjl)


def check_navbar_callbacks(runner):

    runner.driver.set_window_size(375, 667)

    wait.until(
        lambda: runner.find_element("#navbar-collapse").get_attribute("class")
        == "collapse navbar-collapse",
        timeout=4,
    )

    runner.find_element("#navbar-toggler").click()
    wait.until(
        lambda: runner.find_element("#navbar-collapse").get_attribute("class")
        == "collapse show navbar-collapse",
        timeout=4,
    )
