# from fastapi import FastAPI, Response
# from fastapi.middleware.cors import CORSMiddleware
# import cv2, time
# from ultralytics import YOLO

# app = FastAPI()
# model = YOLO("yolo12l.pt")
# class_names = model.names
# ignore_classes = {"refrigerator", "cake"}

# cap = cv2.VideoCapture(0)
# target_fps = 60
# frame_interval = 1.0 / target_fps
# last_time = 0

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/video")
# def get_video():
#     global last_time
#     ret, frame = cap.read()
#     if not ret:
#         return Response(content=b"", media_type="image/jpeg")

#     current_time = time.time()
#     if current_time - last_time >= frame_interval:
#         last_time = current_time
#         results = model(frame)
#         for r in results:
#             high_conf_boxes = r.boxes[r.boxes.conf > 0.6]
#             filtered_boxes = [
#                 box for box in high_conf_boxes
#                 if class_names[int(box.cls[0])] not in ignore_classes
#             ]
#             r.boxes = filtered_boxes
#             frame = r.plot()

#     _, jpeg = cv2.imencode('.jpg', frame)
#     return Response(content=jpeg.tobytes(), media_type="image/jpeg")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from ultralytics import YOLO
import cv2
import time

app = FastAPI()

# Allow all origins for testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("yolo12l.pt")  # Change to your model
class_names = model.names
ignore_classes = {"refrigerator", "cake"}

cap = cv2.VideoCapture(0)
target_fps = 60
frame_interval = 1.0 / target_fps
last_time = 0

def generate_frames():
    global last_time
    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        current_time = time.time()
        if current_time - last_time >= frame_interval:
            last_time = current_time

            results = model(frame)
            for r in results:
                high_conf_boxes = r.boxes[r.boxes.conf > 0.6]
                filtered_boxes = [
                    box for box in high_conf_boxes
                    if class_names[int(box.cls[0])] not in ignore_classes
                ]
                r.boxes = filtered_boxes
                frame = r.plot()

        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.get("/video")
def video_feed():
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace; boundary=frame")
