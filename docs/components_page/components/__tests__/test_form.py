"""
Testing of callbacks in non-Python Form snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


def test_r_form(dashr):
    r_app = load_r_app((HERE.parent / "form" / "feedback.R"), "email_input")
    dashr.start_server(r_app)
    check_form_callbacks(dashr)


def test_jl_form(dashjl):
    jl_app = load_jl_app((HERE.parent / "form" / "feedback.jl"), "email_input")
    dashjl.start_server(jl_app)
    check_form_callbacks(dashjl)


def check_form_callbacks(runner):
    runner.find_element("#email-input").send_keys("x")
    wait.until(
        lambda: runner.find_element("#email-input").get_attribute("class")
        == "is-invalid form-control",
        timeout=4,
    )

    runner.find_element("#email-input").send_keys("x@gmail.com")
    wait.until(
        lambda: runner.find_element("#email-input").get_attribute("class")
        == "is-valid form-control",
        timeout=4,
    )
