# rflx.it <!-- omit in toc -->

A website for UniUPO exam of Metodologie Web course

---

## Summary <!-- omit in toc -->

- [Prerequisites](#prerequisites)
- [How to run](#how-to-run)
  - [Install dependencies](#install-dependencies)
  - [Set the .env file](#set-the-env-file)
  - [Create DB file](#create-db-file)
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

### Create DB file

Create a blank DB file

```bash
npm run db:reset
```

Seed data into DB

```bash
npm run db:seed
```

### Start up

```bash
npm start
```
