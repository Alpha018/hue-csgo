# Hue - CS: GO

# Install and Usage

* You need to install dependencies with the command:
```bash
npm install
```

* Copy gamestate_integration_c4_hue.cfg to your CS:GO cfg directory.

```text
OS X: /Users/<username>/Library/Application Support/Steam/SteamApps/common/Counter-Strike Global Offensive/csgo/cfg
```

```text
Windows: C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\csgo\cfg
```

* Later you need run the code, i prefer:
```bash
npm run start:dev
```

When you run the APP, this search your Philips Hue IP automatic and you need select a room to change color of the lights.

* Final step:
```text
ENJOY :D
```
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

## execute
```bash
npm run start:dev
```

## build
```bash
npm run build
```

