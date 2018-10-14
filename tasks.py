
import os
import tempfile
from subprocess import call
from pathlib import Path

from termcolor import cprint
from invoke import task, run as invoke_run
import semver

VERSION_TEMPLATE = """
__version__ = "{version_string}"
"""

RELEASE_NOTES_TEMPLATE = '''# Write the release notes here
# Delete the version title to cancel
Version {version_string}
{underline}
'''

HERE = Path(__file__).parent

DASH_BOOTSTRAP_DIR = HERE / "dash_bootstrap_components"
JS_DIR = HERE / "src"


@task(help={'version': 'Version number to release'})
def prerelease(ctx, version):
    '''
    Release a pre-release version
    Running this task will:
     - Bump the version number
     - Push a release to pypi and npm
    '''
    info(f"Releasing version {version} as prerelease")
    build_publish(version)


@task(help={'version': 'Version number to release'})
def release(ctx, version):
    '''
    Release a new version
    Running this task will:
     - Prompt the user for a changelog and write it to
       the release notes
     - Commit the release notes
     - Bump the version number
     - Push a release to pypi and npm
    '''
    info(f"Releasing version {version} as full release")
    release_notes_lines = get_release_notes(version)

    if release_notes_lines is None:
        error('No release notes: exiting')
        exit()

    info("Writing release notes to changelog.tmp")
    with open("changelog.tmp", "w") as f:
        f.writelines(release_notes_lines)

    # TODO when we have release notes, these should be amended here

    build_publish(version)


def build_publish(version):
    info("Cleaning")
    clean()
    info("Updating versions")
    set_pyversion(version)
    set_jsversion(version)
    info("Building JavaScript components")
    build_js()
    info("Building and uploading Python source distribution")
    release_python_sdist()


def clean():
    paths_to_clean = [
        "src/node_modules",
        "dash_bootstrap_components/bundle.js",
        "dash_bootstrap_components/metadata.json",
        "dist/",
        "lib/"
    ]
    for path in paths_to_clean:
        run(f"rm -rf {path}")


def build_js():
    os.chdir(JS_DIR)
    try:
        run("npm install")
    finally:
        os.chdir(HERE)


def release_python_sdist():
    run("rm -f dist/*")
    run("python setup.py sdist")
    invoke_run("twine upload dist/*")


def set_pyversion(version):
    version = normalize_version(version)
    version_path = DASH_BOOTSTRAP_DIR / "_version.py"
    with version_path.open("w") as f:
        f.write(VERSION_TEMPLATE.format(version_string=version))


def set_jsversion(version):
    version = normalize_version(version)
    package_json_path = HERE / "package.json"
    with package_json_path.open() as f:
        package_json = f.readlines()
    for iline, line in enumerate(package_json):
        if '"version"' in line:
            package_json[iline] = '  "version": "{}",\n'.format(version)
    with open(package_json_path, 'w') as f:
        f.writelines(package_json)


def get_release_notes(version):
    version = normalize_version(version)
    underline = '=' * len('Version {}'.format(version))
    initial_message = RELEASE_NOTES_TEMPLATE.format(
        version_string=version, underline=underline)
    lines = open_editor(initial_message)
    non_commented_lines = [line for line in lines if not line.startswith('#')]
    changelog = ''.join(non_commented_lines)
    if version in changelog:
        if not non_commented_lines[-1].isspace():
            non_commented_lines.append('\n')
        return non_commented_lines
    else:
        return None


def open_editor(initial_message):
    editor = os.environ.get('EDITOR', 'vim')
    tmp = tempfile.NamedTemporaryFile(suffix='.tmp')
    fname = tmp.name

    with open(fname, 'w') as f:
        f.write(initial_message)
        f.flush()

    call([editor, fname], close_fds=True)

    with open(fname, 'r') as f:
        lines = f.readlines()

    return lines


def normalize_version(version):
    version_info = semver.parse_version_info(version)
    version_string = str(version_info)
    return version_string


def run(command, **kwargs):
    result = invoke_run(command, hide=True, warn=True, **kwargs)
    if result.exited != 0:
        error("Error running {}".format(command))
        print(result.stdout)
        print()
        print(result.stderr)
        exit(result.exited)


def error(text):
    cprint(text, "red")


def info(text):
    print(text)