'use babel';

import SpotifyService from '../lib/spotify-service'
import { Emitter } from 'atom'

describe('SpotifyService', () => {
  let spotifyService, runAsync
  beforeEach(() => {
    // Copy the module for test sandboxing
    spotifyService = {}
    Object.assign(spotifyService, SpotifyService)
    spotifyService.activate()
  })

  describe('provideSpotifyService', () => {

    it('exists', () => {
      expect(spotifyService.provideSpotifyService).toBeDefined()
      expect(typeof spotifyService.provideSpotifyService).toBe('function', 'not a function')
    })
    it('returns a promise', () => {
      expect(spotifyService.provideSpotifyService()).toBeDefined()
      expect(spotifyService.provideSpotifyService() instanceof Promise).toBe(true)
    })
    it('resolves to an emitter', () => {
      // Force the promise to resolve
      spotifyService.startupPromise = Promise.resolve()
      spotifyService.provideSpotifyService().then((eventEmitter) => {
        expect(eventEmitter instanceof Emitter).toBe(true)
      })
    })
  })
})
