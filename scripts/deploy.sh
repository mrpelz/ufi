#!/bin/bash

ssh root@dufi.mom.net.wurstsalat.cloud << EOF
  cd /opt/ufi/
  scripts/pull-restart-watch.sh
EOF
