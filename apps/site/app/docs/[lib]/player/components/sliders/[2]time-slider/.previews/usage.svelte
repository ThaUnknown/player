<media-player
  class="w-full max-w-xs relative"
  volume={0.2}
  src="https://media-files.vidstack.io/360p.mp4"
  poster="https://media-files.vidstack.io/poster-2.png"
  playsinline
  aspect-ratio="16/9"
>
  <media-outlet />
  <div class="w-full text-center flex">
    <media-play-button />
    <media-time-slider />
  </div>
</media-player>
