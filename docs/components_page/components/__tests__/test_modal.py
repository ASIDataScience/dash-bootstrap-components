"""
Testing of callbacks in non-Python Modal snippets.
"""
from pathlib import Path

import dash.testing.wait as wait

from .helpers import load_jl_app, load_r_app

HERE = Path(__file__).parent


def test_r_modal_simple(dashr):
    r_app = load_r_app((HERE.parent / "modal" / "simple.R"), "modal")
    dashr.start_server(r_app)
    check_modal_simple_callbacks(dashr)


def test_jl_modal_simple(dashjl):
    jl_app = load_jl_app((HERE.parent / "modal" / "simple.jl"), "modal")
    dashjl.start_server(jl_app)
    check_modal_simple_callbacks(dashjl)


def check_modal_simple_callbacks(runner):
    runner.find_element("#open").click()
    wait.until(
        lambda: len(runner.find_elements(".modal-content")) != 0,
        timeout=4,
    )

    runner.find_element("#close").click()
    wait.until(
        lambda: len(runner.find_elements(".modal-content")) == 0,
        timeout=4,
    )


# ------------------------------


def test_r_modal_size(dashr):
    r_app = load_r_app((HERE.parent / "modal" / "size.R"), "modal")
    dashr.start_server(r_app)
    check_modal_size_callbacks(dashr)


def test_jl_modal_size(dashjl):
    jl_app = load_jl_app((HERE.parent / "modal" / "size.jl"), "modal")
    dashjl.start_server(jl_app)
    check_modal_size_callbacks(dashjl)


def check_modal_size_callbacks(runner):
    runner.find_element("#open-sm").click()
    wait.until(
        lambda: len(runner.find_elements(".modal-content")) != 0,
        timeout=4,
    )

    runner.find_element("#close-sm").click()
    wait.until(
        lambda: len(runner.find_elements(".modal-content")) == 0,
        timeout=4,
    )

    runner.find_element("#open-lg").click()
    wait.until(
        lambda: len(runner.find_elements(".modal-content")) != 0,
        timeout=4,
    )

    runner.find_element("#close-lg").click()
    wait.until(
        lambda: len(runner.find_elements(".modal-content")) == 0,
        timeout=4,
    )

    runner.find_element("#open-xl").click()
    wait.until(
        lambda: len(runner.find_elements(".modal-content")) != 0,
        timeout=4,
    )

    runner.find_element("#close-xl").click()
    wait.until(
        lambda: len(runner.find_elements(".modal-content")) == 0,
        timeout=4,
    )


# ------------------------------


def test_r_modal_backdrop(dashr):
    r_app = load_r_app((HERE.parent / "modal" / "backdrop.R"), "modal")
    dashr.start_server(r_app)
    check_modal_backdrop_callbacks(dashr)


def test_jl_modal_backdrop(dashjl):
    jl_app = load_jl_app((HERE.parent / "modal" / "backdrop.jl"), "modal")
    dashjl.start_server(jl_app)
    check_modal_backdrop_callbacks(dashjl)


def check_modal_backdrop_callbacks(runner):
    runner.find_element("#open-backdrop").click()
    wait.until(
        lambda: len(runner.find_elements(".modal-content")) != 0,
        timeout=4,
    )

    runner.find_element("#close-backdrop").click()
    wait.until(
        lambda: len(runner.find_elements(".modal-content")) == 0,
        timeout=4,
    )


# ------------------------------


def test_r_modal_scrollable(dashr):
    r_app = load_r_app((HERE.parent / "modal" / "scrollable.R"), "modal")
    dashr.start_server(r_app)
    check_modal_scrollable_callbacks(dashr)


def test_jl_modal_scrollable(dashjl):
    jl_app = load_jl_app((HERE.parent / "modal" / "scrollable.jl"), "modal")
    dashjl.start_server(jl_app)
    check_modal_scrollable_callbacks(dashjl)


def check_modal_scrollable_callbacks(runner):
    import time

    time.sleep(3)
    runner.find_element("#open-scroll").click()
    wait.until(
        lambda: len(runner.find_elements(".modal-content")) != 0,
        timeout=4,
    )

    runner.find_element("#close-scroll").click()
    wait.until(
        lambda: len(runner.find_elements(".modal-content")) == 0,
        timeout=4,
    )

    runner.find_element("#open-body-scroll").click()
    wait.until(
        lambda: len(runner.find_elements(".modal-content")) != 0,
        timeout=4,
    )

    runner.find_element("#close-body-scroll").click()
    wait.until(
        lambda: len(runner.find_elements(".modal-content")) == 0,
        timeout=4,
    )


# ------------------------------


def test_r_modal_centered(dashr):
    r_app = load_r_app((HERE.parent / "modal" / "centered.R"), "modal")
    dashr.start_server(r_app)
    check_modal_centered_callbacks(dashr)


def test_jl_modal_centered(dashjl):
    jl_app = load_jl_app((HERE.parent / "modal" / "centered.jl"), "modal")
    dashjl.start_server(jl_app)
    check_modal_centered_callbacks(dashjl)


def check_modal_centered_callbacks(runner):
    runner.find_element("#open-centered").click()
    wait.until(
        lambda: len(runner.find_elements(".modal-content")) != 0,
        timeout=4,
    )

    runner.find_element("#close-centered").click()
    wait.until(
        lambda: len(runner.find_elements(".modal-content")) == 0,
        timeout=4,
    )
