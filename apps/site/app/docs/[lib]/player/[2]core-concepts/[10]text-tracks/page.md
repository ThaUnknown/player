---
title: Text Tracks
description: Configuring text tracks with Vidstack Player.
---

# {% $frontmatter.title %}

In this section, we'll look at how text tracks can be tracked and configured with Vidstack
Player.

## Formats

The [`vidstack/media-captions`](https://github.com/vidstack/media-captions) library handles
loading, parsing, and rendering captions inside of Vidstack Player. The following caption formats
are supported: [VTT](https://github.com/vidstack/media-captions#vtt),
[SRT](https://github.com/vidstack/media-captions#srt), and [SSA/ASS](https://github.com/vidstack/media-captions#ssaass).
See the links provided for more information and any limitations. Do note, all caption formats are
mapped to VTT which is extended to support custom styles.

Browsers or providers may also support loading additional text tracks. For example, Safari
and the HLS provider will load captions embedded in HLS playlists.

## Tracks List

The read-only `textTracks` property on the player returns a `TextTrackList` object that contains
`TextTrack` objects. Keep in mind the mentioned objects are custom implementations and not the
browser's native classes.

The returned list is live; that is, as tracks are added to and removed from the player, the list's
contents change dynamically. Once you have a reference to the list, you can monitor it for changes
to detect when new tracks are added or existing ones are removed by [listening to list events](#events).

```ts
const player = document.querySelector('media-player');

// Length
const hasItems = player.textTracks.length;

// Index
const track = player.textTracks[0];

// Get by ID
const track = player.textTracks.getById('...');

// Iterating
for (const track of player.textTracks) {
}

// Map to array
player.textTracks.toArray();
```

### List Events

The `TextTrackList` object is an [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
which dispatches the following events:

- `add`: Fired when a text track has been added to the list.
- `remove`: Fired when a text track has been removed from the list.
- `mode-change`: Fired when the mode of any text track has changed.

```ts
player.textTracks.addEventListener('add', (event) => {
  const newTrack = event.detail; // `TextTrack`
  // ...
});

player.textTracks.addEventListener('mode-change', (event) => {
  const track = event.detail; // `TextTrack`
  // ...
});
```

## Managing Tracks

### Add Tracks

Text tracks can be added like so:

{% code_snippet name="add-track" /%}

👉 Do note, text tracks will not load until media can load (see
[loading guide](docs/player/core-concepts/loading#loading-strategies)) and the `mode` is set to
`showing` or `hidden`.

### Remove Tracks

Text tracks can be dynamically removed from the DOM, or via JS like so:

```ts
player.textTracks.remove(track);
```

All text tracks can be removed by calling `clear()`:

```ts
player.textTracks.clear();
```

### Track Mode

The `mode` property of a text track accepts the following values:

- `showing`: Track will load, receive cue updates, and is visible on-screen.
- `hidden`: Track will load, receive cue updates, but is not visible on-screen.
- `disabled`: Track will not load and it will not receive cue updates.

```ts
textTrack.mode = 'showing';
```

Only one track per [`kind`](https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/kind) can
have a [`mode`](https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/mode) of `showing`.
Other tracks of the same kind that are specifically `showing` will have their mode set to
`disabled` on change.

### Track Events

The `TextTrack` object is an [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
which dispatches the following events:

- `load-start`: Fired when the track begins loading.
- `load`: Fired when the track has finished loading and parsing.
- `error`: Fired when there is a critical error loading or parsing the track.
- `add-cue`: Fired when a new cue has been added.
- `remove-cue`: Fired when a cue has been removed.
- `cue-change`: Fired when the active cues has changed.
- `mode-change`: Fired when the `mode` has been changed.

```ts
track.addEventListener('cue-change', () => {
  // active cues changed
});
```

## Media Store

The following text track related properties are available on the media store:

- `textTracks`: An array containing the current list of `TextTrack` objects.
- `textTrack`: The current captions/subtitles `TextTrack` object or `null` if none is showing.

{% code_snippet name="subscribe" highlight="react:8" /%}

## Media Remote

The `changeTextTrackMode` method on the media remote can be used to dispatch requests to update
text track modes like so:

{% code_snippet name="remote" /%}

## Media Events

The following text track related events are available on the player:

- `text-tracks-change`: Fired when the list of text tracks has changed.
- `text-track-change`: Fired when the showing captions/subtitles text track has changed.

{% code_snippet name="events" /%}

## Text Renderer

### libass

If you'd like to use advanced ASS features that are [not supported](https://github.com/vidstack/media-captions#ssaass)
then we provide a direct integration for the popular
[WASM port of libass](https://github.com/libass/JavascriptSubtitlesOctopus#options).

1. `npm i libass-wasm`.

2. Copy the `node_modules/libass-wasm/dist/js` directory to your public directory (e.g,
   `public/libass`).

3. Download the [`default.woff2`](https://github.com/libass/JavascriptSubtitlesOctopus/blob/master/assets/default.woff2)
   file from GitHub. Once downloaded, paste it in the same directory that contains your worker files.

4. Add the libass text renderer to the player like so:

{% code_snippet name="libass" /%}
