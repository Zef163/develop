# Develop
This is demo NPM package.

## Get started using Git
1. Clone a remote repository and go to folder
```console
$ git clone https://github.com/Zef163/develop.git 
$ cd develop
```

2. Install all dependencies from package.json
```console
$ npm install --only=prod
$ npm install --only=dev
```

3. Run command from list below

`$ npm run start` - Run application in production mode ([http://localhost:3000/](http://localhost:3000/))

`$ npm run dev` - Run application in development mode

`$ npm run build` - Build application for production

`$ npm run test` - Run all tests

`$ npm run eslint` - Check errors

## Get started using Docker
1. Install [Docker Community Edition](https://docs.docker.com/engine/installation/)

2. Install [Docker Compose](https://docs.docker.com/compose/install/)

3. Clone a remote repository and go to folder
```console
$ git clone https://github.com/Zef163/develop.git 
$ cd develop
```

4. Run Docker container
```console
$ [sudo] docker-compose up
```

5. Open [http://localhost:3000/](http://localhost:3000/) in your browser for start use application

## Get started using Node.js and NPM
1. Install [Node.js LTS Version](https://nodejs.org/en/download/)

2. Install NPM package and open application folder
```console
$ npm install @zef163/demo
$ cd node_modules/@zef163/demo
```

3. Run command from list below

`$ npm run start` - Run application in production mode ([http://localhost:3000/](http://localhost:3000/))

`$ npm run dev` - Run application in development mode

`$ npm run build` - Build application for production
