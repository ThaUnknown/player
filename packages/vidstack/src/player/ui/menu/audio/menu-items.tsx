import { effect } from 'maverick.js';
import { ComponentInstance, defineElement, type HTMLCustomElement } from 'maverick.js/element';

import { useMedia, type MediaContext } from '../../../core/api/context';
import { MenuItems, type MenuItemsAPI } from '../menu-items';
import { Radio } from '../radio/radio';
import { RadioGroup, type RadioGroupChangeEvent } from '../radio/radio-group';
import { renderRadioGroup } from '../radio/render';

declare global {
  interface MaverickElements {
    'media-audio-menu-items': MediaAudioMenuItemsElement;
  }
}

/**
 * This component displays menu radio options to the user so they can manually change the current
 * audio track.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/audio-menu}
 * @example
 * ```html
 * <media-menu>
 *   <media-audio-menu-button label="Audio"></media-audio-menu-button>
 *   <media-audio-menu-items></media-audio-menu-items>
 * </media-menu>
 * ```
 */
export class AudioMenuItems extends MenuItems<AudioMenuItemsAPI> {
  static override el = defineElement<AudioMenuItemsAPI>({
    tagName: 'media-audio-menu-items',
    props: {
      emptyLabel: 'Default',
      radioClass: null,
      radioGroupClass: null,
      radioCheckClass: null,
    },
  });

  static register = [RadioGroup, Radio];

  protected _media!: MediaContext;

  constructor(instance: ComponentInstance<AudioMenuItemsAPI>) {
    super(instance);
    this._media = useMedia();
  }

  protected override onConnect() {
    effect(this._watchControllerDisabled.bind(this));
    effect(this._watchHintText.bind(this));
  }

  protected _watchHintText() {
    const { emptyLabel } = this.$props,
      { audioTrack } = this._media.$store,
      track = audioTrack();

    this._menu._hint.set(track?.label ?? emptyLabel());
  }

  protected _watchControllerDisabled() {
    this._menu._disable(this._isDisabled());
  }

  protected _isDisabled() {
    const { audioTracks } = this._media.$store;
    return audioTracks().length === 0;
  }

  protected _onChange(event: RadioGroupChangeEvent) {
    if (this._isDisabled()) return;

    const radioGroup = event.target;

    const value = radioGroup.value,
      index = this._media.audioTracks
        .toArray()
        .findIndex((track) => track.label.toLowerCase() === value);

    if (index >= 0) this._media.remote.changeAudioTrack(index, event);
  }

  override render() {
    const { audioTrack, audioTracks } = this._media.$store,
      onChange = this._onChange.bind(this);

    const value = () => {
      const track = audioTrack();
      return track ? track.label.toLowerCase() : '';
    };

    const options = () =>
      audioTracks().map((track) => ({
        label: track.label,
        value: track.label.toLowerCase(),
      }));

    return renderRadioGroup({
      ...this.$props,
      value,
      options,
      onChange,
    });
  }
}

export interface AudioMenuItemsAPI extends MenuItemsAPI {
  props: AudioMenuItemsProps;
}

export interface AudioMenuItemsProps {
  /** The text to display when the are no audio tracks. */
  emptyLabel: string;
  radioGroupClass: string | null;
  radioClass: string | null;
  radioCheckClass: string | null;
}

export interface MediaAudioMenuItemsElement extends HTMLCustomElement<AudioMenuItems> {}
