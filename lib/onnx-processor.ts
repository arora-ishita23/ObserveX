import type { DetectionResult } from "@/types/detection"

const API_URL = "https://966c581c1b4a.ngrok-free.app/detect" // ✅ Update this to your live FastAPI endpoint

// ✅ Server response structure
export interface BoundingBox {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface ServerDetection {
  class: string
  confidence: number
  bbox: BoundingBox
}

export interface DetectionApiResponse {
  image_path: string
  detections: ServerDetection[]
}


// ✅ Final function
export async function processImageWithONNX(
  file: File
): Promise<{ detections: DetectionResult[]; imageUrl: string }> {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const res: DetectionApiResponse = await response.json()

    const imageUrl = `https://966c581c1b4a.ngrok-free.app/image/?image_path=${res.image_path}` // ✅ Full image URL

    const detections: DetectionResult[] = res.detections.map((detection) => ({
      label: detection.class,
      confidence: detection.confidence,
      bbox: {
        x: detection.bbox.x1,
        y: detection.bbox.y1,
        width: detection.bbox.x2 - detection.bbox.x1,
        height: detection.bbox.y2 - detection.bbox.y1,
      },
    }))

    return { detections, imageUrl }
  } catch (error) {
    console.error("❌ Error during YOLO detection:", error)
    throw error
  }
}
