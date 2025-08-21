"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ImageIcon, Zap, CheckCircle, Target } from "lucide-react"
import type { DetectionResult } from "@/types/detection"
import Image from "../public/sample.jpeg"

interface GallerySectionProps {
  onDetectionComplete?: (results: DetectionResult[]) => void
}

export default function GallerySection({ onDetectionComplete }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState<DetectionResult[]>([])

  // Sample images - replace with your actual images
  const sampleImages = [
    Image,
    Image,
    Image,
    Image
  ]

  const handleImageClick = async (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setIsProcessing(true)
    
    // Simulate processing delay
    setTimeout(() => {
      // Mock results - replace with actual detection logic
      const mockResults: DetectionResult[] = [
        {
          label: "spacecraft",
          confidence: 0.85,
          bbox: { x: 100, y: 150, width: 200, height: 150 }
        },
        {
          label: "satellite",
          confidence: 0.72,
          bbox: { x: 300, y: 200, width: 180, height: 120 }
        }
      ]
      
      setResults(mockResults)
      setIsProcessing(false)
      if (onDetectionComplete) {
        onDetectionComplete(mockResults)
      }
    }, 2000)
  }

  const handleAnalyzeAll = () => {
    setIsProcessing(true)
    setTimeout(() => {
      const mockResults: DetectionResult[] = [
        {
          label: "spacecraft",
          confidence: 0.92,
          bbox: { x: 100, y: 150, width: 200, height: 150 }
        },
        {
          label: "satellite",
          confidence: 0.78,
          bbox: { x: 300, y: 200, width: 180, height: 120 }
        },
        {
          label: "debris",
          confidence: 0.65,
          bbox: { x: 450, y: 300, width: 100, height: 80 }
        }
      ]
      setResults(mockResults)
      setIsProcessing(false)
    }, 3000)
  }

  const handleReset = () => {
    setSelectedImage(null)
    setResults([])
    setIsProcessing(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 font-orbitron bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            MULTI  CAMERA VIEW
          </h2>
        <p className="text-gray-300 font-rajdhani text-lg">Select images to analyze with AI detection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Gallery with Glowing Effect */}
        <div className="lg:col-span-2">
          <motion.div
            className="relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 border-purple-400/50 hover:border-purple-400 hover:bg-purple-400/5"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {sampleImages.map((image, index) => (
                <motion.div
                  key={index}
                  className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                    selectedImage === image ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-black' : ''
                  }`}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleImageClick(image)}
                >
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <p className="font-semibold">Image {index + 1}</p>
                      <p className="text-sm text-gray-300">Click to analyze</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Buttons Section */}
            <div className="flex gap-4 mt-8 justify-center">
              <motion.button
                onClick={handleAnalyzeAll}
                disabled={isProcessing}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-5 h-5" />
                {isProcessing ? "Analyzing..." : "Analyze All"}
              </motion.button>

              <motion.button
                onClick={handleReset}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ImageIcon className="w-5 h-5" />
                Reset
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Right Section - Results */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900/70 border border-purple-400/30 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white font-orbitron mb-2">RESULTS</h3>
              <p className="text-gray-300 font-rajdhani">AI Analysis</p>
            </div>

            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center py-8"
                >
                  <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-lg text-cyan-400">Processing with AI...</p>
                </motion.div>
              ) : results.length > 0 ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="space-y-4"
                >
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`bg-gray-800/50 border rounded-lg p-4 backdrop-blur-sm transition-all duration-300 ${
                        result.confidence > 0.8
                          ? "border-green-400/50"
                          : result.confidence > 0.6
                            ? "border-cyan-400/50"
                            : "border-purple-400/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              result.confidence > 0.8
                                ? "bg-green-400"
                                : result.confidence > 0.6
                                  ? "bg-cyan-400"
                                  : "bg-purple-400"
                            }`}
                          ></div>
                          <h4 className="text-sm font-semibold text-white font-orbitron capitalize">{result.label}</h4>
                        </div>
                        <div className="flex items-center gap-1">
                          {result.confidence > 0.8 && <CheckCircle className="w-4 h-4 text-green-400" />}
                          <span className="font-mono text-sm font-bold text-white">
                            {(result.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-400 mb-1 font-rajdhani">
                          <span>CONFIDENCE</span>
                          <span>{result.confidence > 0.8 ? "HIGH" : result.confidence > 0.6 ? "MEDIUM" : "LOW"}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${
                              result.confidence > 0.8
                                ? "bg-gradient-to-r from-green-400 to-green-600"
                                : result.confidence > 0.6
                                  ? "bg-gradient-to-r from-cyan-400 to-cyan-600"
                                  : "bg-gradient-to-r from-purple-400 to-purple-600"
                            }`}
                            style={{ width: `${result.confidence * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {result.bbox && (
                        <div className="grid grid-cols-2 gap-2 text-xs font-rajdhani">
                          <div>
                            <span className="text-gray-400">POS:</span>
                            <span className="text-white ml-1">
                              ({result.bbox.x.toFixed(0)}, {result.bbox.y.toFixed(0)})
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">SIZE:</span>
                            <span className="text-white ml-1">
                              {result.bbox.width.toFixed(0)}×{result.bbox.height.toFixed(0)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-8"
                >
                  <Target className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                  <p className="text-gray-400 font-rajdhani">Select an image to analyze</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
} 