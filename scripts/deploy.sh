#!/bin/bash

ssh root@ufi.mom.net.wurstsalat.cloud << EOF
  cd /opt/ufi/
  scripts/pull-restart-watch.sh
EOF
