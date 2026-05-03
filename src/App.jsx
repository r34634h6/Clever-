import { DrumMachine } from './components/DrumMachine'

export default function App() {
  return (
    <div className="min-h-screen bg-synth-darker flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <DrumMachine />
      </div>
    </div>
  )
}
