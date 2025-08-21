"use client"

import type { DetectionResult } from "@/types/detection"


interface Props {
  results: DetectionResult[]
  imageUrl: string
}

export default function ResultsDisplay({ results, imageUrl }: Props) {
  return (
    <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-400/30">
      <h3 className="text-2xl font-orbitron text-cyan-400 mb-4">Detection Results</h3>
      
      <div className="mb-6">
        {/* <img
          src={imageUrl}
          alt="Detected output"
          className="rounded-lg border border-purple-500 max-h-[400px] mx-auto"
          onLoad={() => console.log("🖼️ Image loaded:", imageUrl)}
        /> */}
      </div>

      <div className="space-y-4">
        {results.map((res, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg bg-black/40 border border-purple-500/30"
          >
            <p className="text-white font-orbitron text-lg">
              <strong>Component:</strong> {res.label}
            </p>
            <p className="text-cyan-400 font-rajdhani">
              <strong>Confidence:</strong> {(res.confidence * 100).toFixed(2)}%
            </p>
            {res.bbox && (
              <p className="text-gray-300 font-rajdhani text-sm">
                <strong>Bounding Box:</strong> x: {res.bbox.x.toFixed(0)}, y: {res.bbox.y.toFixed(0)},
                w: {res.bbox.width.toFixed(0)}, h: {res.bbox.height.toFixed(0)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
