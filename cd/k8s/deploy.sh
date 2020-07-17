#!/bin/bash -eux

SERVICE="${1}"
SEMVER="${2}"
ENVIRONMENT="${3}"
NAMESPACE="${4,,}"
URL="${5,,}"

### This literally just exists in order to preserve the log order in
###   octopus. it is not required for correct operation
function WaitForLogs {
  sleep 0.5
}

function DeployIngress {
  local _service="${1}"
  local _namespace="${2}"
  local _url="${3}"
  echo "=== DEPLOYING INGRESS ==="
  sed -i -e "s/<SERVICE>/${_service}/g" ./cd/ingress.yaml
  sed -i -e "s/<NAMESPACE>/${_namespace}/g" ./cd/ingress.yaml
  sed -i -e "s/<URL>/${_url}/g" ./cd/ingress.yaml
  kubectl apply --namespace="${_namespace}" -f ./cd/ingress.yaml
}

function DeployService {
  local _service="${1}"
  local _namespace="${2}"
  echo "=== DEPLOYING SERVICE ==="
  sed -i -e "s/<SERVICE>/${_service}/g" ./cd/service.yaml
  sed -i -e "s/<NAMESPACE>/${_namespace}/g" ./cd/service.yaml
  kubectl apply -f ./cd/service.yaml
}

function DeployDeployment {
  local _service="${1}"
  local _environment="${2}"
  local _namespace="${3}"
  local _semver="${4}"
  local _url="${5}"
  echo "=== DEPLOYING DEPLOYMENT ==="
  sed -i -e "s/<SERVICE>/${_service}/g" ./cd/deployment.yaml
  sed -i -e "s/<NAMESPACE>/${_namespace}/g" ./cd/deployment.yaml
  sed -i -e "s/<VERSION>/${_semver}/g" ./cd/deployment.yaml
  sed -i -e "s/<URL>/${_url}/g" ./cd/deployment.yaml
  kubectl apply -f ./cd/deployment.yaml
}

function WaitForDeploymentToComplete {
  local _service="${1}"
  local _namespace="${2}"
  local _retry_delay="${3}"
  local _attempts=0
  echo "=== VERIFYING DEPLOYMENT ==="
  COMMAND="kubectl rollout status deployment/${_service} --namespace ${_namespace}"
  until ${COMMAND} || [ ${_attempts} -eq 60 ]; do
    _attempts=$((_attempts+1))
    sleep "${_retry_delay}"
  done
}

DeployIngress "${SERVICE}" "${NAMESPACE}" "${URL}"
WaitForLogs
DeployService "${SERVICE}" "${NAMESPACE}"
WaitForLogs
DeployDeployment "${SERVICE}" "${ENVIRONMENT}" "${NAMESPACE}" "${SEMVER}" "${URL}"
WaitForLogs
WaitForDeploymentToComplete "${SERVICE}" "${NAMESPACE}" 10
