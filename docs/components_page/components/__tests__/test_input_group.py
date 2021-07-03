"""
Testing of callbacks in non-Python input group snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


def test_r_input_group_button(dashr):
    r_app = load_r_app(
        (HERE.parent / "input_group" / "button.R"), "input_group"
    )
    dashr.start_server(r_app)
    check_input_group_button_callbacks(dashr)


def test_jl_input_group_button(dashjl):
    jl_app = load_jl_app(
        (HERE.parent / "input_group" / "button.jl"), "input_group"
    )
    dashjl.start_server(jl_app)
    check_input_group_button_callbacks(dashjl)


def check_input_group_button_callbacks(runner):
    runner.find_element("#input-group-button").click()
    wait.until(
        lambda: runner.find_element("#input-group-button-input").get_attribute(
            "value"
        )
        != "",
        timeout=4,
    )


# ----------------------------------------


def test_r_input_group_dropdown(dashr):
    r_app = load_r_app(
        (HERE.parent / "input_group" / "dropdown.R"), "input_group"
    )
    dashr.start_server(r_app)
    check_input_group_dropdown_callbacks(dashr)


def test_jl_input_group_dropdown(dashjl):
    jl_app = load_jl_app(
        (HERE.parent / "input_group" / "dropdown.jl"), "input_group"
    )
    dashjl.start_server(jl_app)
    check_input_group_dropdown_callbacks(dashjl)


def check_input_group_dropdown_callbacks(runner):
    runner.find_element(".btn").click()
    runner.find_element("#dropdown-menu-item-1").click()
    wait.until(
        lambda: runner.find_element(
            "#input-group-dropdown-input"
        ).get_attribute("value")
        in ["Arthur Dent", "Ford Prefect", "Trillian Astra"],
        timeout=4,
    )

    runner.find_element(".btn").click()
    runner.find_element("#dropdown-menu-item-2").click()
    wait.until(
        lambda: runner.find_element(
            "#input-group-dropdown-input"
        ).get_attribute("value")
        in ["David Bowman", "Frank Poole", "Dr. Heywood Floyd"],
        timeout=4,
    )

    runner.find_element(".btn").click()
    runner.find_element("#dropdown-menu-item-clear").click()
    wait.until(
        lambda: runner.find_element(
            "#input-group-dropdown-input"
        ).get_attribute("value")
        == "",
        timeout=4,
    )
