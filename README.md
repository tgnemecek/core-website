# Core Coaching & Consulting

## Version

Released: 2.0

## About

This repo contains a website that is built with Typescript, [Gatsby](https://www.gatsbyjs.org/), and [Netlify CMS](https://www.netlifycms.org), using Lambda functions to communicate to external apis: Zoom for scheduling meetings and Stripe for payments.

**[Live Link](https://corecoachingconsulting.com/)**

It follows the [JAMstack architecture](https://jamstack.org) by using Git as a single source of truth, and [Netlify](https://www.netlify.com) for continuous deployment, and CDN distribution.

## How to Run

`yarn`
`yarn start`
`cd lambda`
`tsc -w` (for lambda functions type checking)

## Releases

When merging to master, change config.ts:

```

config.backend.branch === 'master'

```

## Prerequisites

- Node (I recommend using v8.2.0 or higher)

- [Gatsby CLI](https://www.gatsbyjs.org/docs/)

- [Netlify CLI](https://github.com/netlify/cli) Core Coaching & Consulting
