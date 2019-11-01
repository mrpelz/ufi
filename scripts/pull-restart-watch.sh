#!/bin/bash

git pull --rebase

/bin/systemctl restart ufi.service
echo "restart done"

/bin/journalctl -u ufi.service -fp notice
