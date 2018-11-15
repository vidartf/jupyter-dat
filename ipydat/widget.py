#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Vidar Tonaas Fauske, Sebastian Koch.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""

from ipywidgets import Widget, DOMWidget
from ipywidgets.widgets.widget_link import WidgetTraitTuple
from ipywidgets.widgets.trait_types import TypedTuple
from traitlets import Unicode, TraitError, TraitType, Instance
from ._frontend import module_name, module_version



class DatWidget(Widget):
    """TODO: Add docstring here
    """
    _model_name = Unicode('DatModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)

    targets = TypedTuple(WidgetTraitTuple(), allow_none=True).tag(sync=True)

    view = Instance(DOMWidget).tag(sync=True)
