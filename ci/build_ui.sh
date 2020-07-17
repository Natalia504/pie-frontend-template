#!/bin/bash -eux

function PackageBuild {
  echo "=== Yarn BUILD ==="
  yarn build
}

PackageBuild

