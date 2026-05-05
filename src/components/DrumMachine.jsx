import { useState } from 'react'
import * as Tone from 'tone'
import { useSynthesizer } from '../hooks/useSynthesizer'

export const DrumMachine = () => {
  const { isInitialized, playKick, playHihat, playSnare } = useSynthesizer()
  const [bpm, setBpm] = useState(120)
  const [kickIntensity, setKickIntensity] = useState(0.8)
  const [hihatIntensity, setHihatIntensity] = useState(0.6)
  const [snareIntensity, setSnareIntensity] = useState(0.7)

  const handlePlayKick = async () => {
    if (Tone.Destination.state === 'suspended') {
      await Tone.start()
    }
    playKick(60 * kickIntensity, 0.4)
  }

  const handlePlayHihat = async () => {
    if (Tone.Destination.state === 'suspended') {
      await Tone.start()
    }
    playHihat()
  }

  const handlePlaySnare = async () => {
    if (Tone.Destination.state === 'suspended') {
      await Tone.start()
    }
    playSnare()
  }

  return (
    <div className="w-full max-w-2xl bg-gradient-to-b from-synth-dark to-synth-darker rounded-2xl p-8 border border-synth-blue border-opacity-30 shadow-2xl">
      <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-synth-blue to-synth-accent bg-clip-text text-transparent">
        Roland 808
      </h1>
      <p className="text-center text-gray-400 mb-8 text-sm">Web Synthesizer Builder</p>

      {!isInitialized && (
        <div className="text-center py-8 text-gray-500">
          <p>Initializing synthesizer...</p>
        </div>
      )}

      {isInitialized && (
        <div className="space-y-8">
          <div className="bg-black bg-opacity-40 rounded-xl p-6 border border-synth-blue border-opacity-20">
            <h2 className="text-sm font-semibold text-synth-blue mb-4 uppercase tracking-wider">
              Tempo Control
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-white min-w-16">{bpm}</span>
              <input
                type="range"
                min="40"
                max="200"
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-gray-400">BPM</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-black bg-opacity-40 rounded-xl p-6 border border-synth-blue border-opacity-20">
              <button
                onClick={handlePlayKick}
                className="w-full aspect-square bg-gradient-to-b from-synth-accent to-pink-700 hover:from-pink-500 hover:to-pink-800 rounded-lg font-bold text-white text-xl shadow-lg hover:shadow-2xl transition-all mb-4"
              >
                KICK
              </button>
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase">Intensity</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={kickIntensity}
                  onChange={(e) => setKickIntensity(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-xl p-6 border border-synth-blue border-opacity-20">
              <button
                onClick={handlePlayHihat}
                className="w-full aspect-square bg-gradient-to-b from-synth-blue to-cyan-700 hover:from-cyan-400 hover:to-cyan-800 rounded-lg font-bold text-white text-xl shadow-lg hover:shadow-2xl transition-all mb-4"
              >
                HI-HAT
              </button>
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase">Intensity</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={hihatIntensity}
                  onChange={(e) => setHihatIntensity(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="bg-black bg-opacity-40 rounded-xl p-6 border border-synth-blue border-opacity-20">
              <button
                onClick={handlePlaySnare}
                className="w-full aspect-square bg-gradient-to-b from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 rounded-lg font-bold text-white text-xl shadow-lg hover:shadow-2xl transition-all mb-4"
              >
                SNARE
              </button>
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase">Intensity</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={snareIntensity}
                  onChange={(e) => setSnareIntensity(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 mt-6">
            Click buttons to trigger sounds
          </div>
        </div>
      )}
    </div>
  )
}
