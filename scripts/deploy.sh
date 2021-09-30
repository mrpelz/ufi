#!/bin/bash

ssh root@ufi.mgmt.wurstsalat.cloud << EOF
  cd /opt/ufi/
  scripts/pull-restart-watch.sh
EOF
