"""
Testing of callbacks in non-Python button_group snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


def test_r_button_group(dashr):
    r_app = load_r_app(
        (HERE.parent / "button_group" / "radios.R"), "button_group"
    )
    dashr.start_server(r_app)
    check_button_group_callbacks(dashr)


def test_jl_button_group(dashjl):
    jl_app = load_jl_app(
        (HERE.parent / "button_group" / "radios.jl"), "button_group"
    )
    dashjl.start_server(jl_app)
    check_button_group_callbacks(dashjl)


def check_button_group_callbacks(runner):

    runner.find_element(
        "label[for='_dbcprivate_radioitems_radios_input_2']"
    ).click()
    wait.until(
        lambda: runner.find_element("#output").text == "Selected value: 2",
        timeout=4,
    )

    runner.find_element(
        "label[for='_dbcprivate_radioitems_radios_input_3']"
    ).click()
    wait.until(
        lambda: runner.find_element("#output").text == "Selected value: 3",
        timeout=4,
    )
