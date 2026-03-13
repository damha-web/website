#!/bin/bash
# 담하 웹사이트 NAS 배포 스크립트 (Mac에서 실행)
# 사용법: ./deploy-nas.sh
set -e

NAS_USER="coolk"
NAS_HOST="192.168.0.252"

echo "▶ NAS 재배포 시작 (git pull + docker build)..."
ssh "${NAS_USER}@${NAS_HOST}" "bash /volume1/docker/damha/deploy.sh"
echo "✓ 배포 완료"
