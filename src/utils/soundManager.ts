// Sound Manager for Upgradia Academy
// Using Web Audio API for game-like sound effects

class SoundManager {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private enabled: boolean = true;

  constructor() {
    // Initialize on user interaction to comply with browser policies
    if (typeof window !== "undefined") {
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
  }

  // Generate a sound using Web Audio API (procedural sounds)
  private createOscillatorSound(
    frequency: number,
    duration: number,
    type: OscillatorType = "sine",
    volume: number = 0.3,
  ): void {
    if (!this.audioContext || !this.enabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    gainNode.gain.setValueAtTime(
      volume,
      this.audioContext.currentTime,
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + duration,
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Create a more complex sound with multiple frequencies
  private createComplexSound(
    frequencies: number[],
    duration: number,
    volume: number = 0.2,
  ): void {
    frequencies.forEach((freq, index) => {
      setTimeout(
        () => {
          this.createOscillatorSound(
            freq,
            duration / frequencies.length,
            "sine",
            volume,
          );
        },
        (duration * 1000 * index) / frequencies.length,
      );
    });
  }

  // UI Interaction Sounds
  playHover(): void {
    this.createOscillatorSound(600, 0.05, "sine", 0.1);
  }

  playClick(): void {
    if (!this.audioContext || !this.enabled) return;

    // Create a punchy click sound
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = "square";
    oscillator.frequency.value = 800;

    gainNode.gain.setValueAtTime(
      0.3,
      this.audioContext.currentTime,
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.1,
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  playSuccess(): void {
    // Ascending chord for success
    this.createComplexSound(
      [523.25, 659.25, 783.99],
      0.4,
      0.25,
    );
  }

  playError(): void {
    // Descending sound for error
    this.createComplexSound([400, 300, 200], 0.3, 0.2);
  }

  playLevelUp(): void {
    // Epic level up sound
    if (!this.audioContext || !this.enabled) return;

    const notes = [523.25, 587.33, 659.25, 783.99, 880.0];
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.createOscillatorSound(freq, 0.3, "triangle", 0.3);
      }, index * 80);
    });
  }

  playNotification(): void {
    this.createComplexSound([800, 1000], 0.2, 0.15);
  }

  playSwipe(): void {
    if (!this.audioContext || !this.enabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = "sawtooth";

    // Sweep frequency
    oscillator.frequency.setValueAtTime(
      200,
      this.audioContext.currentTime,
    );
    oscillator.frequency.exponentialRampToValueAtTime(
      800,
      this.audioContext.currentTime + 0.2,
    );

    gainNode.gain.setValueAtTime(
      0.15,
      this.audioContext.currentTime,
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.2,
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.2);
  }

  playTransition(): void {
    this.createOscillatorSound(400, 0.3, "sine", 0.2);
    setTimeout(() => {
      this.createOscillatorSound(600, 0.3, "sine", 0.2);
    }, 100);
  }

  playXPGain(): void {
    // Quick ascending ping
    this.createComplexSound([600, 800, 1000], 0.3, 0.2);
  }

  playUnlock(): void {
    // Satisfying unlock sound
    if (!this.audioContext || !this.enabled) return;

    setTimeout(
      () =>
        this.createOscillatorSound(
          523.25,
          0.1,
          "triangle",
          0.25,
        ),
      0,
    );
    setTimeout(
      () =>
        this.createOscillatorSound(
          659.25,
          0.1,
          "triangle",
          0.25,
        ),
      100,
    );
    setTimeout(
      () =>
        this.createOscillatorSound(
          783.99,
          0.2,
          "triangle",
          0.3,
        ),
      200,
    );
  }

  playTabSwitch(): void {
    this.createOscillatorSound(700, 0.1, "sine", 0.15);
  }

  playCardFlip(): void {
    this.createOscillatorSound(500, 0.15, "triangle", 0.2);
  }

  // Toggle sound on/off
  toggleSound(): boolean {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

// Export singleton instance
export const soundManager = new SoundManager();