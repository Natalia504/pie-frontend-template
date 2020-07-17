#!/bin/bash -eux

function get-major {
  local TAG=$(git tag -l | sort -r | head -1)
  if [ ! -z ${TAG} ]
  then
    local PARTS=(${TAG//./ })
    local MAJOR="${PARTS[0]}"
  fi
  echo "${MAJOR:-0}"
}

function get-minor {
  local TAG=$(git tag -l | sort -r | head -1)
  if [ ! -z ${TAG} ]
  then
    local PARTS=(${TAG//./ })
    local MINOR="${PARTS[1]}"
  fi
  echo "${MINOR:-0}"
}

function get-prerelease {
  function get-branch {
    local _input="${1}"
    local _regex="origin/"
    local _parts=(${_input//,/ })
    local _result=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 16)
    for _part in "${_parts[@]}"
    do
      if [[ "${_part}" =~ "${_regex}" && ! "${_part}" =~ "HEAD" && ! "${_part}" =~ "tag" ]]
      then
        _result="${_part}"
      fi
    done
    echo "${_result}"
  }

  local _gitshow=$(git show -s --pretty=%D HEAD)
  local REF=$(get-branch "${_gitshow}")
  local PARTS=(${REF//// })
  if [ ! -z "${PARTS}" ]
  then
    if [ "${PARTS[-1]}" != "master" ]
    then
      local RESULT="-${PARTS[-1]}"
      RESULT=${RESULT//[_]/-}
    fi
  else
    local RESULT="-merge"
  fi
  echo "${RESULT:-}"
}

function get-metadata {
  local HASH=$(git log --pretty=format:'%h' -n 1)
  echo "+${HASH}"
}

function get-patch {
  local PATCH=$(git rev-list --count HEAD)
  echo "${PATCH:-0}"
}

MAJOR=$(get-major)
MINOR=$(get-minor)
PATCH=$(get-patch)
PRERELEASE=$(get-prerelease)
METADATA=$(get-metadata)

echo "${MAJOR}.${MINOR}.${PATCH}${PRERELEASE}${METADATA}"
