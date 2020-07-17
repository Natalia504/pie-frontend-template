#!/bin/bash -eux

__DEFAULT_SEMVER__="0.0.0"
__DEFAULT_REGISTRY__="docker.cicd.pieinsurance.com"
__PATH__="frontend-template/ui"

SEMVER="${1:-${__DEFAULT_SEMVER__}}"
REGISTRY="${2:-${__DEFAULT_REGISTRY__}}"

IMAGE="${REGISTRY}/${__PATH__}:${SEMVER%+*}"

function DockerBuild {
  local _semver="${1}"
  local _image="${2}"

  echo "=== DOCKER BUILD ==="
  docker build \
    --build-arg VERSION="${_semver}" \
    -t "${_image}" \
    -f ./ci/frontend-template.dockerfile .
}

DockerBuild "${SEMVER}" "${IMAGE}"
