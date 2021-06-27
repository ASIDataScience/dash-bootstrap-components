# dash-bootstrap-components examples

This directory contains Python, R, and Julia examples organised into `python/`,
`r/`, and `julia/` respectively. In each sub-directory there are three further
sub-directories: `advanced-component-usage/`, `gallery/`, and `templates/`.

- `advanced-component-usage/`: More detailed usage patterns of various
components than there is space for in the documentation.
- `gallery/`: A collection of example apps.
- `templates/`: Templates with various different layouts and minimal content
that can be used as a starting point for new apps.

If you think something is missing here or would like more examples of something
then please
[raise an issue](https://github.com/facultyai/dash-bootstrap-components/issues/new?template=feature.md).

## How to run the examples

### Python

Install the Python requirements from the file using

```
pip install -r requirements.txt
```

Then run the file using 

```
python app.py
```

### Julia

Install the Julia requirements from the file within Julia using:

```julia
pkg> activate .
pkg> instantiate
```

Once the requirements are installed, run the file from Julia using:

```julia
julia> include("julia_file_name.jl")
```

Or you can run from the terminal using:

```
julia --project=. julia_file_name.jl
```