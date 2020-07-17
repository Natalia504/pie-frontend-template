#!/bin/bash -eux

__DEFAULT_SEMVER__="0.0.0"
__DEFAULT_REGISTRY__="docker.cicd.pieinsurance.com"
__PATH__="frontend-template/ui"

SEMVER="${1:-${__DEFAULT_SEMVER__}}"
REGISTRY="${2:-${__DEFAULT_REGISTRY__}}"
IMAGES=("${REGISTRY}/${__PATH__}:${SEMVER%+*}" "${REGISTRY}/${__PATH__}:latest")

function RemoveDockerImage {
  local _image="${1}"
  docker rmi "${_image}"
}

function RemoveDockerImages {
  local _images=("${@}")
  for _image in "${_images[@]}"
  do
    if [[ ! "$(docker images -q ${_image} 2> /dev/null)" == "" ]]
    then
      RemoveDockerImage "${_image}"
    fi
  done
}

RemoveDockerImages "${IMAGES[@]}"
