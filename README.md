# Spacecraft AI Detection System

A real-time spacecraft component detection system using YOLOv8 and Next.js.

## Features

- 🚀 **Real YOLOv8 Model**: Uses your trained `best.pt` model for actual object detection
- 🌐 **Modern Web Interface**: Beautiful space-themed UI with animations
- 📸 **Image Upload**: Drag & drop or click to upload spacecraft images
- 🔍 **Real-time Detection**: Instant AI-powered component identification
- 📊 **Detailed Results**: Confidence scores and bounding box information
- 🎨 **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Option 1: Automatic Setup (Windows)
1. Double-click `start.bat` to automatically install dependencies and start both services

### Option 2: Manual Setup

#### 1. Install Python Dependencies
```bash
cd api
pip install -r requirements.txt
cd ..
```

#### 2. Start the Python Backend
```bash
cd api
python detect.py
```
The backend will run on `http://localhost:8000`

#### 3. Start the Next.js Frontend
```bash
npm run dev
```
The frontend will run on `http://localhost:3000`

## Project Structure

```
space-ai-detector/
├── api/
│   ├── detect.py          # Python FastAPI backend with YOLO
│   └── requirements.txt   # Python dependencies
├── public/
│   └── models/
│       └── best.pt        # Your trained YOLOv8 model
├── components/            # React components
├── lib/
│   └── onnx-processor.ts # API integration (renamed for compatibility)
└── app/                   # Next.js app directory
```

## How It Works

1. **Image Upload**: Users upload spacecraft images through the web interface
2. **API Call**: Frontend sends image to Python backend via FastAPI
3. **YOLO Detection**: Backend uses your `best.pt` model for object detection
4. **Results Display**: Detected objects are shown with confidence scores and bounding boxes

## API Endpoints

- `POST /api/detect` - Upload image and get detection results
- `GET /api/health` - Check if backend is running

## Model Integration

The system uses your trained YOLOv8 model (`public/models/best.pt`) for:
- Real object detection (not simulation)
- Actual confidence scores
- Real bounding box coordinates
- Your custom class labels

## Troubleshooting

### Backend Issues
- Ensure Python 3.8+ is installed
- Install dependencies: `pip install -r api/requirements.txt`
- Check if port 8000 is available

### Frontend Issues
- Install Node.js dependencies: `npm install`
- Clear `.next` folder if build errors occur
- Check if port 3000 is available

### Model Issues
- Ensure `best.pt` is in `public/models/` directory
- Verify the model file is not corrupted
- Check model class names in the Python backend

## Development

### Adding New Features
1. Frontend: Edit React components in `components/`
2. Backend: Modify `api/detect.py` for new API endpoints
3. Styling: Update `app/globals.css` for theme changes

### Model Updates
1. Replace `public/models/best.pt` with your new model
2. Update class names in `api/detect.py` if needed
3. Restart the backend service

## Performance

- **Inference Time**: Depends on your model size and hardware
- **Memory Usage**: YOLOv8 model loaded in Python backend
- **Scalability**: Can be deployed to cloud services

## License

This project is for educational and research purposes. 