// Copyright (c) Vidar Tonaas Fauske, Sebastian Koch.
// Distributed under the terms of the Modified BSD License.

import {
  WidgetModel, ISerializers, resolvePromisesDict, WidgetView
} from '@jupyter-widgets/base';

import {
  MODULE_NAME, MODULE_VERSION
} from './version';

import { listenTargets } from './helper';


function findCanvas(el: HTMLElement): HTMLCanvasElement | null {
  if (el.tagName === 'canvas') {
    return el as HTMLCanvasElement;
  }
  for (let i=0; i < el.children.length; ++i) {
    const candidate = el.children[i];
    if (candidate.tagName === 'canvas') {
      return candidate as HTMLCanvasElement;
    }
  }
  return null;
}



export class DatModel extends WidgetModel {
  defaults() {
    return {...super.defaults(),
      _model_name: DatModel.model_name,
      _model_module: DatModel.model_module,
      _model_module_version: DatModel.model_module_version,
      targets : null,
      view: null,
    };
  }

  initialize(attributes: any, options: any) {
    super.initialize(attributes, options);

    this.setupListeners();
  }

  setupListeners() {
    this.on('change', this.onChange, this);

    // listen to current target values
    listenTargets(this, this.onValueChange.bind(this));
  }

  onValueChange(model: WidgetModel, name: string, value: unknown) {
    // This triggers if the value of one or more targets change
    // TODO: Update the values
  }

  async onChange() {
    // Clear old guis
    for (let dat of this.guis) {
      // TODO: Dispose of old gui
      //dat.dispose() or similar
      throw new Error('TODO: Implement');
    }
    const views = await resolvePromisesDict(
      (this.get('view') as WidgetModel).views
    ) as {[key: string]: WidgetView};

    // Overlay GUI on top of each view
    for (let id of Object.keys(views)) {
      const view = views[id];
      const canvas = findCanvas(view.el);
      if (canvas !== null) {
        this.overlayDat(canvas);
      }
    }
  }

  /**
   * Build a dat.gui for the current targets
   */
  buildDat() {
    throw new Error('TODO: Implement');
  }

  /**
   * Overlay a dat.gui on top of a canvas element.
   */
  overlayDat(canvas: HTMLCanvasElement) {
    const dat = this.buildDat();
    // attach dat view to DOM and lay it out
    throw new Error('TODO: Implement');

    // store gui in collection:
    this.guis.push(dat);
  }

  guis: any[] = [];

  static serializers: ISerializers = {
      ...DatModel.serializers,
      // Add any extra serializers here
    }

  static model_name = 'ExampleModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
}
