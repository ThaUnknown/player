import { defineElement, type HTMLCustomElement } from 'maverick.js/element';
import { closedCaptionsOnPaths, closedCaptionsPaths } from 'media-icons';

import { Icon } from '../../../icons/icon';
import { setARIALabel } from '../../../utils/dom';
import { useMedia, type MediaContext } from '../../core/api/context';
import type { MediaKeyShortcut } from '../../core/keyboard/types';
import { isTrackCaptionKind } from '../../core/tracks/text/text-track';
import { ToggleButton, toggleButtonProps, type ToggleButtonAPI } from './toggle-button';

declare global {
  interface MaverickElements {
    'media-caption-button': MediaCaptionButtonElement;
  }
}

/**
 * A button for toggling the showing state of the captions.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/buttons/caption-button}
 * @slot on - Used to override the default caption on icon.
 * @slot off - Used to override the default caption off icon.
 * @slot tooltip-top-left - Used to place a tooltip above the button in the left corner.
 * @slot tooltip-top-center - Used to place a tooltip above the button in the center.
 * @slot tooltip-top-right - Used to place a tooltip above the button in the right corner.
 * @slot tooltip-bottom-left - Used to place a tooltip below the button in the left corner.
 * @slot tooltip-bottom-center - Used to place a tooltip below the button in the center.
 * @slot tooltip-bottom-right - Used to place a tooltip below the button in the right corner.
 * @example
 * ```html
 * <media-caption-button></media-caption-button>
 * ```
 */
export class CaptionButton extends ToggleButton {
  static override el = defineElement<CaptionButtonAPI>({
    tagName: 'media-caption-button',
    props: toggleButtonProps,
  });

  protected _media!: MediaContext;
  protected override _keyShortcut: MediaKeyShortcut = 'toggleCaptions';

  protected override onAttach(el: HTMLElement): void {
    this._media = useMedia();
    this._pressed = this._isPressed.bind(this);
    super.onAttach(el);

    setARIALabel(el, this._getLabel.bind(this));

    this.setAttributes({
      'data-hidden': this._isHidden.bind(this),
    });
  }

  protected override _onPress(event: Event) {
    this._media.remote.toggleCaptions(event);
  }

  protected _isPressed() {
    const { textTrack } = this._media.$store,
      track = textTrack();
    return !!track && isTrackCaptionKind(track);
  }

  protected _isHidden() {
    const { textTracks } = this._media.$store;
    return textTracks().filter(isTrackCaptionKind).length == 0;
  }

  protected _getLabel() {
    const { textTrack } = this._media.$store;
    return textTrack() ? 'Closed-Captions Off' : 'Closed-Captions On';
  }

  override render() {
    return (
      <>
        <Icon paths={closedCaptionsOnPaths} slot="on" />
        <Icon paths={closedCaptionsPaths} slot="off" />
      </>
    );
  }
}

export interface CaptionButtonAPI extends ToggleButtonAPI {}

export interface MediaCaptionButtonElement extends HTMLCustomElement<CaptionButton> {}
