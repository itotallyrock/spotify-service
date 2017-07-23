'use babel';

import SpotifyWebHelper from 'spotify-web-helper'
import disposableEvent from 'disposable-event'
import eventToPromise from 'event-to-promise'
import { CompositeDisposable, Emitter } from 'atom';

export default {

  subscriptions: null,
  eventEmitter: null,
  spotify: null,
  startupPromise: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable()
    this.eventEmitter = new Emitter()

    this.spotify = new SpotifyWebHelper()
    this.subscriptions.add(
      disposableEvent(this.spotify.player, 'track-will-change', this.onTrackWillChange),
      disposableEvent(this.spotify.player, 'status-will-change', this.onStatusWillChange),
      disposableEvent(this.spotify.player, 'play', this.onPlay),
      disposableEvent(this.spotify.player, 'pause', this.onPause),
      disposableEvent(this.spotify.player, 'seek', this.onSeek),
      disposableEvent(this.spotify.player, 'end', this.onEnd)
    )
    this.startupPromise = eventToPromise(this.spotify.player, 'ready')
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  async provideSpotifyService() {
    // Player will emit ready with Spotify is running and error if not
    await this.startupPromise
    return this.eventEmitter
  },

  onTrackWillChange(track) {
    this.eventEmitter.emit('track-will-change', track)
  },

  onStatusWillChange(status) {
    this.eventEmitter.emit('status-will-change', track)
  },

  onPlay() {
    this.eventEmitter.emit('play')
  },

  onPause() {
    this.eventEmitter.emit('pause')
  },

  onSeek(newPosition) {
    this.eventEmitter.emit('seek', newPosition)
  },

  onEnd() {
    this.eventEmitter.emit('end')
  }

};
