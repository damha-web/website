# Synology NAS Deployment Notes

## Purpose

This project is a static React + Vite site. The active deployment method is:

1. Build locally with `vite build`
2. Upload the generated `dist` contents to Synology NAS with `scp`
3. Serve the uploaded files from Synology Web Station under a subpath

This note is written so the same pattern can be reused in other projects.

## What This Project Is Doing Now

The current deployment behavior is defined by these files:

- `deploy.ps1`: builds the app and uploads `dist/*` to `/volume1/web/pricelist/`
- `vite.config.js`: sets `base: '/pricelist/'`

That combination means the app is no longer being deployed as a Dockerized `nginx` app on port `8080`.
It is being published as static files under Synology's web root so it can be reached as a subpath such as:

- `https://your-domain/pricelist/`

## Evidence Found In This Repo

### Active configuration

- `deploy.ps1` runs `npm run build` and then uploads `dist/*` to `coolk@192.168.0.252:/volume1/web/pricelist/`
- `deploy.ps1` uses `scp -O`, which is a legacy SCP mode often needed when Synology's SFTP/SCP behavior is inconsistent
- `vite.config.js` sets `base: '/pricelist/'`, which is required when the app is served from a subfolder instead of the domain root
- `dist/index.html` references assets with `/pricelist/...`, confirming the build output matches the Web Station subpath model

### Historical configuration

The README still documents an older deployment model:

- Docker container `pricelist-web`
- Host port `8080`
- NAS path `/volume1/docker/pricelist`
- External router forwarding `18080 -> 8080`

That older model conflicts with the current script and the latest commit history.

### Why it changed

The latest commit message explains the reason:

- reverse proxy traffic for the full domain was being sent to `192.168.0.252:8080`
- that target was not the correct active service
- result: `502 Bad Gateway`
- fix: remove the reverse proxy rule and standardize deployment to the Web Station static folder

In short: Docker + reverse proxy introduced routing confusion, and the project was simplified to static hosting under Web Station.

## Current Deployment Flow

### 1. Local build

On the development machine:

```powershell
npm install
npm run build
```

Output goes to `dist/`.

### 2. Upload to NAS

This project uploads the built files directly into Synology's web-served directory:

```powershell
scp -O -r dist/* user@nas-host:/volume1/web/pricelist/
```

Important details:

- upload the contents of `dist`, not the `dist` folder itself
- the destination folder name should match the URL subpath
- if the folder does not exist yet, create it first

Example:

```bash
ssh user@nas-host "mkdir -p /volume1/web/pricelist"
```

### 3. Synology serves the files

The NAS is expected to serve `/volume1/web` through Web Station.
If the project is copied to:

```text
/volume1/web/pricelist
```

then the site is expected at:

```text
https://your-domain/pricelist/
```

### 4. Frontend must know it lives in a subpath

For Vite projects, set:

```js
export default defineConfig({
  base: '/pricelist/',
})
```

If this is wrong, the app will usually load a blank page or fail to load JS/CSS because it will request assets from `/assets/...` instead of `/pricelist/assets/...`.

## How To Reuse This For Another Project

Assume the new project name is `dashboard`.

### Vite

Set:

```js
export default defineConfig({
  base: '/dashboard/',
})
```

### Synology target folder

Upload to:

```text
/volume1/web/dashboard
```

### Resulting URL

Serve it at:

```text
https://your-domain/dashboard/
```

### Example deployment script

```powershell
npm run build
if ($LASTEXITCODE -ne 0) { exit 1 }

scp -O -r dist/* user@nas-host:/volume1/web/dashboard/
if ($LASTEXITCODE -ne 0) { exit 1 }
```

## Synology NAS Setup Checklist

For another project, verify this checklist on DSM:

1. Web Station is installed and enabled
2. The NAS user used for deployment has permission to write to `/volume1/web/<project>`
3. The target folder exists or can be created through SSH
4. The domain or DDNS entry points to the NAS
5. If using HTTPS, the certificate is bound to the domain in DSM
6. If exposing the site externally, router/NAT rules are configured for `80` and `443`
7. If using a reverse proxy, the proxy target must be the real active Web Station endpoint, not an old container port

## When To Use This Pattern

Use this pattern when:

- the frontend is a static SPA or static site
- no backend runtime is required on the NAS
- you want the simplest possible Synology deployment
- multiple projects can live under one domain as subpaths

Examples:

- `https://your-domain/pricelist/`
- `https://your-domain/dashboard/`
- `https://your-domain/landing/`

## When Not To Use This Pattern

Do not use this exact pattern when:

- the app needs server-side rendering
- the app needs an API server on the same deployment target
- websocket services or background workers are required
- the app must run at the domain root and cannot tolerate a subpath

In those cases, Docker, Container Manager, or a separate reverse proxy layout may be more appropriate.

## Common Failure Modes

### 1. 502 Bad Gateway

Usually caused by:

- reverse proxy still pointing to an old container port
- proxy target using a service that is no longer running
- mismatch between Web Station hosting and reverse proxy routing

### 2. Blank page or broken styling

Usually caused by:

- wrong Vite `base`
- asset URLs built for `/` while the real path is `/project-name/`

### 3. Files upload successfully but site looks old

Usually caused by:

- browser cache
- CDN or proxy cache
- uploading into the wrong NAS folder
- serving a different folder than the one updated by `scp`

### 4. SCP upload fails on Synology

This repo explicitly uses:

```bash
scp -O -r dist/* user@nas-host:/volume1/web/project/
```

The `-O` flag forces legacy SCP mode and can avoid protocol/path issues seen on some Synology setups.

## Recommended Improvements Before Reusing

### 1. Remove secrets from scripts

This repo's deployment script includes a plaintext password reminder in output.
Do not copy that habit into another project.
Prefer:

- SSH keys
- a dedicated deployment user
- no passwords written in scripts, logs, or comments

### 2. Update outdated README instructions

This repo contains both:

- old Docker/port-based deployment notes
- new Web Station/static deployment behavior

For reuse, keep only one active deployment method in the documentation.

### 3. Parameterize the script

A reusable deployment script should externalize:

- NAS host
- NAS user
- target folder
- public subpath

Example variables:

```powershell
$NasHost = "nas-host"
$NasUser = "deploy-user"
$ProjectName = "dashboard"
$TargetPath = "/volume1/web/$ProjectName/"
```

## Reusable Template

For a new Vite static project on Synology NAS:

1. Create `/volume1/web/<project-name>` on the NAS
2. Set Vite `base` to `/<project-name>/`
3. Build locally with `npm run build`
4. Upload `dist/*` to `/volume1/web/<project-name>/`
5. Confirm the site opens at `https://your-domain/<project-name>/`
6. If it fails, check asset paths first, then proxy rules

## Project-Specific Summary

For this repository specifically, the correct current understanding is:

- active deploy target: `/volume1/web/pricelist/`
- active public subpath: `/pricelist/`
- active deployment method: local build + SCP upload + Web Station static hosting
- old method kept only in README: Docker container on port `8080`

If this note is reused in another project, the main values to change are only:

- project folder name
- Vite `base`
- NAS SSH host and user
- domain and certificate binding
