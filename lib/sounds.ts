// Sound effects using HTML5 Audio with generated WAV data
"use client";

type SoundType = "success" | "error" | "hint" | "celebration" | "message";

// Generate a simple WAV file as a data URI
function generateToneWav(
  frequency: number,
  duration: number,
  volume: number = 0.3
): string {
  const sampleRate = 44100;
  const numSamples = Math.floor(sampleRate * duration);
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = numSamples * numChannels * (bitsPerSample / 8);
  const fileSize = 36 + dataSize;

  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // WAV header
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, "RIFF");
  view.setUint32(4, fileSize, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true); // fmt chunk size
  view.setUint16(20, 1, true); // audio format (PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(36, "data");
  view.setUint32(40, dataSize, true);

  // Generate sine wave with envelope
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Envelope: quick attack, decay
    const envelope = Math.min(1, i / (sampleRate * 0.01)) * Math.exp(-t * 5);
    const sample = Math.sin(2 * Math.PI * frequency * t) * volume * envelope;
    const intSample = Math.max(
      -32768,
      Math.min(32767, Math.floor(sample * 32767))
    );
    view.setInt16(44 + i * 2, intSample, true);
  }

  // Convert to base64
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return "data:audio/wav;base64," + btoa(binary);
}

// Generate multi-tone WAV (for chords/arpeggios)
function generateMultiToneWav(
  tones: Array<{
    frequency: number;
    startTime: number;
    duration: number;
    volume?: number;
  }>
): string {
  const sampleRate = 44100;
  const totalDuration = Math.max(...tones.map((t) => t.startTime + t.duration));
  const numSamples = Math.floor(sampleRate * totalDuration);
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = numSamples * numChannels * (bitsPerSample / 8);
  const fileSize = 36 + dataSize;

  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // WAV header
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, "RIFF");
  view.setUint32(4, fileSize, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(36, "data");
  view.setUint32(40, dataSize, true);

  // Generate combined waveform
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sample = 0;

    for (const tone of tones) {
      const toneT = t - tone.startTime;
      if (toneT >= 0 && toneT < tone.duration) {
        const vol = tone.volume ?? 0.2;
        // Envelope
        const attack = Math.min(1, toneT / 0.01);
        const decay = Math.exp(-toneT * 4);
        const envelope = attack * decay;
        sample +=
          Math.sin(2 * Math.PI * tone.frequency * toneT) * vol * envelope;
      }
    }

    // Clamp and convert
    sample = Math.max(-1, Math.min(1, sample));
    const intSample = Math.floor(sample * 32767);
    view.setInt16(44 + i * 2, intSample, true);
  }

  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return "data:audio/wav;base64," + btoa(binary);
}

// Pre-generate sound data URIs (lazy, on first use)
let soundCache: Record<SoundType, string> | null = null;

function getSounds(): Record<SoundType, string> {
  if (soundCache) return soundCache;

  soundCache = {
    // Success: Rising arpeggio C5 -> E5 -> G5
    success: generateMultiToneWav([
      { frequency: 523.25, startTime: 0, duration: 0.15, volume: 0.25 },
      { frequency: 659.25, startTime: 0.1, duration: 0.15, volume: 0.25 },
      { frequency: 783.99, startTime: 0.2, duration: 0.25, volume: 0.3 },
    ]),

    // Error: Descending A3 -> F3
    error: generateMultiToneWav([
      { frequency: 220, startTime: 0, duration: 0.2, volume: 0.2 },
      { frequency: 174.61, startTime: 0.12, duration: 0.25, volume: 0.18 },
    ]),

    // Hint: Two-tone D5 -> A4
    hint: generateMultiToneWav([
      { frequency: 587.33, startTime: 0, duration: 0.18, volume: 0.2 },
      { frequency: 440, startTime: 0.15, duration: 0.22, volume: 0.18 },
    ]),

    // Celebration: Chord progression
    celebration: generateMultiToneWav([
      // C major chord
      { frequency: 261.63, startTime: 0, duration: 0.3, volume: 0.15 },
      { frequency: 329.63, startTime: 0, duration: 0.3, volume: 0.15 },
      { frequency: 392.0, startTime: 0, duration: 0.3, volume: 0.15 },
      // G major chord
      { frequency: 392.0, startTime: 0.28, duration: 0.3, volume: 0.15 },
      { frequency: 493.88, startTime: 0.28, duration: 0.3, volume: 0.15 },
      { frequency: 587.33, startTime: 0.28, duration: 0.3, volume: 0.15 },
      // C major high + sparkle
      { frequency: 523.25, startTime: 0.55, duration: 0.45, volume: 0.2 },
      { frequency: 659.25, startTime: 0.55, duration: 0.45, volume: 0.2 },
      { frequency: 783.99, startTime: 0.55, duration: 0.45, volume: 0.2 },
      { frequency: 1046.5, startTime: 0.6, duration: 0.5, volume: 0.15 },
    ]),

    // Message: Simple blip
    message: generateToneWav(660, 0.1, 0.2),
  };

  return soundCache;
}

// Track if audio has been unlocked (played successfully at least once)
let audioUnlocked = false;

export function playSound(type: SoundType) {
  if (typeof window === "undefined") return;

  try {
    const sounds = getSounds();
    const audio = new Audio(sounds[type]);
    audio.volume = 1.0;

    const playPromise = audio.play();

    playPromise
      .then(() => {
        // Successfully played - mark as unlocked
        if (!audioUnlocked) {
          audioUnlocked = true;
        }
      })
      .catch((e) => {
        // If autoplay is blocked, try to unlock with a silent sound first
        if (e.name === "NotAllowedError" && !audioUnlocked) {
          // Try to unlock with a very quiet sound
          const unlockAudio = new Audio(sounds.message);
          unlockAudio.volume = 0.01;
          unlockAudio
            .play()
            .then(() => {
              audioUnlocked = true;
              // Now try playing the actual sound
              audio.play().catch(() => {
                // Still failed, ignore
              });
            })
            .catch(() => {
              // Unlock failed, ignore
            });
        }
      });
  } catch (e) {
    // Sound generation failed - ignore
  }
}
