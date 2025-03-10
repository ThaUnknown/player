import type { DOMEvent } from 'maverick.js/std';

import type { MediaSliderElement } from './types';

export interface SliderEvents {
  'drag-start': SliderDragStartEvent;
  'drag-end': SliderDragEndEvent;
  'value-change': SliderValueChangeEvent;
  'drag-value-change': SliderDragValueChangeEvent;
  'pointer-value-change': SliderPointerValueChangeEvent;
}

export interface SliderEvent<Detail = unknown> extends DOMEvent<Detail> {
  target: MediaSliderElement;
}

/**
 * Fired when the user begins interacting with the slider and dragging the thumb. The event
 * detail contains the current value the drag is starting at.
 */
export interface SliderDragStartEvent extends SliderEvent<number> {
  trigger: PointerEvent | KeyboardEvent;
}

/**
 * Fired when the user stops dragging the slider thumb. The event detail contains the value
 * the drag is ending at.
 */
export interface SliderDragEndEvent extends SliderEvent<number> {
  trigger: PointerEvent | KeyboardEvent;
}

/**
 * Fired when the slider value changes. The event detail contains the current value.
 */
export interface SliderValueChangeEvent extends SliderEvent<number> {
  trigger?: PointerEvent | KeyboardEvent;
}

/**
 * Fired when the slider drag value changes. The drag value indicates the last slider value that
 * the user has dragged to. The event detail contains the value.
 */
export interface SliderDragValueChangeEvent extends SliderEvent<number> {
  trigger: PointerEvent | KeyboardEvent;
}

/**
 * Fired when the device pointer is inside the slider region and it's position changes. The
 * event detail contains the preview value. Do note, this includes touch, mouse, and keyboard
 * devices.
 */
export interface SliderPointerValueChangeEvent extends SliderEvent<number> {
  trigger: PointerEvent | KeyboardEvent;
}
