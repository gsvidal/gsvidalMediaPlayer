class AutoPause {
  constructor() {
    this.threshold = 0.25;
    this.pausedByVisibility = false;
    this.handleIntersection = this.handleIntersection.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  run(player) {
    this.player = player;

    const observer = new IntersectionObserver(this.handleIntersection, {
      threshold: this.threshold,
    });

    observer.observe(this.player.media);

    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  }

  handleIntersection(entries) {
    const entry = entries[0];

    const isVisible = entry.intersectionRatio >= this.threshold;

    if(isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  handleVisibilityChange() {
    const isVisible = document.visibilityState === "visible";
    
    if (isVisible) {
      if (this.pausedByVisibility) {
        this.player.play();
      }
    } else {
        if (!this.player.media.paused) {  
          this.player.pause();
          this.pausedByVisibility = true;
        } else {
          this.pausedByVisibility = false;
        }
    }
    
  }
}

export default AutoPause;
