# Develop
This is demo NPM package.

## Get started from used Git and Docker
1. Install [Docker Community Edition](https://docs.docker.com/engine/installation/)
2. Clone a remote repository and go to folder
```
$ git clone https://github.com/Zef163/develop.git 
$ cd develop
```
3. Build Docker image
```
$ [sudo] docker build -t zef163/develop .
```
3. Run Docker container
```
$ [sudo] docker run --publish 3000:3000 --name zef163__demo --detach zef163/develop:latest
```
4. Open [http://localhost:3000/](http://localhost:3000/) in your browser for start use application

## Get started from used Node.js and NPM
1. Install [Node.js LTS Version](https://nodejs.org/en/download/)
2. Install NPM package and open application folder
```
$ npm install @zef163/demo
$ cd node_modules/@zef163/demo

```
3. Run command from commands list


## Commands list
`$ npm run start` - Run application in production mode ([http://localhost:3000/](http://localhost:3000/))

`$ npm run dev` - Run application in development mode

`$ npm run build` - Build application for production

`$ npm run test` - Run all tests