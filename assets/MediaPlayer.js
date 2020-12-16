function MediaPlayer(config) { 
  this.media = config.elem;
  this.plugins = config.plugins || [];

  this._initPlugins();
}

MediaPlayer.prototype._initPlugins = function() {
  // Para controlar la cantidad de datos que le pasamos a los plugin, así que para que no tengan acceso a todo el player y que solo tengan acceso a un set de funcionalidades hacemos: 
  const player = {
    play: () => this.play(),
    pause: () => this.pause(),
    media: this.media,
    get muted() {
      return this.media.muted;
    },
    set muted(value) {
        this.media.muted = value;
    }
    
  }
  this.plugins.forEach(plugin => {
    plugin.run(player);
  });
}
  
MediaPlayer.prototype.play = function() {
  this.media.play();
};

MediaPlayer.prototype.pause = function() {
  this.media.pause();
};

MediaPlayer.prototype.togglePlayPaused = function() {
  if (this.media.paused) {
    this.play();
  } else {
    this.pause();
  }
};

MediaPlayer.prototype.mute = function() {
  this.media.muted = true;
}
MediaPlayer.prototype.unmute = function() {
  this.media.muted = false;
}
MediaPlayer.prototype.toggleMuteUnmute = function() {
  this.media.muted ? this.media.muted = false : this.media.muted = true;
}

export default MediaPlayer;