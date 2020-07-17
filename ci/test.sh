#!/bin/bash -eux

function UnitTest {
  echo "=== UNIT TESTS ==="
  yarn test -- --coverage --watchAll=false
}

UnitTest
