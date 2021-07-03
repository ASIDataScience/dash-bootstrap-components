"""
Testing of callbacks in non-Python Tabs snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


def test_r_tabs_card(dashr):
    r_app = load_r_app((HERE.parent / "tabs" / "card.R"), "card")
    dashr.start_server(r_app)
    check_tabs_card_callbacks(dashr)


def test_jl_tabs_card(dashjl):
    jl_app = load_jl_app((HERE.parent / "tabs" / "card.jl"), "card")
    dashjl.start_server(jl_app)
    check_tabs_card_callbacks(dashjl)


def check_tabs_card_callbacks(runner):

    runner.driver.find_element_by_xpath(
        "//ul[@id='card-tabs']/li/a[.='Tab 2']"
    ).click()

    wait.until(
        lambda: runner.find_element("#card-content").text
        == "This is tab tab-2",
        timeout=4,
    )
