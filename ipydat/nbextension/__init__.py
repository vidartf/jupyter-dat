#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Vidar Tonaas Fauske, Sebastian Koch.
# Distributed under the terms of the Modified BSD License.

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'nbextension/static',
        'dest': 'jupyter-dat',
        'require': 'jupyter-dat/extension'
    }]
