export interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
}

export interface DetectionResult {
  label: string
  confidence: number
  bbox?: BoundingBox
}

export interface DetectionApiResponse {
  image_path: string
  detections: DetectionResult[]
}
