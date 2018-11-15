
import { WidgetModel } from '@jupyter-widgets/base';

import _ from 'underscore';

export type Target = [WidgetModel, string];

export type TargetChangeCallback = (model: WidgetModel, name: string, value: unknown) => void;

/**
 * Helper function for listening to child models in lists/dicts
 *
 * @param {any} model The parent model
 * @param {any} propNames The propetry names that are lists/dicts
 * @param {any} callback The callback to call when child changes
 */
export function listenTargets(model: WidgetModel, callback: TargetChangeCallback) {
  const targets = model.get('targets') || [];

  // listen to current target values
  for (let [targetModel, key] of targets) {
    model.listenTo(targetModel, `change:${key}`, (m: WidgetModel, value: unknown) => {
      callback(m, key, value);
    });
  }

  // make sure to (un)hook listeners when array changes
  model.on('change:targets', (model: WidgetModel, value: Target[]) => {
    const prev: Target[] = model.previous('targets') || [];
    const curr: Target[] = value || [];

    const added = _.difference(curr, prev);
    const removed = _.difference(prev, curr);

    for (let [targetModel, key] of added) {
      model.listenTo(targetModel, `change:${key}`, (m: WidgetModel, value: unknown) => {
        callback(m, key, value);
      });
    }
    for (let target of removed) {
      model.stopListening(target[0]);
    }
  });
}
