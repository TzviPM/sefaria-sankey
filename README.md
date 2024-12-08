# sefaria-sankey

This project contains a single node script to generate the input to [https://sankeymatic.com/build/](https://sankeymatic.com/build/) based on data from the [sefaria.org](sefaria.org) API. You can see a sample png file in [sample.png](./sample.png).

## Setup

```bash
npx api install "@sefaria/v1.0#198yma17jkm4fjj61i"
npm install
```

## Generating data for sankeymatic

```bash
npm run start
```

## Generating a diagram

Simply copy and paste the output into the input field in [https://sankeymatic.com/build/](https://sankeymatic.com/build/).