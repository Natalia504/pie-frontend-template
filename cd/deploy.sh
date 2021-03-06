#!/bin/bash -eux

CHOICE="${1}"
__CHOICES__=($(find ./cd -type d ! -name cd | xargs))

function _contains {
  local _match="${1}"
  local _array=("${@:2}")
  for _element in "${_array[@]}"
  do
    if [[ "${_element}" =~ "${_match}" ]]
    then
      return 0
    fi
  done
  return 1
}

if _contains "${CHOICE}" "${__CHOICES__[@]}"
then
  if [ -f "./${CHOICE}/deploy.sh" ]
  then
    ./${CHOICE}/deploy.sh
  else
    echo "(${CHOICE}) not supported... yet!"
    exit 1
  fi
else
  echo "(${CHOICE}) not a valid deployment strategy"
  exit 1
fi
