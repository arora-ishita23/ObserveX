export const observexKnowledge = `
ObserveX is an AI-powered monitoring and detection platform for high-precision environments like space missions. It assists astronauts, engineers, and scientists by analyzing equipment, detecting anomalies, and providing guidance through an AI assistant named Jarvis.

Key Features:
1. Real-time monitoring of mission-critical systems.
2. Anomaly detection for oxygen levels, tools, and safety equipment.
3. Jarvis voice-enabled AI for quick support.

FAQs:
Q: What is this site?
A: This site is the interface for ObserveX, providing access to monitoring tools and the Jarvis assistant.

Q: What is ObserveX?
A: ObserveX is an AI-powered platform that ensures operational safety and performance through intelligent detection and monitoring.

Q: Who can use ObserveX?
A: Engineers, astronauts, mission controllers, and research teams.

Q: Can Jarvis explain equipment readings?
A: Yes. Jarvis uses the ObserveX knowledge base to explain detections and guide users.

Q: Does ObserveX work offline?
A: Limited features may work offline, but AI analysis requires internet connectivity.
`;

// Check if question is related
export function isObserveXRelated(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes("observex") ||
    lower.includes("this site") ||
    lower.includes("jarvis") ||
    lower.includes("monitoring") ||
    lower.includes("security")
  );
}

// Build the prompt for Gemini
export function buildObserveXPrompt(userText: string): string {
  return `
You are Jarvis, an AI assistant for ObserveX.

Knowledge Base:
${observexKnowledge}

User Question: ${userText}

Rules:
- Only answer using information from the knowledge base.
- If the question is unrelated, respond:
"I can only assist with ObserveX and its security features."
`;
}
