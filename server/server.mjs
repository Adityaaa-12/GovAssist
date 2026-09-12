import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ======================================================
// GOVASSIST LOCAL AI
// No OpenAI API
// No API key
// No internet required
// ======================================================

const services = {
  income: {
    name: "Income Certificate",
    keywords: [
      "income",
      "income certificate",
      "salary certificate",
      "annual income",
    ],
    documents: [
      "Aadhaar Card",
      "Address Proof",
      "Passport-size Photograph",
      "Income-related proof, if required",
      "Application Form",
    ],
    office: "Relevant Revenue / Taluka Office",
  },

  residence: {
    name: "Residence Certificate",
    keywords: [
      "residence",
      "residence certificate",
      "resident certificate",
      "domicile",
      "address certificate",
    ],
    documents: [
      "Aadhaar Card",
      "Address Proof",
      "Passport-size Photograph",
      "Application Form",
    ],
    office: "Relevant Revenue / Taluka Office",
  },

  birth: {
    name: "Birth Certificate",
    keywords: [
      "birth",
      "birth certificate",
      "date of birth",
      "dob certificate",
    ],
    documents: [
      "Aadhaar Card or valid ID",
      "Hospital / Birth Record, if available",
      "Application Form",
      "Supporting documents, if required",
    ],
    office: "Birth & Death Registration / Municipal or Local Authority Office",
  },

  senior: {
    name: "Senior Citizen Certificate",
    keywords: [
      "senior",
      "senior citizen",
      "senior citizen certificate",
      "elderly",
    ],
    documents: [
      "Aadhaar Card",
      "Age Proof",
      "Address Proof",
      "Passport-size Photograph",
      "Application Form",
    ],
    office: "Relevant Revenue / Taluka Office",
  },

  caste: {
    name: "Caste Certificate",
    keywords: [
      "caste",
      "caste certificate",
      "sc certificate",
      "st certificate",
      "obc certificate",
    ],
    documents: [
      "Aadhaar Card",
      "Address Proof",
      "Caste-related supporting document",
      "Passport-size Photograph",
      "Application Form",
    ],
    office: "Relevant Revenue / Taluka Office",
  },
};

// ======================================================
// HELPERS
// ======================================================

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function detectService(message) {
  const text = normalize(message);

  for (const [key, service] of Object.entries(services)) {
    for (const keyword of service.keywords) {
      if (text.includes(keyword)) {
        return key;
      }
    }
  }

  return null;
}

function containsAny(text, words) {
  return words.some((word) => text.includes(word));
}

// ======================================================
// MAIN LOCAL AI RESPONSE
// ======================================================

function generateReply(message) {
  const text = normalize(message);

  // ----------------------------------------------------
  // GREETING
  // ----------------------------------------------------

  if (
    containsAny(text, [
      "hello",
      "hi",
      "hey",
      "namaste",
      "good morning",
      "good evening",
      "good afternoon",
    ])
  ) {
    return `👋 Hello! I'm GovAssist AI.

I can help you prepare for government services before you visit an office.

I can currently help with:

• Income Certificate
• Residence Certificate
• Birth Certificate
• Senior Citizen Certificate
• Caste Certificate

Just tell me which certificate you need.`;
  }

  // ----------------------------------------------------
  // THANK YOU
  // ----------------------------------------------------

  if (
    containsAny(text, [
      "thank you",
      "thanks",
      "thank",
      "great thanks",
    ])
  ) {
    return `You're welcome! 😊

GovAssist is here to help you avoid unnecessary government-office visits.

If you need help with another service, just tell me.`;
  }

  // ----------------------------------------------------
  // WHAT CAN YOU DO?
  // ----------------------------------------------------

  if (
    containsAny(text, [
      "what can you do",
      "help me",
      "what do you do",
      "how can you help",
    ])
  ) {
    return `I can help you:

✅ Identify the government service you need
✅ Understand commonly required documents
✅ Check whether you may be ready to visit
✅ Explain the next steps
✅ Reduce the chance of making an unnecessary office visit

Try saying:

"I need an Income Certificate"`;
  }

  // ----------------------------------------------------
  // SERVICE DETECTION
  // ----------------------------------------------------

  const serviceKey = detectService(message);

  if (serviceKey) {
    const service = services[serviceKey];

    return `Sure! 👍 It sounds like you need a **${service.name}**.

I can help you prepare before visiting the office.

### Common documents

${service.documents
  .map((doc) => `• ${doc}`)
  .join("\n")}

### Where you may need to go

🏢 ${service.office}

⚠️ Requirements can vary depending on your state, district and department, so please verify the final requirements with the relevant official government office or portal.

Would you like me to help you check your documents one by one?`;
  }

  // ----------------------------------------------------
  // DOCUMENT QUESTIONS
  // ----------------------------------------------------

  if (
    containsAny(text, [
      "documents",
      "document",
      "papers",
      "paperwork",
      "what do i need",
      "what should i carry",
      "required documents",
    ])
  ) {
    return `📄 I can help you find the documents you need.

First, tell me which service you are applying for:

1. Income Certificate
2. Residence Certificate
3. Birth Certificate
4. Senior Citizen Certificate
5. Caste Certificate`;
  }

  // ----------------------------------------------------
  // READY / CAN I VISIT?
  // ----------------------------------------------------

  if (
    containsAny(text, [
      "ready",
      "can i visit",
      "should i visit",
      "visit office",
      "go to office",
      "office visit",
    ])
  ) {
    return `Before visiting the office, make sure you have:

☑ Aadhaar Card
☑ Address Proof
☑ Required supporting documents
☑ Passport-size photograph
☑ Application form, if required

If any important document is missing, it may be better to verify the requirement first rather than making an unnecessary trip.

Tell me which certificate you're applying for and I can give you a more specific checklist.`;
  }

  // ----------------------------------------------------
  // AADHAAR
  // ----------------------------------------------------

  if (
    containsAny(text, [
      "aadhaar",
      "aadhar",
      "adhar",
    ])
  ) {
    return `🪪 Aadhaar is commonly used as an identity document for many government services.

However, Aadhaar alone may not be enough. You may also need address proof or other supporting documents depending on the service.

Tell me the certificate you're applying for and I'll help you with the checklist.`;
  }

  // ----------------------------------------------------
  // ADDRESS PROOF
  // ----------------------------------------------------

  if (
    containsAny(text, [
      "address proof",
      "proof of address",
      "address document",
    ])
  ) {
    return `🏠 Address proof is commonly requested for services where your residence needs to be verified.

The exact accepted documents can vary by department and location.

For a more specific checklist, tell me which certificate you need.`;
  }

  // ----------------------------------------------------
  // ONLINE APPLICATION
  // ----------------------------------------------------

  if (
    containsAny(text, [
      "online",
      "apply online",
      "online apply",
      "can i apply online",
      "website",
      "portal",
    ])
  ) {
    return `🌐 Some government services may be available through online government portals, while others may still require verification or a visit to an office.

The exact process depends on the service and your state/district.

Tell me which certificate you need and I can guide you through the typical process.`;
  }

  // ----------------------------------------------------
  // FEES
  // ----------------------------------------------------

  if (
    containsAny(text, [
      "fee",
      "fees",
      "cost",
      "price",
      "how much",
      "payment",
    ])
  ) {
    return `💰 Government service fees can vary depending on the service, department and location.

I don't want to give you an incorrect amount.

Please verify the current fee on the relevant official government portal or office before making a payment.`;
  }

  // ----------------------------------------------------
  // TIME / HOW LONG
  // ----------------------------------------------------

  if (
    containsAny(text, [
      "how long",
      "time",
      "days",
      "when will",
      "processing time",
      "how many days",
    ])
  ) {
    return `⏱️ Processing time can vary depending on the service, department, verification requirements and location.

GovAssist recommends checking the current timeline with the relevant official government office or portal.

Tell me which certificate you're applying for and I can explain the typical steps.`;
  }

  // ----------------------------------------------------
  // TRACK APPLICATION
  // ----------------------------------------------------

  if (
    containsAny(text, [
      "track",
      "tracking",
      "application status",
      "status of application",
      "where is my application",
    ])
  ) {
    return `📍 To track an application, you normally need your application/reference number.

If the service provides online tracking, use the official government portal associated with that service.

If you tell me which certificate you applied for, I can explain what information you should look for.`;
  }

  // ----------------------------------------------------
  // PROBLEM / CONFUSED
  // ----------------------------------------------------

  if (
    containsAny(text, [
      "confused",
      "don't know",
      "dont know",
      "not sure",
      "what should i do",
      "where do i go",
      "which office",
    ])
  ) {
    return `No problem! 😊 Let's do it step by step.

First, tell me what you are trying to get:

📄 Income Certificate
🏠 Residence Certificate
👶 Birth Certificate
👴 Senior Citizen Certificate
📋 Caste Certificate

Just type the name or describe what you need.`;
  }

  // ----------------------------------------------------
  // DEFAULT RESPONSE
  // ----------------------------------------------------

  return `I can help you with government services, documents and office preparation. 😊

Currently, GovAssist supports:

• Income Certificate
• Residence Certificate
• Birth Certificate
• Senior Citizen Certificate
• Caste Certificate

For example, you can say:

👉 "I need an Income Certificate"

or

👉 "What documents do I need for a Residence Certificate?"`;
}

// ======================================================
// TEST ROUTE
// ======================================================

app.get("/", (req, res) => {
  res.json({
    message: "GovAssist local AI backend is running!",
    mode: "local",
    apiRequired: false,
  });
});

// ======================================================
// CHAT API
// ======================================================

app.post("/api/chat", (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    const reply = generateReply(message);

    res.json({
      reply,
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);

    res.status(500).json({
      error: "Unable to generate a response.",
    });
  }
});

// ======================================================
// SERVER
// ======================================================

const PORT = 5000;

app.listen(PORT, () => {
  console.log("========================================");
  console.log("       GovAssist Local AI Server");
  console.log("========================================");
  console.log(`Server running on: http://localhost:${PORT}`);
  console.log("AI mode: LOCAL");
  console.log("OpenAI API: NOT REQUIRED");
  console.log("========================================");
});