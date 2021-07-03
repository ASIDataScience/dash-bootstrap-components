"""
Testing of callbacks in non-Python Toast snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


def test_r_toast_auto(dashr):
    r_app = load_r_app((HERE.parent / "toast" / "auto_dismiss.R"), "toast")
    dashr.start_server(r_app)
    check_toast_auto_callbacks(dashr)


def test_jl_toast_auto(dashjl):
    jl_app = load_jl_app((HERE.parent / "toast" / "auto_dismiss.jl"), "toast")
    dashjl.start_server(jl_app)
    check_toast_auto_callbacks(dashjl)


def check_toast_auto_callbacks(runner):
    wait.until(
        lambda: len(runner.find_elements("#auto-toast")) == 0,
        timeout=5,
    )

    runner.find_element("#auto-toast-toggle").click()
    wait.until(
        lambda: len(runner.find_elements("#auto-toast")) > 0,
        timeout=4,
    )


# -------------------------


def test_r_toast_icon(dashr):
    r_app = load_r_app((HERE.parent / "toast" / "icon_dismiss.R"), "toast")
    dashr.start_server(r_app)
    check_toast_icon_callbacks(dashr)


def test_jl_toast_icon(dashjl):
    jl_app = load_jl_app((HERE.parent / "toast" / "icon_dismiss.jl"), "toast")
    dashjl.start_server(jl_app)
    check_toast_icon_callbacks(dashjl)


def check_toast_icon_callbacks(runner):

    wait.until(
        lambda: runner.find_element("#simple-toast").get_attribute("class")
        == "toast fade show",
        timeout=4,
    )

    runner.find_element(".close").click()

    wait.until(
        lambda: len(runner.find_elements("#simple-toast")) == 0,
        timeout=4,
    )
