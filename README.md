# Template app

# Version and dependencies

* install node version using a node version manager like nvm
```bash
brew install nvm
nvm install 10.16.0
```

* Install dependencies
```bash
npm install
```

## Docker usage
```bash
docker build -t [app-name] .
docker run -p 3000:3000 [app-name]
```

## Run test
```bash
npm run test
```

## execute
```bash
npm run start:dev
```

## build
```bash
npm run build
```

