export interface RequestCounter {
  provider: Provider;
  map: Map;
  round: Round;
  player: Player;
  auth: Auth;
}

export interface Provider {
  name: string;
  appid: number;
  version: number;
  steamid: string;
  timestamp: number;
}

export interface Map {
  mode: string;
  name: string;
  phase: string;
  round: number;
  team_ct: Team;
  team_t: Team;
  num_matches_to_win_series: number;
  current_spectators: number;
  souvenirs_total: number;
}

export interface Team {
  score: number;
  consecutive_round_losses: number;
  timeouts_remaining: number;
  matches_won_this_series: number;
}

export interface Round {
  phase: string;
  bomb?: string;
  win_team?: string;
}

export interface Player {
  steamid: string;
  name: string;
  observer_slot: number;
  team: string;
  activity: string;
  state: State;
  match_stats: MatchStat;
}

export interface State {
  health: number;
  armor: number;
  helmet: boolean;
  flashed: number;
  smoked: number;
  burning: number;
  money: number;
  round_kills: number;
  round_killhs: number;
  equip_value: number;
}

export interface MatchStat {
  kills: number;
  assists: number;
  deaths: number;
  mvps: number;
  score: number;
}

export interface Auth {
  token: string;
}

// Lights

export interface State {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: number[];
  ct: number;
  alert: string;
  colormode: string;
  mode: string;
  reachable: boolean;
}

export interface Swupdate {
  state: string;
  lastinstall: Date;
}

export interface Ct {
  min: number;
  max: number;
}

export interface Control {
  mindimlevel: number;
  maxlumen: number;
  colorgamuttype: string;
  colorgamut: number[][];
  ct: Ct;
}

export interface Streaming {
  renderer: boolean;
  proxy: boolean;
}

export interface Capabilities {
  certified: boolean;
  control: Control;
  streaming: Streaming;
}

export interface Startup {
  mode: string;
  configured: boolean;
}

export interface Config {
  archetype: string;
  function: string;
  direction: string;
  startup: Startup;
}

export interface RawData {
  state: State;
  swupdate: Swupdate;
  type: string;
  name: string;
  modelid: string;
  manufacturername: string;
  productname: string;
  capabilities: Capabilities;
  config: Config;
  uniqueid: string;
  swversion: string;
  swconfigid: string;
  productid: string;
}

export interface Light {
  _rawData: RawData;
  _id: number;
  mappedColorGamut: string;
}

// Group
export interface State {
  all_on: boolean;
  any_on: boolean;
}

export interface State2 {
  presence: boolean;
  presence_all: boolean;
  lastupdated: Date;
}

export interface Presence {
  state: State2;
}

export interface Action {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: number[];
  ct: number;
  alert: string;
  colormode: string;
}

export interface Stream {
  proxymode: string;
  proxynode: string;
  active: boolean;
  owner?: any;
}

export interface Locations {
  1: number[];
  2: number[];
  3: number[];
  4: number[];
  6: number[];
}

export interface RawData {
  name: string;
  lights: string[];
  sensors: string[];
  type: string;
  state: State;
  presence: Presence;
  recycle: boolean;
  action: Action;
  class: string;
  stream: Stream;
  locations: Locations;
}

export interface LightGroup {
  _rawData: RawData;
  _id: number;
}
