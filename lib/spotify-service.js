'use babel';

import SpotifyWebHelper from 'spotify-web-helper'
import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,
  spotify: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable()
    this.spotify = new SpotifyWebHelper()
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  provideSpotifyService() {

  }

};
