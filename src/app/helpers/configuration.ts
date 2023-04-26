import { Configuration } from '../types';
import * as defaults from '../../defaults';

const INWORLD_CONFIGURATION_KEY = 'inworldConfiguration';

export const save = (values: Configuration) => {
  localStorage.setItem(INWORLD_CONFIGURATION_KEY, JSON.stringify(values));
};

export const get = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const character = urlParams.get('inworld_character');
  const scene = urlParams.get('inworld_scene');

  const configUrl: {
    character?: {
      name?: string;
    };
    scene?: {
      name?: string;
    };
  } = {};

  if (character) {
    configUrl.character = { name: character };
  }
  if (scene) {
    configUrl.scene = { name: scene };
  }

  let configFromLC = localStorage.getItem(INWORLD_CONFIGURATION_KEY);
  let configLC: Configuration | {} = configFromLC
    ? JSON.parse(configFromLC)
    : {};

  const config: Configuration = {
    ...defaults.configuration,
    ...configLC,
    ...configUrl,
  };

  return config;
};
