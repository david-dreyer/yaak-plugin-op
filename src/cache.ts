import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 * 60 });

export function writeEntry(ref: string, value: string | number) {
  return cache.set(ref, value);
}

export function getEntry(ref: string) : string | undefined {
  return cache.get(ref);
}

export function opCliInstalled() {
  return cache.get('opCliInstalled');
}

export function writeOpCliInstalled(installed: boolean) {
  return cache.set('opCliInstalled', installed);
}

export function setStdTTL(ttl: number) {
  cache.options.stdTTL = ttl;
}
