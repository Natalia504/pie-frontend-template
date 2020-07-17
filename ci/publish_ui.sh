#!/bin/bash -eux

__DEFAULT_SEMVER__="0.0.0"
__DEFAULT_REGISTRY__="docker.cicd.pieinsurance.com"
__PATH__="frontend-template/ui"

SEMVER="${1:-${__DEFAULT_SEMVER__}}"
REGISTRY="${2:-${__DEFAULT_REGISTRY__}}"
IMAGE="${REGISTRY}/${__PATH__}:${SEMVER%+*}"
#LATEST="${REGISTRY}/${__PATH__}:latest"

function DockerTagLatest {
  local _image="${1}"
  local _latest="${2}"
  echo "=== DOCKER TAG LATEST ==="
  docker tag "${_image}" "${_latest}"
}

function DockerPush {
  local _image="${1}"
#  local _latest="${2}"
  echo "=== DOCKER PUSH ==="
  docker push "${_image}"
#  docker push "${_latest}"

  docker rmi "${_image}"
#  docker rmi "${_latest}"
}

#DockerTagLatest ${IMAGE} ${LATEST}
DockerPush ${IMAGE} #${LATEST}
