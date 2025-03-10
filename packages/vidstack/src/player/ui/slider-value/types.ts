import type { HTMLCustomElement } from 'maverick.js/element';

export interface SliderValueProps {
  /**
   * Whether to use the slider's current value, or pointer value.
   */
  type: 'current' | 'pointer';
  /**
   * Determines how the value is formatted.
   */
  format: 'percent' | 'time' | undefined;
  /**
   * Whether the time should always show the hours unit, even if the time is less than
   * 1 hour. Only available if the `format` attribute is set to `time`.
   *
   * @example `20:30 -> 0:20:35`
   */
  showHours: boolean;
  /**
   * Whether the hours unit should be padded with zeroes to a length of 2. Only available if
   * the `format` attribute is set to `time`.
   *
   * @example `1:20:03 -> 01:20:03`
   */
  padHours: boolean;
  /**
   * Whether the minutes unit should be padded with zeroes to a length of 2. Only available if
   * the `format` attribute is set to `time`.
   *
   * @example `5:22 -> 05:22`
   */
  padMinutes: boolean;
  /**
   * Round the value when formatted as a percentage to the given number of decimal places. Only
   * available if `format` attribute is `percent`.
   */
  decimalPlaces: number;
}

/**
 * Outputs the current slider value as text.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/slider-value}
 * @example
 * ```html
 * <media-time-slider>
 *   <media-slider-value
 *     type="pointer"
 *     format="time"
 *     slot="preview"
 *   ></media-slider-value>
 * </media-time-slider>
 * ```
 * @example
 * ```html
 * <media-slider-value
 *   type="current"
 * ></media-slider-value>
 * ```
 * @example
 * ```html
 * <media-slider-value
 *   format="time"
 *   show-hours
 *   pad-hours
 * ></media-slider-value>
 * ```
 * @example
 * ```html
 * <media-slider-value
 *   format="percent"
 *   decimal-places="2"
 * ></media-slider-value>
 * ```
 */
export interface MediaSliderValueElement extends HTMLCustomElement<SliderValueProps> {}
