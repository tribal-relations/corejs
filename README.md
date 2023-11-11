# tribal-relations-client

![badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/gennadyterekhov/7571a4c577e80cce945baedaba153669/raw/test.json)


This is console and web app for playing Tribal Relations boardgame.  

to start console app:  
`npm start-console-app`


## Dependency structure

`src/* `---> `src/outer` ---> `src/ui` ---> `src/app` ---> `src/domain` ---> `src/domain/repository` ---> `src/domain/enum`  

`src/domain/enum` contains hardcoded game object names, enums don't depend on anything  
`src/domain/repository` contains all possible game objects  
`src/domain/entity` contains entities and their logic  