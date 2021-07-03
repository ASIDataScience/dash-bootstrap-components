"""
Testing of callbacks in non-Python input snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


def test_r_input_simple(dashr):
    r_app = load_r_app((HERE.parent / "input" / "simple.R"), "text_input")
    dashr.start_server(r_app)
    check_input_simple_callbacks(dashr)


def test_jl_input_simple(dashjl):
    jl_app = load_jl_app((HERE.parent / "input" / "simple.jl"), "text_input")
    dashjl.start_server(jl_app)
    check_input_simple_callbacks(dashjl)


def check_input_simple_callbacks(runner):
    runner.find_element("#input").send_keys("x")
    wait.until(
        lambda: runner.find_element("#output").text == "x",
        timeout=4,
    )


# --------------------------------


def test_r_input_radio_ckeck(dashr):
    r_app = load_r_app((HERE.parent / "input" / "radio_check.R"), "inputs")
    dashr.start_server(r_app)
    check_input_radio_check_callbacks(dashr)


def test_jl_input_radio_check(dashjl):
    jl_app = load_jl_app((HERE.parent / "input" / "radio_check.jl"), "inputs")
    dashjl.start_server(jl_app)
    check_input_radio_check_callbacks(dashjl)


def check_input_radio_check_callbacks(runner):

    wait.until(
        lambda: runner.find_element("#radioitems-checklist-output").text
        == "Radio button 1, 1 checklist item and 1 switch selected.",
        timeout=10,
    )

    runner.find_element(
        "label[for='_dbcprivate_radioitems_radioitems-input_input_2']"
    ).click()
    runner.find_element(
        "label[for='_dbcprivate_checklist_checklist-input_input_2']"
    ).click()
    runner.find_element(
        "label[for='_dbcprivate_checklist_switches-input_input_2']"
    ).click()

    wait.until(
        lambda: runner.find_element("#radioitems-checklist-output").text
        == "Radio button 2, 2 checklist items and 2 switches selected.",
        timeout=10,
    )
