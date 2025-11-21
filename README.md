# rflx.it <!-- omit in toc -->

A website for UniUPO exam of Metodologie Web course

---

## Summary <!-- omit in toc -->

- [Prerequisites](#prerequisites)
- [How to run](#how-to-run)
  - [Install dependencies](#install-dependencies)
  - [Set the .env file](#set-the-env-file)
  - [Generate DB file](#generate-db-file)
    - [(OPTIONAL) Seed DB file with example values](#optional-seed-db-file-with-example-values)
  - [Download assets files](#download-assets-files)
    - [Bootstrap](#bootstrap)
    - [EJS](#ejs)
    - [Page.js](#pagejs)
  - [Start up](#start-up)

---

## Prerequisites

- latest LTS of [Node.js](https://nodejs.org/en/download) (v24.11.0)

---

## How to run

### Install dependencies

Recreate node modules directory with exact version listed in `package-lock.json`

```bash
npm ci
```

### Set the .env file

Create the .env file following .env.example

### Generate DB file

Create a blank DB file

```bash
npm run db:reset
```

#### (OPTIONAL) Seed DB file with example values

Seed data into DB

```bash
npm run db:seed
```

### Download assets files

Create containing directory

```bash
mkdir -p ./public/assets
```

#### Bootstrap

```bash
curl https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css -L -o ./public/assets/bootstrap.min.css
```

```bash
curl https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js -L -o ./public/assets/bootstrap.bundle.min.js
```

#### EJS

```bash
curl https://github.com/mde/ejs/releases/download/v3.1.10/ejs.min.js -L -o ./public/assets/ejs.min.js
```

#### Page.js

```bash
curl https://cdn.jsdelivr.net/gh/visionmedia/page.js@master/page.min.js -L -o ./public/assets/page.min.js
```

### Start up

```bash
npm start
```
