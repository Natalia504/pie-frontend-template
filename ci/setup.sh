#!/bin/bash -eux

function ListTools {
  echo "=== LIST TOOLS ==="
  echo -n "Node: " && node --version
  echo -n "YARN: " && yarn --version
}

function _remove_directory_if_exists {
  local _directory="${1}"
  if [ -d "./${_directory}" ]
  then
    rm -rf "./${_directory}"
  fi
}

function RemoveDirectories {
  local DIRECTORIES=(dist node_modules storybook-static)

  echo "=== REMOVE DIRECTORIES ==="
  for _directory in "${DIRECTORIES[@]}"
  do
    _remove_directory_if_exists "./${_directory}"
  done
}

function ClearCache {
  echo "=== CLEAR CACHE ==="
  yarn cache clean --force
}

function Install {
  echo "=== INSTALL ==="
  yarn install --frozen-lockfile
}

function Audit {
  echo "=== AUDIT ==="
  yarn audit:ci
}

ListTools
RemoveDirectories
ClearCache
Install
Audit
