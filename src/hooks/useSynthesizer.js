import { useEffect, useRef, useState } from 'react'
import * as Tone from 'tone'

export const useSynthesizer = () => {
  const synthRef = useRef(null)
  const drumsRef = useRef({})
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initSynth = async () => {
      try {
        if (Tone.Destination.state === 'suspended') {
          await Tone.start()
        }

        const synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'triangle' },
          envelope: {
            attack: 0.005,
            decay: 0.1,
            sustain: 0.3,
            release: 1,
          },
        }).toDestination()

        synthRef.current = synth

        const kickDrum = new Tone.Synth({
          oscillator: { type: 'sine' },
          envelope: {
            attack: 0.001,
            decay: 0.4,
            sustain: 0,
            release: 0.1,
          },
        }).toDestination()

        const hihat = new Tone.MetalSynth({
          harmonicity: 12,
          resonance: 1000,
          envelope: {
            attack: 0.001,
            decay: 0.08,
            release: 0,
          },
        }).toDestination()

        const clapSnare = new Tone.Synth({
          oscillator: { type: 'sawtooth' },
          envelope: {
            attack: 0.001,
            decay: 0.15,
            sustain: 0,
            release: 0.05,
          },
        }).toDestination()

        drumsRef.current = {
          kick: kickDrum,
          hihat: hihat,
          snare: clapSnare,
        }

        setIsInitialized(true)
      } catch (error) {
        console.error('Failed to initialize synthesizer:', error)
        setIsInitialized(true)
      }
    }

    initSynth()

    return () => {
      if (synthRef.current) {
        synthRef.current.dispose()
      }
      Object.values(drumsRef.current).forEach(drum => drum?.dispose())
    }
  }, [])

  const playNote = (note, duration = '8n') => {
    if (synthRef.current) {
      synthRef.current.triggerAttackRelease(note, duration)
    }
  }

  const playKick = (freq = 60, duration = 0.4) => {
    if (drumsRef.current.kick) {
      drumsRef.current.kick.frequency.setValueAtTime(freq, Tone.now())
      drumsRef.current.kick.triggerAttackRelease(duration)
    }
  }

  const playHihat = () => {
    if (drumsRef.current.hihat) {
      drumsRef.current.hihat.triggerAttackRelease('32n')
    }
  }

  const playSnare = () => {
    if (drumsRef.current.snare) {
      drumsRef.current.snare.frequency.setValueAtTime(200, Tone.now())
      drumsRef.current.snare.triggerAttackRelease('16n')
    }
  }

  return {
    isInitialized,
    playNote,
    playKick,
    playHihat,
    playSnare,
  }
}
