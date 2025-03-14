---
description: This component is used to render and display captions/subtitles.
---

## Usage

The `$tag:media-captions` component renders and displays captions/subtitles. It will be rendered
as an overlay when the player `viewType` is video, and as a simple captions box when the
type is audio.

{% code_preview name="usage" copyHighlight=true highlight="3" size="large" /%}

The captions component also be placed inside the `$tag:media-outlet` if the controls are outside
of the video container:

{% code_snippet name="external-controls" highlight="3" /%}

### Notes

- The [Text Tracks](/docs/player/core-concepts/text-tracks) guide covers how to add, remove, and
  manage text tracks.
- The player will dynamically switch to native captions when custom captions cannot be
  displayed (e.g., iOS Safari on iPhone).
- Rendering is handled by the [`vidstack/media-captions`](https://github.com/vidstack/media-captions)
  library, see the repo for more information.
- See the [motivation section](https://github.com/vidstack/media-captions#motivation) for why native
  captions should be avoided.
- Refer to the [formats section](https://github.com/vidstack/media-captions#vtt) for positioning
  regions and cues. Also see the [VTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)
  and [ASS](https://fileformats.fandom.com/wiki/SubStation_Alpha) specs.

## Styling

You can style cues, voices, timed cues (past/future), and regions like so:

```css
media-captions {
  /* simple CSS vars customization (defaults below) */
  --overlay-padding: 1%;
  --cue-color: white;
  --cue-bg-color: rgba(0, 0, 0, 0.8);
  --cue-font-size: calc(var(--overlay-height) / 100 * 5);
  --cue-line-height: calc(var(--cue-font-size) * 1.2);
  --cue-padding-x: calc(var(--cue-font-size) * 0.6);
  --cue-padding-y: calc(var(--cue-font-size) * 0.4);
}

media-captions [part='cue'] {
}

media-captions [part='cue'][data-id='...'] {
}

media-captions [part='voice'] {
}

media-captions [part='voice'][title='Joe'] {
}

media-captions [part='timed'] {
}

media-captions [part='timed'][data-past] {
}

media-captions [part='timed'][data-future] {
}

media-captions [part='region'] {
}

media-captions [part='region'][data-active] {
}

media-captions [part='region'][data-scroll='up'] {
}
```

## Avoiding Controls

```css
media-player:not([data-user-idle]) media-captions {
  /* Adjust 80px according to the height of your controls. */
  bottom: 80px;
  transition: bottom 0.3s;
}
```

Or, with Tailwind like so:

{% code_snippet name="tw-avoid-controls" /%}
