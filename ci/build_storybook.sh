#!/bin/bash -eux

function StorybookBuild {
  echo "=== STORYBOOK BUILD ==="
  yarn run build-storybook \
    --no-dlls \
    --loglevel=verbose \
    -c storybook \
    -o storybook-static
}

StorybookBuild

