#!/bin/bash -eux

__DEFAULT_SEMVER__="0.0.0"

APIKEY="${1}"
SEMVER="${2:-${__DEFAULT_SEMVER__}}"
PROJECT_NAME="${3}"
HOST="${4}"

function DetermineReleaseChannel {
  local _semver="${1}"
  local _short="${_semver%+*}"
  local _split=(${_short//-/ })
  local _channel=""
  if [ "${#_split[@]}" == 1 ]
  then
    _channel="Default"
  elif [ "${_split[1]}" == "hotfix" ]
  then
    _channel="Hotfix"
  else
    _channel="Feature"
  fi
  echo "${_channel}"
}

function LookupProjectId {
  local _apikey="${1}"
  local _projectname="${2}"
  local _host="${3}"
  local _uri="https://${_host}/api/projects/${_projectname}"
  curl \
    --fail \
    --show-error \
    --silent \
    -X GET \
    -H  "accept: application/json" \
    -H  "X-Octopus-ApiKey: ${_apikey}" \
    "${_uri}" | jq '.Id' | xargs
}

function LookupChannelId {
  local _apikey="${1}"
  local _project="${2}"
  local _channelname="${3}"
  local _host="${4}"
  local _uri="https://${_host}/api/projects/${_project}/channels"
  curl \
    --fail \
    --show-error \
    --silent \
    -X GET \
    -H  "accept: application/json" \
    -H  "X-Octopus-ApiKey: ${_apikey}" \
    "${_uri}" | jq -r ".Items[] | select(.Name==\"${_channelname}\") | .Id" | xargs
}

function CreateRelease {
  local _apikey="${1}"
  local _version="${2}"
  local _host="${3}"
  local _project="${4}"
  local _channel="${5}"
  local _uri="https://${_host}/api/releases"

  local _id=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 16 ; echo '')
  local _date=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  local _commit=$(git rev-parse --verify HEAD)
  local _notes="git commit: ${_commit}"
  local _data="{\"Id\": \"${_id}\",  \"Assembled\": \"${_date}\",  \"ReleaseNotes\": \"${_notes}\",  \"ProjectId\": \"${_project}\",  \"ChannelId\": \"${_channel}\",  \"SelectedPackages\": [    {      \"StepName\": \"na\",      \"ActionName\": \"na\",      \"Version\": \"${_version}\"    }  ],  \"Version\": \"${_version}\"}"
  echo "=== Create Octopus Release ==="
  curl \
    -vvv \
    -X POST \
    "${_uri}" \
    -H "X-Octopus-ApiKey: ${_apikey}" \
    -H "Content-Type: application/json" \
    -H "accept: application/json" \
    -d "${_data}"
}

if [ "${SEMVER}" != "${__DEFAULT_SEMVER__}" ]
then
  CHANNEL=$(DetermineReleaseChannel "${SEMVER%+*}")
  PROJECTID=$(LookupProjectId "${APIKEY}" "${PROJECT_NAME}" "${HOST}")
  CHANNELID=$(LookupChannelId "${APIKEY}" "${PROJECTID}" "${CHANNEL}" "${HOST}")
  CreateRelease "${APIKEY}" "${SEMVER%+*}" "${HOST}" "${PROJECTID}" "${CHANNELID}"
else
  echo "don't publish developer version"
fi
