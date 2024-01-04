# tribal-relations-client

![badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/gennadyterekhov/7571a4c577e80cce945baedaba153669/raw/test.json)


This is console and web app for playing Tribal Relations boardgame.  

## How to run  

to start console app:  
`npm run start-console-app`

to start web client:  
`npm run start-web-client`

to run tests:  
`npm run test`

## Dependency structure

```yaml
src/*:
    src/outer:
        src/ui:
            src/app:
                src/exception:
                src/domain:
                    src/domain/repository:
                        src/domain/enum:
```

`src/domain/enum` contains hardcoded game object names, enums don't depend on anything  
`src/domain/repository` contains all possible game objects  
`src/domain/entity` contains entities and their logic  


<hr>  


# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build

```

Locally preview production build:

```bash
npm run preview

```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
