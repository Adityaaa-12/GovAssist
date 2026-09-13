import { useEffect, useMemo, useState } from "react";
import "./App.css";


/*DEVELOPED BY TEAM AXION FOR BIT & BUILD 2026 INTERNATIONAL HACKATHON GOA ROUND

TEAM MEMBERS:

ADITYA VELIP -TEAM LEADER
ARYAN NAYAK
FLEVON D'SOUZA
MILFORD DE'SOUZA

*/

/* =========================================================
   SERVICES
   ========================================================= */

const SERVICES = [
  {
    id: "residence",
    name: "Residence Certificate",
    category: "Certificates",
    icon: "🏠",
    description: "Proof of residence issued by the appropriate authority.",
    process: "Online / Office",
    time: "Varies",
    popular: true,
    documents: ["Identity Proof", "Address Proof", "Application Form"],
    eligibility: "Residents who need official proof of their place of residence.",
    whoShouldApply: "Citizens who need residence proof for education, employment, government services or other official purposes.",
    steps: [
      "Check whether you meet the residence requirements.",
      "Prepare the required identity and address documents.",
      "Complete the application form.",
      "Submit the application through the applicable portal or office.",
      "Wait for verification and approval.",
      "Download or collect the certificate."
    ],
    visitLevel: "Maybe",
    office: "Taluka / Mamlatdar / Relevant Local Authority Office",
    jurisdiction: "Apply through the authority responsible for your area of residence.",
    nextSteps: [
      "Application will be reviewed.",
      "Documents may be verified.",
      "Additional information may be requested.",
      "Certificate will be issued after approval."
    ]
  },
  {
    id: "income",
    name: "Income Certificate",
    category: "Certificates",
    icon: "💰",
    description: "Official certificate showing a person's or family's income.",
    process: "Online / Office",
    time: "Varies",
    popular: true,
    documents: ["Identity Proof", "Address Proof", "Income-related Proof", "Application Form"],
    eligibility: "Applicants who need official proof of income for a government or institutional purpose.",
    whoShouldApply: "Citizens requiring income verification for scholarships, benefits, admissions or other official purposes.",
    steps: [
      "Check the purpose for which the income certificate is required.",
      "Collect identity, address and income-related documents.",
      "Fill in the application details carefully.",
      "Submit the application online or at the responsible office.",
      "Complete verification if requested.",
      "Receive or download the certificate after approval."
    ],
    visitLevel: "Maybe",
    office: "Taluka / Mamlatdar / Relevant Revenue Office",
    jurisdiction: "Use the revenue authority responsible for your residential area.",
    nextSteps: [
      "Application is checked by the department.",
      "Documents may be verified.",
      "Officer may request clarification if required.",
      "Approved certificate becomes available."
    ]
  },
  {
    id: "birth",
    name: "Birth Certificate",
    category: "Certificates",
    icon: "👶",
    description: "Official record of a person's birth.",
    process: "Online / Office",
    time: "Varies",
    popular: true,
    documents: ["Identity Proof", "Birth-related Record", "Application Form"],
    eligibility: "Persons requiring an official birth record or certified copy.",
    whoShouldApply: "Parents, guardians or individuals requiring birth registration or a certified copy.",
    steps: [
      "Identify the authority holding the birth record.",
      "Keep available birth-related information and supporting documents.",
      "Complete the application.",
      "Submit it through the applicable channel.",
      "Wait for record verification.",
      "Collect or download the certificate."
    ],
    visitLevel: "Maybe",
    office: "Municipal / Panchayat / Birth & Death Registration Authority",
    jurisdiction: "The authority responsible for the place where the birth was registered.",
    nextSteps: [
      "Record details are checked.",
      "Supporting information may be verified.",
      "Certificate is prepared after approval."
    ]
  },
  {
    id: "death",
    name: "Death Certificate",
    category: "Certificates",
    icon: "📄",
    description: "Official record of a person's death.",
    process: "Online / Office",
    time: "Varies",
    popular: false,
    documents: ["Identity Proof", "Death-related Record", "Application Form"],
    eligibility: "Family members or authorized persons requiring an official death record.",
    whoShouldApply: "Family members or legally authorized applicants.",
    steps: [
      "Identify the authority maintaining the death record.",
      "Collect the available death-related documents.",
      "Complete the application.",
      "Submit the application.",
      "Wait for verification.",
      "Collect or download the certificate."
    ],
    visitLevel: "Maybe",
    office: "Municipal / Panchayat / Birth & Death Registration Authority",
    jurisdiction: "Authority responsible for the place where the death was registered.",
    nextSteps: [
      "Record is verified.",
      "Application may be reviewed by an officer.",
      "Certificate is issued after approval."
    ]
  },
  {
    id: "caste",
    name: "Caste Certificate",
    category: "Certificates",
    icon: "📜",
    description: "Certificate used to establish caste status for eligible purposes.",
    process: "Online / Office",
    time: "Varies",
    popular: true,
    documents: ["Identity Proof", "Address Proof", "Supporting Caste Documents", "Application Form"],
    eligibility: "Applicants who need official caste-status verification.",
    whoShouldApply: "Eligible citizens requiring caste certification for education, employment or government benefits.",
    steps: [
      "Check the applicable eligibility requirements.",
      "Collect identity, address and supporting caste documents.",
      "Complete the application.",
      "Submit the application to the responsible authority.",
      "Respond to verification requests if any.",
      "Receive the certificate after approval."
    ],
    visitLevel: "Maybe",
    office: "Revenue / Taluka / Competent Caste Certificate Authority",
    jurisdiction: "Authority responsible for your area and applicable records.",
    nextSteps: [
      "Documents are reviewed.",
      "Records may be verified.",
      "Further verification may be requested.",
      "Certificate is issued after approval."
    ]
  },
  {
    id: "senior",
    name: "Senior Citizen Certificate",
    category: "Certificates",
    icon: "👴",
    description: "Certificate or proof used for senior citizen related services.",
    process: "Online / Office",
    time: "Varies",
    popular: false,
    documents: ["Identity Proof", "Age Proof", "Address Proof", "Application Form"],
    eligibility: "Citizens meeting the applicable senior citizen age requirement.",
    whoShouldApply: "Eligible senior citizens or their authorized representatives.",
    steps: [
      "Confirm age eligibility.",
      "Prepare identity, age and address proof.",
      "Complete the application.",
      "Submit it through the applicable authority.",
      "Complete verification if required.",
      "Receive the certificate or acknowledgement."
    ],
    visitLevel: "Maybe",
    office: "Relevant Local Government / Social Welfare Authority",
    jurisdiction: "Use the authority responsible for your residential area.",
    nextSteps: [
      "Application is reviewed.",
      "Age and identity information may be verified.",
      "Certificate or acknowledgement is issued."
    ]
  },
  {
    id: "domicile",
    name: "Domicile Certificate",
    category: "Certificates",
    icon: "🏡",
    description: "Proof of domicile or permanent residence for eligible purposes.",
    process: "Online / Office",
    time: "Varies",
    popular: false,
    documents: ["Identity Proof", "Address Proof", "Residence-related Documents", "Application Form"],
    eligibility: "Applicants meeting the applicable domicile requirements.",
    whoShouldApply: "Citizens who need official domicile proof.",
    steps: [
      "Check domicile eligibility.",
      "Prepare supporting documents.",
      "Fill in the application.",
      "Submit through the applicable authority.",
      "Complete verification if requested.",
      "Receive the certificate."
    ],
    visitLevel: "Maybe",
    office: "Revenue / Taluka / Competent Local Authority",
    jurisdiction: "Authority responsible for your domicile records.",
    nextSteps: [
      "Documents are reviewed.",
      "Residence information may be verified.",
      "Certificate is issued after approval."
    ]
  },
  {
    id: "disability",
    name: "Disability Certificate",
    category: "Certificates",
    icon: "♿",
    description: "Official disability certification for eligible citizens.",
    process: "Online / Medical / Office",
    time: "Varies",
    popular: false,
    documents: ["Identity Proof", "Medical Records", "Address Proof", "Application Form"],
    eligibility: "Persons seeking official disability assessment and certification.",
    whoShouldApply: "Eligible persons or authorized representatives.",
    steps: [
      "Register or apply through the applicable system.",
      "Prepare identity and medical records.",
      "Attend assessment if required.",
      "Complete verification.",
      "Wait for certification.",
      "Download or collect the certificate."
    ],
    visitLevel: "Yes",
    office: "Designated Government Hospital / Medical Authority",
    jurisdiction: "Use the designated medical authority serving your area.",
    nextSteps: [
      "Medical assessment may be conducted.",
      "Records are reviewed.",
      "Certificate is issued after the required process."
    ]
  },
  {
    id: "marriage",
    name: "Marriage Certificate",
    category: "Certificates",
    icon: "💍",
    description: "Official registration and proof of marriage.",
    process: "Online / Office",
    time: "Varies",
    popular: false,
    documents: ["Identity Proof", "Address Proof", "Marriage-related Documents", "Photographs"],
    eligibility: "Couples eligible to register their marriage under the applicable law.",
    whoShouldApply: "Married couples requiring official registration or a certified marriage record.",
    steps: [
      "Check the applicable registration requirements.",
      "Prepare identity, address and marriage documents.",
      "Complete the registration application.",
      "Submit documents and application.",
      "Attend verification/appointment if required.",
      "Receive the marriage certificate."
    ],
    visitLevel: "Maybe",
    office: "Marriage Registrar / Sub-Registrar Office",
    jurisdiction: "Use the registrar having jurisdiction under the applicable rules.",
    nextSteps: [
      "Application and documents are verified.",
      "Appointment or physical verification may be required.",
      "Certificate is issued after successful registration."
    ]
  },
  {
    id: "noncreamy",
    name: "Non-Creamy Layer Certificate",
    category: "Certificates",
    icon: "📑",
    description: "Certificate used to establish non-creamy-layer eligibility where applicable.",
    process: "Online / Office",
    time: "Varies",
    popular: false,
    documents: ["Identity Proof", "Address Proof", "Income / Family Documents", "Application Form"],
    eligibility: "Applicants meeting the applicable category and income conditions.",
    whoShouldApply: "Eligible applicants requiring the certificate for education, employment or benefits.",
    steps: [
      "Check current eligibility conditions.",
      "Collect family and income-related documents.",
      "Complete the application.",
      "Submit to the responsible authority.",
      "Complete verification.",
      "Receive the certificate."
    ],
    visitLevel: "Maybe",
    office: "Revenue / Taluka / Competent Authority",
    jurisdiction: "Authority responsible for your residential area.",
    nextSteps: [
      "Income and family details are checked.",
      "Supporting documents may be verified.",
      "Certificate is issued after approval."
    ]
  },

  {
    id: "aadhaar",
    name: "Aadhaar Services",
    category: "Identity & Documents",
    icon: "🪪",
    description: "Aadhaar enrolment and selected update-related services.",
    process: "Online / Centre",
    time: "Varies",
    popular: true,
    documents: ["Identity Proof", "Address Proof", "Supporting Document"],
    eligibility: "Depends on the specific Aadhaar service being requested.",
    whoShouldApply: "Residents requiring Aadhaar enrolment or supported update services.",
    steps: [
      "Identify the exact Aadhaar service required.",
      "Check the current document requirements.",
      "Locate the applicable authorised service centre if physical presence is needed.",
      "Carry original supporting documents when required.",
      "Complete verification or biometric steps if applicable.",
      "Keep the acknowledgement for tracking."
    ],
    visitLevel: "Maybe",
    office: "Authorised Aadhaar Enrolment / Update Centre",
    jurisdiction: "Use an authorised centre that provides the required service.",
    nextSteps: [
      "Request is processed.",
      "Verification may be performed.",
      "Use the acknowledgement details to check status where available."
    ]
  },
  {
    id: "pan",
    name: "PAN Card",
    category: "Identity & Documents",
    icon: "💳",
    description: "PAN application and related services.",
    process: "Online",
    time: "Varies",
    popular: true,
    documents: ["Identity Proof", "Address Proof", "Photograph", "Application Details"],
    eligibility: "Applicants requiring a PAN or applicable PAN service.",
    whoShouldApply: "Individuals or entities requiring PAN-related services.",
    steps: [
      "Select the appropriate PAN service.",
      "Prepare the required identity and address information.",
      "Complete the application.",
      "Submit supporting information.",
      "Complete verification if required.",
      "Track the application using the provided reference."
    ],
    visitLevel: "No",
    office: "Authorised PAN Service Provider / Online Service",
    jurisdiction: "Usually handled through the authorised PAN service channel.",
    nextSteps: [
      "Application is validated.",
      "Documents/details may be verified.",
      "PAN is processed and delivered or made available as applicable."
    ]
  },
  {
    id: "voter",
    name: "Voter ID",
    category: "Identity & Documents",
    icon: "🗳️",
    description: "Voter registration and related electoral services.",
    process: "Online / Office",
    time: "Varies",
    popular: true,
    documents: ["Identity Proof", "Address Proof", "Age-related Proof"],
    eligibility: "Eligible citizens seeking voter registration or supported electoral services.",
    whoShouldApply: "Eligible citizens requiring voter registration, correction or related services.",
    steps: [
      "Select the required voter service.",
      "Complete the application.",
      "Upload or provide required documents.",
      "Submit the application.",
      "Complete verification if required.",
      "Track the request."
    ],
    visitLevel: "Maybe",
    office: "Election Office / BLO / Relevant Electoral Authority",
    jurisdiction: "Use the electoral authority for your registered residential area.",
    nextSteps: [
      "Application is reviewed.",
      "Field verification may happen.",
      "Electoral record is updated after approval."
    ]
  },
  {
    id: "passport",
    name: "Passport",
    category: "Identity & Documents",
    icon: "🌐",
    description: "Passport application and related services.",
    process: "Online / Appointment",
    time: "Varies",
    popular: true,
    documents: ["Identity Proof", "Address Proof", "Supporting Documents"],
    eligibility: "Applicants meeting the requirements for the selected passport service.",
    whoShouldApply: "Citizens applying for a passport or passport-related service.",
    steps: [
      "Select the required passport service.",
      "Complete the online application.",
      "Pay applicable charges if required.",
      "Schedule an appointment where applicable.",
      "Visit the designated centre with original documents.",
      "Complete verification and track the application."
    ],
    visitLevel: "Yes",
    office: "Passport Seva / Designated Passport Centre",
    jurisdiction: "Select the centre available for your residential jurisdiction.",
    nextSteps: [
      "Application is checked.",
      "Document verification is performed.",
      "Police verification may apply depending on the case.",
      "Passport is issued after successful processing."
    ]
  },
  {
    id: "ration",
    name: "Ration Card",
    category: "Identity & Documents",
    icon: "🛒",
    description: "Ration card application and related household services.",
    process: "Online / Office",
    time: "Varies",
    popular: false,
    documents: ["Identity Proof", "Address Proof", "Family Details", "Application Form"],
    eligibility: "Households meeting applicable ration-card conditions.",
    whoShouldApply: "Eligible households requiring ration-card services.",
    steps: [
      "Identify the appropriate ration-card service.",
      "Prepare family and address information.",
      "Complete the application.",
      "Submit supporting documents.",
      "Complete verification if requested.",
      "Track the application."
    ],
    visitLevel: "Maybe",
    office: "Civil Supplies / Food & Civil Supplies Office",
    jurisdiction: "Use the department responsible for your area.",
    nextSteps: [
      "Household details are verified.",
      "Application is processed.",
      "Card/status is updated after approval."
    ]
  },
  {
    id: "dl",
    name: "Driving Licence",
    category: "Identity & Documents",
    icon: "🚗",
    description: "Driving licence application and related services.",
    process: "Online / RTO",
    time: "Varies",
    popular: true,
    documents: ["Identity Proof", "Address Proof", "Age Proof", "Application Details"],
    eligibility: "Applicants meeting the requirements for the selected licence service.",
    whoShouldApply: "Eligible applicants seeking a driving licence.",
    steps: [
      "Select the required licence service.",
      "Complete the application.",
      "Submit required documents.",
      "Schedule an appointment or test where required.",
      "Visit the RTO if physical verification/testing is required.",
      "Track the application."
    ],
    visitLevel: "Yes",
    office: "Regional Transport Office (RTO)",
    jurisdiction: "Use the RTO assigned to your residential jurisdiction.",
    nextSteps: [
      "Application is checked.",
      "Learner/driving test may be required depending on service.",
      "Licence is processed after successful completion."
    ]
  },
  {
    id: "vehicle",
    name: "Vehicle Registration",
    category: "Identity & Documents",
    icon: "🚙",
    description: "Vehicle registration and related transport services.",
    process: "Online / RTO",
    time: "Varies",
    popular: false,
    documents: ["Vehicle Documents", "Identity Proof", "Address Proof", "Insurance / Supporting Documents"],
    eligibility: "Vehicle owners requiring registration-related services.",
    whoShouldApply: "Vehicle owners or authorised representatives.",
    steps: [
      "Identify the exact registration service.",
      "Prepare vehicle and owner documents.",
      "Submit the application.",
      "Complete inspection if required.",
      "Pay applicable charges where required.",
      "Track the registration request."
    ],
    visitLevel: "Maybe",
    office: "Regional Transport Office (RTO)",
    jurisdiction: "RTO responsible for the vehicle/owner jurisdiction as applicable.",
    nextSteps: [
      "Documents are verified.",
      "Vehicle inspection may be required.",
      "Registration is updated after approval."
    ]
  },

  {
    id: "pension",
    name: "Pension",
    category: "Government Benefits",
    icon: "👵",
    description: "Government pension and social assistance services.",
    process: "Online / Office",
    time: "Varies",
    popular: true,
    documents: ["Identity Proof", "Address Proof", "Bank Details", "Eligibility Documents"],
    eligibility: "Depends on the specific pension scheme and current eligibility rules.",
    whoShouldApply: "Eligible beneficiaries under the applicable pension scheme.",
    steps: [
      "Identify the exact pension scheme.",
      "Check eligibility conditions.",
      "Prepare identity, bank and supporting documents.",
      "Submit the application.",
      "Complete verification.",
      "Track approval and payment status."
    ],
    visitLevel: "Maybe",
    office: "Social Welfare / Relevant Government Department",
    jurisdiction: "Department responsible for your residential area and scheme.",
    nextSteps: [
      "Eligibility is checked.",
      "Documents are verified.",
      "Application is approved or clarification is requested.",
      "Payment begins after successful approval."
    ]
  },
  {
    id: "pmkisan",
    name: "PM-KISAN",
    category: "Government Benefits",
    icon: "🌾",
    description: "Farmer support service under the applicable government scheme.",
    process: "Online / Office",
    time: "Varies",
    popular: true,
    documents: ["Identity Proof", "Land / Farmer Details", "Bank Details"],
    eligibility: "Depends on current scheme eligibility rules.",
    whoShouldApply: "Eligible farmers covered by the scheme.",
    steps: [
      "Check current scheme eligibility.",
      "Prepare farmer, land and bank details.",
      "Complete registration or correction.",
      "Submit required information.",
      "Complete verification if required.",
      "Check beneficiary/payment status."
    ],
    visitLevel: "Maybe",
    office: "Agriculture / Revenue / Designated Farmer Service Centre",
    jurisdiction: "Use the department responsible for your agricultural records.",
    nextSteps: [
      "Farmer and land information may be verified.",
      "Application is processed.",
      "Beneficiary status is updated after approval."
    ]
  },
  {
    id: "ayushman",
    name: "Ayushman Bharat",
    category: "Government Benefits",
    icon: "🏥",
    description: "Health scheme eligibility and beneficiary services.",
    process: "Online / Help Desk",
    time: "Varies",
    popular: true,
    documents: ["Identity Proof", "Beneficiary Details"],
    eligibility: "Eligibility depends on the applicable scheme database and current rules.",
    whoShouldApply: "Citizens seeking to check or use applicable health scheme benefits.",
    steps: [
      "Check beneficiary eligibility.",
      "Keep identity information ready.",
      "Visit an authorised help desk if required.",
      "Complete verification.",
      "Obtain or use the applicable beneficiary facility."
    ],
    visitLevel: "Maybe",
    office: "Authorised Health Facility / Scheme Help Desk",
    jurisdiction: "Use an authorised facility participating in the applicable scheme.",
    nextSteps: [
      "Eligibility is checked.",
      "Identity is verified.",
      "Eligible beneficiaries can access applicable services."
    ]
  },
  {
    id: "scholarship",
    name: "Government Scholarship",
    category: "Government Benefits",
    icon: "🎓",
    description: "Scholarship application and status support.",
    process: "Online",
    time: "Varies",
    popular: true,
    documents: ["Identity Proof", "Academic Records", "Income / Category Documents", "Bank Details"],
    eligibility: "Depends on the scholarship scheme and current academic criteria.",
    whoShouldApply: "Students meeting the requirements of the selected scholarship.",
    steps: [
      "Select the scholarship scheme.",
      "Check eligibility.",
      "Prepare academic, identity and financial documents.",
      "Complete the online application.",
      "Submit and verify details.",
      "Track application and payment status."
    ],
    visitLevel: "Maybe",
    office: "Educational Institution / Scholarship Authority",
    jurisdiction: "Follow the authority specified by the scholarship scheme.",
    nextSteps: [
      "Application is verified by the institution/authority.",
      "Documents may be checked.",
      "Scholarship is sanctioned after approval."
    ]
  },

  {
    id: "property-tax",
    name: "Property Tax",
    category: "Property & Utilities",
    icon: "🏢",
    description: "Property tax assessment, payment and related services.",
    process: "Online / Office",
    time: "Varies",
    popular: false,
    documents: ["Property Details", "Identity Proof", "Previous Tax Details"],
    eligibility: "Property owners or authorised persons requiring property-tax services.",
    whoShouldApply: "Property owners or authorised representatives.",
    steps: [
      "Identify the property and tax service required.",
      "Keep property details ready.",
      "Check outstanding dues if applicable.",
      "Submit or complete the required service.",
      "Make payment where applicable.",
      "Save the receipt."
    ],
    visitLevel: "No",
    office: "Municipal Council / Local Authority",
    jurisdiction: "Local authority where the property is located.",
    nextSteps: [
      "Property details are checked.",
      "Payment/assessment is recorded.",
      "Receipt or updated status is provided."
    ]
  },
  {
    id: "land",
    name: "Land Records",
    category: "Property & Utilities",
    icon: "🗺️",
    description: "Access and requests related to land records.",
    process: "Online / Office",
    time: "Varies",
    popular: false,
    documents: ["Property / Survey Details", "Identity Proof", "Supporting Documents"],
    eligibility: "Landowners or authorised persons requiring applicable land records.",
    whoShouldApply: "Landowners, buyers or authorised representatives.",
    steps: [
      "Identify the required land record.",
      "Keep survey/property details ready.",
      "Search or apply through the applicable system.",
      "Submit supporting documents if required.",
      "Complete verification if required.",
      "Obtain the record."
    ],
    visitLevel: "Maybe",
    office: "Revenue / Land Records Office",
    jurisdiction: "Authority responsible for the location of the land.",
    nextSteps: [
      "Land details are checked.",
      "Records may be verified.",
      "Requested record is made available."
    ]
  },
  {
    id: "building",
    name: "Building Permission",
    category: "Property & Utilities",
    icon: "🏗️",
    description: "Application for applicable building and construction permissions.",
    process: "Online / Office",
    time: "Varies",
    popular: false,
    documents: ["Property Documents", "Building Plan", "Identity Proof", "Supporting Documents"],
    eligibility: "Property owners/developers meeting applicable planning and building requirements.",
    whoShouldApply: "Property owners or authorised professionals.",
    steps: [
      "Confirm applicable planning requirements.",
      "Prepare property and building documents.",
      "Prepare the required plan.",
      "Submit the application.",
      "Respond to scrutiny or correction requests.",
      "Receive approval or permission."
    ],
    visitLevel: "Maybe",
    office: "Planning Authority / Local Authority",
    jurisdiction: "Authority having jurisdiction over the property.",
    nextSteps: [
      "Plans are scrutinised.",
      "Corrections may be requested.",
      "Approval is issued after requirements are satisfied."
    ]
  },
  {
    id: "water",
    name: "Water Connection",
    category: "Property & Utilities",
    icon: "💧",
    description: "Application for a new or applicable water connection service.",
    process: "Online / Office",
    time: "Varies",
    popular: false,
    documents: ["Identity Proof", "Address / Property Proof", "Application Form"],
    eligibility: "Property owners/occupiers meeting applicable utility requirements.",
    whoShouldApply: "Eligible property owners or authorised applicants.",
    steps: [
      "Check service availability.",
      "Prepare property and identity documents.",
      "Submit the connection request.",
      "Complete inspection if required.",
      "Pay applicable charges.",
      "Wait for connection completion."
    ],
    visitLevel: "Maybe",
    office: "Local Water Supply / Utility Authority",
    jurisdiction: "Utility authority serving the property location.",
    nextSteps: [
      "Request is reviewed.",
      "Site inspection may be conducted.",
      "Connection is provided after approval and required work."
    ]
  },
  {
    id: "electricity",
    name: "Electricity Connection",
    category: "Property & Utilities",
    icon: "⚡",
    description: "Application for electricity connection and related services.",
    process: "Online / Office",
    time: "Varies",
    popular: true,
    documents: ["Identity Proof", "Address / Property Proof", "Application Details"],
    eligibility: "Applicants meeting the electricity utility's applicable connection requirements.",
    whoShouldApply: "Eligible property owners/occupiers or authorised applicants.",
    steps: [
      "Select the required electricity service.",
      "Prepare identity and property documents.",
      "Submit the request.",
      "Complete inspection if applicable.",
      "Pay applicable charges.",
      "Wait for connection/activation."
    ],
    visitLevel: "Maybe",
    office: "Electricity Distribution Utility / Service Centre",
    jurisdiction: "Utility serving the property location.",
    nextSteps: [
      "Application is checked.",
      "Site inspection may occur.",
      "Connection is installed/activated after approval."
    ]
  },
  {
    id: "trade",
    name: "Trade / Business Licence",
    category: "Property & Utilities",
    icon: "🏪",
    description: "Licence-related services for eligible businesses.",
    process: "Online / Office",
    time: "Varies",
    popular: false,
    documents: ["Identity Proof", "Business Details", "Address Proof", "Supporting Documents"],
    eligibility: "Businesses meeting applicable local licensing requirements.",
    whoShouldApply: "Business owners or authorised representatives.",
    steps: [
      "Identify the required licence.",
      "Check local requirements.",
      "Prepare business and premises documents.",
      "Submit the application.",
      "Complete inspection if applicable.",
      "Receive the licence after approval."
    ],
    visitLevel: "Maybe",
    office: "Municipal / Local Business Licensing Authority",
    jurisdiction: "Local authority where the business premises are located.",
    nextSteps: [
      "Business details are checked.",
      "Inspection may be conducted.",
      "Licence is issued after approval."
    ]
  },

  {
    id: "bonafide",
    name: "Bonafide Certificate",
    category: "Education",
    icon: "🎓",
    description: "Certificate confirming a student's association with an institution.",
    process: "Institution",
    time: "Varies",
    popular: false,
    documents: ["Student ID", "Application / Request"],
    eligibility: "Students currently associated with the relevant institution.",
    whoShouldApply: "Students requiring official institutional confirmation.",
    steps: [
      "Check your institution's procedure.",
      "Prepare student identification.",
      "Submit the request.",
      "Wait for institutional verification.",
      "Collect the certificate."
    ],
    visitLevel: "Maybe",
    office: "Educational Institution / Student Section",
    jurisdiction: "Your current educational institution.",
    nextSteps: [
      "Student details are verified.",
      "Certificate is prepared.",
      "Certificate is issued by the institution."
    ]
  },
  {
    id: "migration",
    name: "Migration Certificate",
    category: "Education",
    icon: "📚",
    description: "Migration-related certificate for eligible students.",
    process: "Institution / Board",
    time: "Varies",
    popular: false,
    documents: ["Student ID", "Academic Records", "Application"],
    eligibility: "Students meeting the issuing authority's requirements.",
    whoShouldApply: "Students changing institutions or education boards where applicable.",
    steps: [
      "Confirm the certificate requirement.",
      "Collect academic records.",
      "Submit the application.",
      "Complete institutional verification.",
      "Collect the certificate."
    ],
    visitLevel: "Maybe",
    office: "School / College / Education Board",
    jurisdiction: "Authority associated with your previous institution.",
    nextSteps: [
      "Academic details are checked.",
      "Request is processed.",
      "Certificate is issued."
    ]
  },
  {
    id: "education",
    name: "Education Certificate",
    category: "Education",
    icon: "📃",
    description: "Educational records and certificates from the relevant institution.",
    process: "Institution",
    time: "Varies",
    popular: false,
    documents: ["Student ID", "Academic Details", "Application"],
    eligibility: "Students/alumni entitled to the requested educational record.",
    whoShouldApply: "Students or alumni.",
    steps: [
      "Identify the exact certificate required.",
      "Contact the relevant institution section.",
      "Submit the request.",
      "Complete verification.",
      "Collect or receive the certificate."
    ],
    visitLevel: "Maybe",
    office: "Educational Institution",
    jurisdiction: "Institution holding the academic record.",
    nextSteps: [
      "Academic record is verified.",
      "Certificate is prepared.",
      "Certificate is issued."
    ]
  },
  {
    id: "exam",
    name: "Exam / Application Services",
    category: "Education",
    icon: "📝",
    description: "Support for eligible education and examination applications.",
    process: "Online / Institution",
    time: "Varies",
    popular: false,
    documents: ["Student ID", "Academic Details", "Required Documents"],
    eligibility: "Depends on the selected examination/application service.",
    whoShouldApply: "Eligible students or candidates.",
    steps: [
      "Identify the required examination service.",
      "Check eligibility and deadline.",
      "Prepare required information.",
      "Complete the application.",
      "Submit and save acknowledgement.",
      "Track updates."
    ],
    visitLevel: "Maybe",
    office: "Educational Institution / Examination Authority",
    jurisdiction: "Authority conducting the examination or service.",
    nextSteps: [
      "Application is reviewed.",
      "Admit card/status may be released.",
      "Further instructions are communicated by the authority."
    ]
  },

  {
    id: "learning",
    name: "Learning Licence",
    category: "Transport",
    icon: "🚘",
    description: "Application for a learner's licence.",
    process: "Online / RTO",
    time: "Varies",
    popular: true,
    documents: ["Identity Proof", "Address Proof", "Age Proof"],
    eligibility: "Applicants meeting the applicable age and licensing requirements.",
    whoShouldApply: "Eligible applicants intending to obtain a learner's licence.",
    steps: [
      "Check licence category and eligibility.",
      "Complete the application.",
      "Submit documents.",
      "Complete the required test/appointment.",
      "Receive the learner licence after successful processing."
    ],
    visitLevel: "Maybe",
    office: "Regional Transport Office (RTO)",
    jurisdiction: "RTO serving the applicant's residential jurisdiction.",
    nextSteps: [
      "Application is verified.",
      "Required test may be conducted.",
      "Learner licence is issued after successful completion."
    ]
  },
  {
    id: "dl-renewal",
    name: "Driving Licence Renewal",
    category: "Transport",
    icon: "🔄",
    description: "Renewal of an existing driving licence.",
    process: "Online / RTO",
    time: "Varies",
    popular: false,
    documents: ["Existing Driving Licence", "Identity Proof", "Address Proof"],
    eligibility: "Existing licence holders requiring renewal.",
    whoShouldApply: "Eligible driving licence holders.",
    steps: [
      "Check the current renewal requirements.",
      "Complete the renewal application.",
      "Submit required documents.",
      "Complete medical/test requirements if applicable.",
      "Pay applicable charges.",
      "Track the renewed licence."
    ],
    visitLevel: "Maybe",
    office: "Regional Transport Office (RTO)",
    jurisdiction: "Applicable RTO based on the licence/service.",
    nextSteps: [
      "Application is reviewed.",
      "Additional verification may be required.",
      "Renewed licence is issued."
    ]
  },
  {
    id: "rc-transfer",
    name: "Vehicle RC Transfer",
    category: "Transport",
    icon: "🔁",
    description: "Transfer of vehicle registration ownership.",
    process: "Online / RTO",
    time: "Varies",
    popular: false,
    documents: ["Vehicle Registration", "Identity Proof", "Sale / Transfer Documents"],
    eligibility: "Vehicle owners/buyers meeting applicable transfer requirements.",
    whoShouldApply: "Buyer/seller or authorised representatives as applicable.",
    steps: [
      "Prepare transfer documents.",
      "Submit the ownership transfer application.",
      "Provide required vehicle and identity details.",
      "Complete verification if required.",
      "Pay applicable charges.",
      "Check updated registration status."
    ],
    visitLevel: "Maybe",
    office: "Regional Transport Office (RTO)",
    jurisdiction: "RTO having jurisdiction for the applicable vehicle/transaction.",
    nextSteps: [
      "Transfer documents are checked.",
      "Vehicle records are updated.",
      "Updated registration status becomes available."
    ]
  },
  {
    id: "road-tax",
    name: "Road Tax",
    category: "Transport",
    icon: "🛣️",
    description: "Road tax related services for eligible vehicles.",
    process: "Online / RTO",
    time: "Varies",
    popular: false,
    documents: ["Vehicle Registration", "Identity Details", "Tax Details"],
    eligibility: "Vehicle owners requiring applicable road-tax services.",
    whoShouldApply: "Vehicle owners or authorised representatives.",
    steps: [
      "Identify the applicable tax service.",
      "Keep vehicle details ready.",
      "Check dues.",
      "Complete payment/application.",
      "Save the receipt.",
      "Verify updated status."
    ],
    visitLevel: "No",
    office: "Regional Transport Office / Transport Department",
    jurisdiction: "Authority responsible for the vehicle registration.",
    nextSteps: [
      "Payment is recorded.",
      "Vehicle tax status is updated.",
      "Receipt is retained for future reference."
    ]
  },

  {
    id: "business",
    name: "Business Registration",
    category: "Business & Employment",
    icon: "💼",
    description: "Business registration and related setup services.",
    process: "Online / Office",
    time: "Varies",
    popular: true,
    documents: ["Identity Proof", "Business Address Proof", "Business Details", "Supporting Documents"],
    eligibility: "Depends on the selected business structure and registration.",
    whoShouldApply: "Entrepreneurs and eligible business entities.",
    steps: [
      "Select the required business registration.",
      "Check applicable eligibility and structure.",
      "Prepare business and identity documents.",
      "Complete the application.",
      "Respond to verification queries.",
      "Receive registration confirmation."
    ],
    visitLevel: "Maybe",
    office: "Relevant Business Registration Authority",
    jurisdiction: "Authority depends on the business type and place of operation.",
    nextSteps: [
      "Application is checked.",
      "Additional information may be requested.",
      "Registration is approved after successful verification."
    ]
  },
  {
    id: "employment",
    name: "Employment Registration",
    category: "Business & Employment",
    icon: "👨‍💼",
    description: "Employment-related registration and support services.",
    process: "Online / Office",
    time: "Varies",
    popular: false,
    documents: ["Identity Proof", "Address Proof", "Education / Employment Details"],
    eligibility: "Depends on the specific employment service.",
    whoShouldApply: "Eligible job seekers or workers requiring the service.",
    steps: [
      "Select the required employment service.",
      "Prepare personal and employment information.",
      "Complete registration/application.",
      "Submit supporting documents.",
      "Verify details if requested.",
      "Track the application."
    ],
    visitLevel: "Maybe",
    office: "Employment Exchange / Labour Department",
    jurisdiction: "Department serving your residential or employment area.",
    nextSteps: [
      "Profile/application is reviewed.",
      "Documents may be verified.",
      "Registration/status is updated."
    ]
  },
  {
    id: "shop",
    name: "Shop & Establishment",
    category: "Business & Employment",
    icon: "🏬",
    description: "Registration-related service for shops and establishments.",
    process: "Online / Office",
    time: "Varies",
    popular: false,
    documents: ["Identity Proof", "Business Address Proof", "Business Details"],
    eligibility: "Businesses covered by applicable shop and establishment requirements.",
    whoShouldApply: "Shop owners and eligible establishments.",
    steps: [
      "Check whether the establishment requires registration.",
      "Prepare business and premises information.",
      "Complete the application.",
      "Submit supporting documents.",
      "Respond to verification requests.",
      "Receive registration/certificate."
    ],
    visitLevel: "Maybe",
    office: "Labour / Shops & Establishments Authority",
    jurisdiction: "Authority responsible for the establishment's location.",
    nextSteps: [
      "Application is reviewed.",
      "Inspection may apply.",
      "Registration is issued after approval."
    ]
  },
  {
    id: "housing",
    name: "Government Housing Schemes",
    category: "Government Benefits",
    icon: "🏘️",
    description: "Information and application support for eligible housing schemes.",
    process: "Online / Office",
    time: "Varies",
    popular: false,
    documents: ["Identity Proof", "Address Proof", "Income / Eligibility Documents"],
    eligibility: "Depends on the selected housing scheme and current rules.",
    whoShouldApply: "Applicants meeting the applicable housing scheme criteria.",
    steps: [
      "Identify the applicable housing scheme.",
      "Check eligibility.",
      "Prepare required documents.",
      "Submit the application.",
      "Complete verification.",
      "Track the application."
    ],
    visitLevel: "Maybe",
    office: "Housing / Local Government Authority",
    jurisdiction: "Authority responsible for the scheme and applicant's area.",
    nextSteps: [
      "Eligibility and documents are checked.",
      "Application may undergo field verification.",
      "Benefit is approved according to scheme rules."
    ]
  },
  {
    id: "widow",
    name: "Widow Assistance",
    category: "Government Benefits",
    icon: "🤝",
    description: "Support service for eligible beneficiaries under applicable schemes.",
    process: "Online / Office",
    time: "Varies",
    popular: false,
    documents: ["Identity Proof", "Address Proof", "Bank Details", "Supporting Documents"],
    eligibility: "Depends on the applicable assistance scheme.",
    whoShouldApply: "Eligible beneficiaries or authorised representatives.",
    steps: [
      "Identify the applicable assistance scheme.",
      "Check eligibility.",
      "Prepare supporting documents.",
      "Submit the application.",
      "Complete verification.",
      "Track approval/payment status."
    ],
    visitLevel: "Maybe",
    office: "Social Welfare / Relevant Government Department",
    jurisdiction: "Department serving the beneficiary's area.",
    nextSteps: [
      "Documents and eligibility are verified.",
      "Application is processed.",
      "Assistance begins after approval."
    ]
  },
  {
    id: "old-age",
    name: "Old Age Assistance",
    category: "Government Benefits",
    icon: "🧓",
    description: "Government assistance services for eligible senior citizens.",
    process: "Online / Office",
    time: "Varies",
    popular: false,
    documents: ["Identity Proof", "Age Proof", "Address Proof", "Bank Details"],
    eligibility: "Depends on the current assistance scheme.",
    whoShouldApply: "Eligible senior citizens or authorised representatives.",
    steps: [
      "Identify the relevant assistance scheme.",
      "Check eligibility.",
      "Prepare age, identity and bank details.",
      "Submit the application.",
      "Complete verification.",
      "Track approval and payment."
    ],
    visitLevel: "Maybe",
    office: "Social Welfare / Local Government Department",
    jurisdiction: "Department responsible for the beneficiary's area.",
    nextSteps: [
      "Eligibility is verified.",
      "Application is processed.",
      "Approved assistance is released according to scheme rules."
    ]
  },
  {
    id: "labour",
    name: "Labour Registration",
    category: "Government Benefits",
    icon: "🧰",
    description: "Registration and support services for eligible workers.",
    process: "Online / Office",
    time: "Varies",
    popular: false,
    documents: ["Identity Proof", "Address Proof", "Employment Details"],
    eligibility: "Depends on the specific labour registration or scheme.",
    whoShouldApply: "Eligible workers.",
    steps: [
      "Select the applicable labour service.",
      "Check eligibility.",
      "Prepare worker and employment details.",
      "Submit the application.",
      "Complete verification.",
      "Track registration/status."
    ],
    visitLevel: "Maybe",
    office: "Labour Department / Worker Service Centre",
    jurisdiction: "Labour authority serving the worker's area.",
    nextSteps: [
      "Worker details are checked.",
      "Documents may be verified.",
      "Registration is activated after approval."
    ]
  }
];

/* =========================================================
   DEFAULT DATA
   ========================================================= */

const DEFAULT_DOCS = [
  {
    id: "identity",
    name: "Identity Proof",
    detail: "Keep a valid identity document ready."
  },
  {
    id: "address",
    name: "Address Proof",
    detail: "Keep a current address proof ready."
  },
  {
    id: "photo",
    name: "Passport-size Photograph",
    detail: "Keep recent photographs if required."
  },
  {
    id: "application",
    name: "Application Form",
    detail: "Complete the required application form."
  }
];

const OFFICES = {
  Certificates: {
    name: "Relevant Government / Local Authority Office",
    hours: "Office hours vary",
    location: "Check your local government office before visiting."
  },
  "Identity & Documents": {
    name: "Relevant Government Service Centre",
    hours: "Office hours vary",
    location: "Check the official service portal for your area."
  },
  "Government Benefits": {
    name: "Relevant Government Department / Service Centre",
    hours: "Office hours vary",
    location: "Check the official department before visiting."
  },
  "Property & Utilities": {
    name: "Local Authority / Utility Office",
    hours: "Office hours vary",
    location: "Check the responsible local office first."
  },
  Education: {
    name: "Relevant Educational Institution / Authority",
    hours: "Office hours vary",
    location: "Confirm the responsible institution."
  },
  Transport: {
    name: "Regional Transport Office (RTO)",
    hours: "Office hours vary",
    location: "Confirm your jurisdiction before visiting."
  },
  "Business & Employment": {
    name: "Relevant Business / Employment Department",
    hours: "Office hours vary",
    location: "Confirm the responsible department first."
  }
};

const CATEGORY_META = {
  Certificates: {
    eligibility: "Eligibility depends on the certificate and the applicant's circumstances.",
    visit: "Maybe"
  },
  "Identity & Documents": {
    eligibility: "Eligibility depends on the identity service selected.",
    visit: "Maybe"
  },
  "Government Benefits": {
    eligibility: "Eligibility depends on the current scheme rules.",
    visit: "Maybe"
  },
  "Property & Utilities": {
    eligibility: "Eligibility depends on the property or utility service.",
    visit: "Maybe"
  },
  Education: {
    eligibility: "Eligibility depends on the institution or examination authority.",
    visit: "Maybe"
  },
  Transport: {
    eligibility: "Eligibility depends on the vehicle or licence service.",
    visit: "Maybe"
  },
  "Business & Employment": {
    eligibility: "Eligibility depends on the business or employment service.",
    visit: "Maybe"
  }
};

function getService(id) {
  return SERVICES.find((item) => item.id === id) || SERVICES[0];
}

function enrichService(service) {
  if (!service) return SERVICES[0];

  const category = CATEGORY_META[service.category] || {};

  return {
    ...service,
    eligibility:
      service.eligibility ||
      category.eligibility ||
      "Check the latest official eligibility requirements.",
    whoShouldApply:
      service.whoShouldApply ||
      "Applicants who need this government service.",
    steps:
      service.steps ||
      [
        "Check eligibility.",
        "Prepare the required documents.",
        "Complete the application.",
        "Submit the application.",
        "Complete verification if requested.",
        "Track the application."
      ],
    visitLevel: service.visitLevel || category.visit || "Maybe",
    office:
      service.office ||
      OFFICES[service.category]?.name ||
      "Relevant Government Office",
    jurisdiction:
      service.jurisdiction ||
      OFFICES[service.category]?.location ||
      "Confirm the responsible authority for your area.",
    nextSteps:
      service.nextSteps ||
      [
        "Application is reviewed.",
        "Documents may be verified.",
        "Additional information may be requested.",
        "Service is completed after approval."
      ]
  };
}

function getServiceDocuments(service) {
  if (!service || !service.documents?.length) return DEFAULT_DOCS;

  return service.documents.map((name, index) => ({
    id: `${service.id}-${index}`,
    name,
    detail: "Check the latest official requirement before visiting."
  }));
}

/* =========================================================
   APP
   ========================================================= */

export default function App() {
  const [page, setPage] = useState("home");

  const [selectedService, setSelectedService] = useState(() => {
    return localStorage.getItem("govassist_service") || "income";
  });

  const [answers, setAnswers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("govassist_answers")) || {};
    } catch {
      return {};
    }
  });

  const [completedDocs, setCompletedDocs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("govassist_docs")) || [];
    } catch {
      return [];
    }
  });

  const [applications, setApplications] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("govassist_applications")) || [
          {
            id: "GA10245",
            service: "Income Certificate",
            date: "10 Sep 2026",
            status: "Under Processing",
            progress: 60,
            timeline: [
              { title: "Preparation Started", done: true },
              { title: "Documents Checked", done: true },
              { title: "Application Submitted", done: true },
              { title: "Department Verification", done: false },
              { title: "Service Completed", done: false }
            ]
          }
        ]
      );
    } catch {
      return [];
    }
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("govassist_notifications")) || [
          {
            id: 1,
            title: "Preparation reminder",
            text: "Complete your document checklist before visiting an office.",
            time: "Today"
          },
          {
            id: 2,
            title: "GovAssist tip",
            text: "Always verify requirements on the official government source.",
            time: "Today"
          }
        ]
      );
    } catch {
      return [];
    }
  });

  const [seniorMode, setSeniorMode] = useState(() => {
    return localStorage.getItem("govassist_senior") === "true";
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("govassist_language") || "English";
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [aiOpen, setAiOpen] = useState(false);

  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm GovAssist AI. Ask me about a government service, documents, eligibility, visiting an office, or your application."
    }
  ]);

  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("govassist_service", selectedService);
  }, [selectedService]);

  useEffect(() => {
    localStorage.setItem("govassist_answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("govassist_docs", JSON.stringify(completedDocs));
  }, [completedDocs]);

  useEffect(() => {
    localStorage.setItem(
      "govassist_applications",
      JSON.stringify(applications)
    );
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(
      "govassist_notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("govassist_senior", String(seniorMode));
  }, [seniorMode]);

  useEffect(() => {
    localStorage.setItem("govassist_language", language);
  }, [language]);

  const service = enrichService(getService(selectedService));
  const serviceDocs = getServiceDocuments(service);

  const completedCount = completedDocs.length;

  const readinessScore = Math.min(
    100,
    Math.round(
      (completedCount / Math.max(serviceDocs.length, 1)) * 70 +
        (Object.keys(answers).length / 5) * 30
    )
  );

  const categories = ["All", ...new Set(SERVICES.map((item) => item.category))];

  const filteredServices = useMemo(() => {
    return SERVICES.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const popularServices = SERVICES.filter((item) => item.popular);

  function go(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectService(id) {
    setSelectedService(id);
    setAnswers({});
    setCompletedDocs([]);
    go("service-detail");
  }

  function startService() {
    setAnswers({});
    setCompletedDocs([]);
    go("questions");
  }

  function toggleDocument(id) {
    setCompletedDocs((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  function calculateReadiness() {
    go("ready");
  }

  function submitApplication() {
    const newApplication = {
      id: `GA${Math.floor(10000 + Math.random() * 89999)}`,
      service: service.name,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }),
      status: "Preparation Started",
      progress: readinessScore,
      timeline: [
        { title: "Preparation Started", done: true },
        {
          title: "Documents Checked",
          done: readinessScore >= 50
        },
        {
          title: "Application Submitted",
          done: false
        },
        {
          title: "Department Verification",
          done: false
        },
        {
          title: "Service Completed",
          done: false
        }
      ]
    };

    setApplications((prev) => [newApplication, ...prev]);

    setNotifications((prev) => [
      {
        id: Date.now(),
        title: "Application saved",
        text: `Your ${service.name} preparation has been saved.`,
        time: "Just now"
      },
      ...prev
    ]);

    go("tracking");
  }

  function getVisitDecision() {
    if (service.visitLevel === "Yes") {
      return {
        title: "Office Visit Required",
        text: "This service normally requires physical verification, testing, appointment or document submission.",
        icon: "🏢",
        type: "warning"
      };
    }

    if (service.visitLevel === "No") {
      return {
        title: "You May Not Need to Visit",
        text: "This service can generally be started online. Verify the latest official instructions before proceeding.",
        icon: "✅",
        type: "success"
      };
    }

    if (readinessScore >= 80) {
      return {
        title: "You May Be Ready to Visit",
        text: "Your preparation looks good. Verify the office, jurisdiction and latest official requirements before travelling.",
        icon: "📍",
        type: "success"
      };
    }

    return {
      title: "Don't Visit Yet",
      text: "Complete more preparation and verify the requirements before travelling to an office.",
      icon: "⚠️",
      type: "warning"
    };
  }

  function getLocalAIReply(message) {
    const lower = message.toLowerCase();

    const matched = SERVICES.find(
      (item) =>
        lower.includes(item.name.toLowerCase()) ||
        lower.includes(item.id.toLowerCase())
    );

    if (matched) {
      const s = enrichService(matched);

      return `${s.name}

Eligibility:
${s.eligibility}

Documents:
${s.documents.join(", ")}

Visit:
${s.visitLevel}

Office:
${s.office}

Tip: ${s.jurisdiction}`;
    }

    if (
      lower.includes("hello") ||
      lower.includes("hi") ||
      lower.includes("hey")
    ) {
      return "Hello! I can help you understand government services, eligibility, documents, office visits and application steps.";
    }

    if (lower.includes("document")) {
      return `For ${service.name}, commonly useful documents include:\n\n${service.documents
        .map((item) => `• ${item}`)
        .join("\n")}\n\nAlways verify the latest official requirement.`;
    }

    if (lower.includes("eligibility") || lower.includes("eligible")) {
      return `Eligibility for ${service.name}:\n\n${service.eligibility}\n\n${service.whoShouldApply}`;
    }

    if (
      lower.includes("visit") ||
      lower.includes("office") ||
      lower.includes("where")
    ) {
      return `For ${service.name}:\n\nVisit decision: ${service.visitLevel}\n\nOffice: ${service.office}\n\nJurisdiction: ${service.jurisdiction}`;
    }

    if (
      lower.includes("step") ||
      lower.includes("procedure") ||
      lower.includes("process")
    ) {
      return service.steps
        .map((step, index) => `${index + 1}. ${step}`)
        .join("\n");
    }

    return "I can help with eligibility, documents, step-by-step procedure, whether you need to visit an office, the correct office/jurisdiction, and what happens after application.";
  }

  async function sendAIMessage(customMessage) {
    const message = (customMessage || aiInput).trim();

    if (!message || aiLoading) return;

    setAiMessages((prev) => [...prev, { role: "user", text: message }]);
    setAiInput("");
    setAiLoading(true);

    setTimeout(() => {
      const reply = getLocalAIReply(message);

      setAiMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: reply
        }
      ]);

      setAiLoading(false);
    }, 500);
  }

  return (
    <div className={`app ${seniorMode ? "senior-mode" : ""}`}>
      <Navbar
        page={page}
        go={go}
        language={language}
        setLanguage={setLanguage}
        seniorMode={seniorMode}
        setSeniorMode={setSeniorMode}
      />

      {page === "home" && (
        <Home
          go={go}
          search={search}
          setSearch={setSearch}
          popularServices={popularServices}
          selectService={selectService}
        />
      )}

      {page === "services" && (
        <ServicesPage
          services={filteredServices}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={categories}
          selectService={selectService}
        />
      )}

      {page === "service-detail" && (
        <ServiceDetailPage
          service={service}
          serviceDocs={serviceDocs}
          startService={startService}
          go={go}
        />
      )}

      {page === "questions" && (
        <QuestionsPage
          service={service}
          answers={answers}
          setAnswers={setAnswers}
          go={go}
        />
      )}

      {page === "checklist" && (
        <ChecklistPage
          service={service}
          serviceDocs={serviceDocs}
          completedDocs={completedDocs}
          toggleDocument={toggleDocument}
          readinessScore={readinessScore}
          calculateReadiness={calculateReadiness}
          go={go}
        />
      )}

      {page === "ready" && (
        <ReadyPage
          service={service}
          readinessScore={readinessScore}
          completedCount={completedCount}
          serviceDocs={serviceDocs}
          getVisitDecision={getVisitDecision}
          go={go}
          submitApplication={submitApplication}
        />
      )}

      {page === "office" && (
        <OfficePage service={service} go={go} />
      )}

      {page === "tracking" && (
        <TrackingPage applications={applications} go={go} />
      )}

      {page === "notifications" && (
        <NotificationsPage notifications={notifications} />
      )}

      {page === "profile" && (
        <ProfilePage
          seniorMode={seniorMode}
          setSeniorMode={setSeniorMode}
          language={language}
          setLanguage={setLanguage}
        />
      )}

      {page === "help" && <HelpPage />}

      <Footer go={go} />

      <AIChat
        aiOpen={aiOpen}
        setAiOpen={setAiOpen}
        aiMessages={aiMessages}
        aiInput={aiInput}
        setAiInput={setAiInput}
        sendAIMessage={sendAIMessage}
        aiLoading={aiLoading}
      />
    </div>
  );
}

/* =========================================================
   NAVBAR
   ========================================================= */

function Navbar({
  page,
  go,
  language,
  setLanguage,
  seniorMode,
  setSeniorMode
}) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <button className="brand" onClick={() => go("home")}>
          <span className="brand-icon">G</span>
          <span>
            <strong>GovAssist</strong>
            <small>Government Services Simplified</small>
          </span>
        </button>

        <div className="nav-links">
          <button
            className={page === "home" ? "active" : ""}
            onClick={() => go("home")}
          >
            Home
          </button>

          <button
            className={page === "services" ? "active" : ""}
            onClick={() => go("services")}
          >
            Services
          </button>

          <button
            className={page === "tracking" ? "active" : ""}
            onClick={() => go("tracking")}
          >
            Track
          </button>

          <button
            className={page === "help" ? "active" : ""}
            onClick={() => go("help")}
          >
            Help
          </button>
        </div>

        <div className="navbar-actions">
          <select
            className="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
            <option>Konkani</option>
          </select>

          <button
            className="senior-toggle"
            title="Senior Mode"
            onClick={() => setSeniorMode((prev) => !prev)}
          >
            A+
          </button>

          <button
            className="profile-button"
            title="Profile"
            onClick={() => go("profile")}
          >
            👤
          </button>
        </div>
      </div>
    </nav>
  );
}

/* =========================================================
   HOME
   ========================================================= */

function Home({
  go,
  search,
  setSearch,
  popularServices,
  selectService
}) {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="eyebrow">GOVERNMENT SERVICES, SIMPLIFIED</div>

            <h1>
              Know before
              <br />
              <span>you go.</span>
            </h1>

            <p>
              GovAssist helps citizens understand eligibility, documents,
              procedures, office visits and what happens after applying —
              before they travel to a government office.
            </p>

            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => go("services")}>
                Explore Services →
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => go("tracking")}
              >
                Track Application
              </button>
            </div>

            <div className="hero-trust">
              <span>✓ Eligibility guidance</span>
              <span>✓ Document checklist</span>
              <span>✓ Office guidance</span>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-top">
              <span className="status-dot"></span>
              GovAssist Preparation
            </div>

            <div className="hero-card-title">
              Prepare before you visit.
            </div>

            <div className="mini-progress">
              <span style={{ width: "80%" }}></span>
            </div>

            <div className="hero-check">
              <span>✓</span>
              <div>
                <strong>Eligibility</strong>
                <small>Check if you can apply</small>
              </div>
            </div>

            <div className="hero-check">
              <span>✓</span>
              <div>
                <strong>Documents</strong>
                <small>Know what to carry</small>
              </div>
            </div>

            <div className="hero-check">
              <span>✓</span>
              <div>
                <strong>Office</strong>
                <small>Know where to go</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container stats-grid">
          <Stat value="40+" label="Government Services" />
          <Stat value="5" label="Preparation Checks" />
          <Stat value="24/7" label="Digital Guidance" />
          <Stat value="1" label="Simple Journey" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="FIND A SERVICE"
            title="What do you need help with?"
            text="Search for a government service and let GovAssist guide you."
          />

          <div className="home-search">
            <span>⌕</span>
            <input
              placeholder="Search Income Certificate, PAN, Passport..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => {
                go("services");
              }}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <SectionHeading
            eyebrow="POPULAR SERVICES"
            title="Start with a common service"
            text="Choose a service to see eligibility, documents, procedure and office guidance."
          />

          <div className="services-grid">
            {popularServices.slice(0, 8).map((item) => (
              <ServiceCard
                key={item.id}
                service={item}
                onClick={() => selectService(item.id)}
              />
            ))}
          </div>

          <div className="center-action">
            <button className="btn btn-primary" onClick={() => go("services")}>
              View All Services
            </button>
          </div>
        </div>
      </section>

      <section className="impact-section">
        <div className="container impact-grid">
          <div>
            <div className="eyebrow">WHY GOVASSIST</div>
            <h2>
              Don't make a trip
              <br />
              <span>without knowing.</span>
            </h2>
            <p>
              Government procedures can be confusing. GovAssist converts
              complicated preparation into a simple decision journey.
            </p>
          </div>

          <div className="impact-points">
            <div>
              <span>01</span>
              <strong>Check eligibility</strong>
              <p>Understand whether the service applies to you.</p>
            </div>

            <div>
              <span>02</span>
              <strong>Prepare correctly</strong>
              <p>Know documents and steps before travelling.</p>
            </div>

            <div>
              <span>03</span>
              <strong>Know what happens next</strong>
              <p>Understand the process after submitting your request.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   SERVICES PAGE
   ========================================================= */

function ServicesPage({
  services,
  search,
  setSearch,
  category,
  setCategory,
  categories,
  selectService
}) {
  return (
    <PageShell
      eyebrow="GOVERNMENT SERVICES"
      title="Find a Service"
      description="Explore government services and prepare before visiting an office."
    >
      <div className="service-toolbar">
        <div className="search-box">
          <span>⌕</span>
          <input
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="category-tabs">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "active" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="services-result-info">
        Showing {services.length} service{services.length !== 1 ? "s" : ""}
      </div>

      {services.length ? (
        <div className="services-grid">
          {services.map((item) => (
            <ServiceCard
              key={item.id}
              service={item}
              onClick={() => selectService(item.id)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div>🔎</div>
          <h3>No service found</h3>
          <p>Try another service name or category.</p>
        </div>
      )}
    </PageShell>
  );
}

/* =========================================================
   SERVICE DETAIL
   ========================================================= */

function ServiceDetailPage({
  service,
  serviceDocs,
  startService,
  go
}) {
  return (
    <PageShell
      eyebrow={service.category.toUpperCase()}
      title={service.name}
      description="Understand the complete preparation journey before you apply or visit."
    >
      <div className="service-detail-grid">
        <div className="detail-main-card">
          <div className="detail-icon">{service.icon}</div>

          <div className="service-category">{service.category}</div>

          <h2>{service.name}</h2>

          <p>{service.description}</p>

          <div className="detail-meta">
            <div>
              <span>Process</span>
              <strong>{service.process}</strong>
            </div>

            <div>
              <span>Typical time</span>
              <strong>{service.time}</strong>
            </div>

            <div>
              <span>Eligibility</span>
              <strong>Check before applying</strong>
            </div>

            <div>
              <span>Office visit</span>
              <strong>{service.visitLevel}</strong>
            </div>
          </div>

          <div className="detail-actions">
            <button className="btn btn-primary" onClick={startService}>
              Start Preparation →
            </button>

            <button className="btn btn-secondary" onClick={() => go("services")}>
              Back to Services
            </button>
          </div>

          {/* FEATURE 1 */}
          <FeatureBox
            number="01"
            title="Eligibility Check"
            icon="✓"
          >
            <p>{service.eligibility}</p>
            <p>
              <strong>Who should apply:</strong> {service.whoShouldApply}
            </p>
          </FeatureBox>

          {/* FEATURE 2 */}
          <FeatureBox
            number="02"
            title="Step-by-Step Procedure"
            icon="→"
          >
            <div className="feature-step-list">
              {service.steps.map((step, index) => (
                <div className="feature-step" key={index}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </FeatureBox>

          {/* FEATURE 3 */}
          <FeatureBox
            number="03"
            title="Do I Need to Visit?"
            icon="🏢"
          >
            <div className={`visit-decision ${service.visitLevel.toLowerCase()}`}>
              <strong>{service.visitLevel}</strong>

              <p>
                {service.visitLevel === "Yes"
                  ? "Physical presence is normally expected for this service."
                  : service.visitLevel === "No"
                    ? "You may be able to complete this service without visiting an office."
                    : "A visit may be required depending on your case or verification requirements."}
              </p>
            </div>
          </FeatureBox>

          <div className="info-note">
            <strong>Important:</strong>
            <p>
              GovAssist provides preparation guidance. Always verify the
              latest official requirements before submitting an application
              or travelling.
            </p>
          </div>
        </div>

        <div className="detail-side-card">
          <h3>Commonly Useful Documents</h3>

          <div className="detail-document-list">
            {serviceDocs.map((doc) => (
              <div className="detail-document" key={doc.id}>
                <span>✓</span>
                <p>{doc.name}</p>
              </div>
            ))}
          </div>

          {/* FEATURE 4 */}
          <FeatureBox
            number="04"
            title="Correct Office + Jurisdiction"
            icon="📍"
          >
            <p>
              <strong>Office</strong>
              <br />
              {service.office}
            </p>

            <p>
              <strong>Jurisdiction</strong>
              <br />
              {service.jurisdiction}
            </p>
          </FeatureBox>

          {/* FEATURE 5 */}
          <FeatureBox
            number="05"
            title="What Happens Next?"
            icon="⏭️"
          >
            <div className="next-step-list">
              {service.nextSteps.map((step, index) => (
                <div key={index}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </FeatureBox>
        </div>
      </div>
    </PageShell>
  );
}

/* =========================================================
   QUESTIONS / ELIGIBILITY
   ========================================================= */

function QuestionsPage({
  service,
  answers,
  setAnswers,
  go
}) {
  const questions = [
    {
      id: "identity",
      title: "Do you have a valid identity document?",
      text: "For example, an identity document accepted for the selected service."
    },
    {
      id: "address",
      title: "Do you have current address proof?",
      text: "Keep an address document relevant to your current residence."
    },
    {
      id: "supporting",
      title: "Do you have the supporting documents for this service?",
      text: "Requirements depend on the exact service and your situation."
    },
    {
      id: "eligibility",
      title: "Does the eligibility information apply to your situation?",
      text: service.eligibility
    },
    {
      id: "purpose",
      title: "Do you know why you need this service?",
      text: "Knowing the purpose helps select the correct government service."
    }
  ];

  function answer(id, value) {
    setAnswers((prev) => ({
      ...prev,
      [id]: value
    }));
  }

  return (
    <PageShell
      eyebrow="PREPARATION"
      title="Eligibility & Readiness Check"
      description={`Answer a few simple questions before preparing your ${service.name}.`}
    >
      <div className="questions-layout">
        <div className="questions-card">
          <div className="feature-intro">
            <span>🎯</span>
            <div>
              <strong>Eligibility Checker</strong>
              <p>
                This is a preparation check. It does not replace the official
                government's eligibility decision.
              </p>
            </div>
          </div>

          {questions.map((question, index) => (
            <div className="question-item" key={question.id}>
              <div className="question-number">{index + 1}</div>

              <div className="question-content">
                <h3>{question.title}</h3>
                <p>{question.text}</p>

                <div className="answer-options">
                  {["Yes", "No", "Not sure"].map((option) => (
                    <button
                      key={option}
                      className={
                        answers[question.id] === option
                          ? "selected"
                          : ""
                      }
                      onClick={() => answer(question.id, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="question-actions">
            <button className="btn btn-secondary" onClick={() => go("service-detail")}>
              Back
            </button>

            <button
              className="btn btn-primary"
              onClick={() => go("checklist")}
            >
              Continue to Checklist →
            </button>
          </div>
        </div>

        <div className="side-info-card">
          <div className="side-info-icon">💡</div>
          <h3>Why we ask</h3>
          <p>
            GovAssist checks common preparation points so you can avoid
            unnecessary trips and missing-document problems.
          </p>

          <div className="feature-mini">
            <strong>Selected service</strong>
            <span>{service.name}</span>
          </div>

          <div className="feature-mini">
            <strong>Initial visit guidance</strong>
            <span>{service.visitLevel}</span>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

/* =========================================================
   CHECKLIST
   ========================================================= */

function ChecklistPage({
  service,
  serviceDocs,
  completedDocs,
  toggleDocument,
  readinessScore,
  calculateReadiness,
  go
}) {
  return (
    <PageShell
      eyebrow="DOCUMENT CHECKLIST"
      title="Prepare Your Documents"
      description={`Check each document you have ready for ${service.name}.`}
    >
      <div className="checklist-layout">
        <div className="checklist-card">
          <div className="checklist-header">
            <div>
              <h2>{service.name}</h2>
              <p className="checklist-count">
                {completedDocs.length} of {serviceDocs.length} completed
              </p>
            </div>

            <div className="score-circle">{readinessScore}%</div>
          </div>

          <div className="checklist-progress">
            <span style={{ width: `${readinessScore}%` }}></span>
          </div>

          <div className="document-items">
            {serviceDocs.map((doc) => {
              const completed = completedDocs.includes(doc.id);

              return (
                <button
                  key={doc.id}
                  className={`document-item ${
                    completed ? "completed" : ""
                  }`}
                  onClick={() => toggleDocument(doc.id)}
                >
                  <span className="document-check">
                    {completed ? "✓" : ""}
                  </span>

                  <span className="document-text">
                    <strong>{doc.name}</strong>
                    <small>{doc.detail}</small>
                  </span>

                  <span className="document-arrow">›</span>
                </button>
              );
            })}
          </div>

          <div className="checklist-actions">
            <button className="btn btn-secondary" onClick={() => go("questions")}>
              Back
            </button>

            <button className="btn btn-primary" onClick={calculateReadiness}>
              Check Readiness →
            </button>
          </div>
        </div>

        <div className="checklist-tip">
          <span>💡</span>
          <p>
            Keep original documents and required copies where applicable.
            Always verify the latest official document list.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

/* =========================================================
   READY PAGE
   ========================================================= */

function ReadyPage({
  service,
  readinessScore,
  completedCount,
  serviceDocs,
  getVisitDecision,
  go,
  submitApplication
}) {
  const decision = getVisitDecision();

  return (
    <PageShell
      eyebrow="FINAL PREPARATION CHECK"
      title="Should you visit?"
      description="GovAssist combines your preparation with service-level guidance."
    >
      <div className="ready-card">
        <div className={`ready-icon ${decision.type}`}>
          {decision.icon}
        </div>

        <div className="ready-status">
          {decision.title.toUpperCase()}
        </div>

        <h2>{decision.title}</h2>

        <p>{decision.text}</p>

        <div className="big-score">{readinessScore}%</div>

        <div className="ready-progress">
          <span style={{ width: `${readinessScore}%` }}></span>
        </div>

        <p>
          {completedCount} of {serviceDocs.length} documents checked
        </p>

        <div className="decision-summary">
          <div>
            <span>Eligibility</span>
            <strong>Checked</strong>
          </div>

          <div>
            <span>Office Visit</span>
            <strong>{service.visitLevel}</strong>
          </div>

          <div>
            <span>Correct Office</span>
            <strong>{service.office}</strong>
          </div>
        </div>

        <div className="ready-actions">
          <button className="btn btn-primary" onClick={() => go("office")}>
            View Office Guidance →
          </button>

          <button className="btn btn-secondary" onClick={() => go("checklist")}>
            Review Checklist
          </button>

          <button className="btn btn-secondary" onClick={submitApplication}>
            Save Preparation
          </button>
        </div>

        <div className="disclaimer">
          GovAssist is a preparation assistant. The final decision on
          eligibility, documents, fees and processing belongs to the
          responsible government authority.
        </div>
      </div>
    </PageShell>
  );
}

/* =========================================================
   OFFICE PAGE
   ========================================================= */

function OfficePage({ service, go }) {
  function openMaps() {
    const query = encodeURIComponent(service.office);
    window.open(
      `https://www.google.com/maps/search/${query}`,
      "_blank"
    );
  }

  return (
    <PageShell
      eyebrow="OFFICE GUIDANCE"
      title="Where should you go?"
      description="Check the responsible office and jurisdiction before travelling."
    >
      <div className="office-layout">
        <div className="office-card">
          <div className="office-icon">🏢</div>

          <div className="service-category">{service.category}</div>

          <h2>{service.office}</h2>

          <div className="office-detail">
            <span>🕐</span>
            <div>
              <small>Working hours</small>
              <strong>Office hours vary</strong>
            </div>
          </div>

          <div className="office-detail">
            <span>📍</span>
            <div>
              <small>Jurisdiction</small>
              <strong>{service.jurisdiction}</strong>
            </div>
          </div>

          <div className="office-detail">
            <span>🎯</span>
            <div>
              <small>Visit requirement</small>
              <strong>{service.visitLevel}</strong>
            </div>
          </div>

          <button className="btn btn-primary" onClick={openMaps}>
            Open in Maps ↗
          </button>
        </div>

        <div>
          <div className="office-warning">
            <span>⚠️</span>
            <div>
              <strong>Before you travel</strong>
              <p>
                Confirm the exact office, jurisdiction, working hours,
                appointment requirement and latest document list through the
                official source.
              </p>
            </div>
          </div>

          <div className="next-journey-card">
            <div className="journey-title">
              <span>⏭️</span>
              <div>
                <strong>What happens next?</strong>
                <small>After you reach the correct authority</small>
              </div>
            </div>

            <div className="journey-list">
              {service.nextSteps.map((step, index) => (
                <div key={index}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-navigation">
        <button className="btn btn-secondary" onClick={() => go("ready")}>
          Back to Readiness
        </button>

        <button className="btn btn-primary" onClick={() => go("tracking")}>
          Track Preparation →
        </button>
      </div>
    </PageShell>
  );
}

/* =========================================================
   TRACKING
   ========================================================= */

function TrackingPage({ applications, go }) {
  return (
    <PageShell
      eyebrow="APPLICATION TRACKING"
      title="Track Your Applications"
      description="See what you have saved and what happens next."
    >
      {applications.length ? (
        <div className="tracking-list">
          {applications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div>📋</div>
          <h3>No applications yet</h3>
          <p>Start preparing a government service to see it here.</p>

          <button className="btn btn-primary" onClick={() => go("services")}>
            Explore Services
          </button>
        </div>
      )}
    </PageShell>
  );
}

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function NotificationsPage({ notifications }) {
  return (
    <PageShell
      eyebrow="UPDATES"
      title="Notifications"
      description="Important reminders from your GovAssist preparation journey."
    >
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div className="notification-card" key={notification.id}>
            <div className="notification-icon">🔔</div>

            <div>
              <h3>{notification.title}</h3>
              <p>{notification.text}</p>
              <small>{notification.time}</small>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

/* =========================================================
   PROFILE
   ========================================================= */

function ProfilePage({
  seniorMode,
  setSeniorMode,
  language,
  setLanguage
}) {
  return (
    <PageShell
      eyebrow="PROFILE"
      title="Your GovAssist"
      description="Manage your preparation preferences."
    >
      <div className="profile-card">
        <div className="profile-avatar">👤</div>

        <div className="profile-info">
          <h2>Citizen Profile</h2>
          <p>Your preparation data is stored locally in this browser.</p>
        </div>
      </div>

      <div className="settings-card">
        <h3>Preferences</h3>

        <div className="setting-row">
          <div>
            <strong>Language</strong>
            <p>Select your preferred guidance language.</p>
          </div>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
            <option>Konkani</option>
          </select>
        </div>

        <div className="setting-row">
          <div>
            <strong>Senior Mode</strong>
            <p>Increase text size and improve readability.</p>
          </div>

          <button
            className={`switch-button ${seniorMode ? "active" : ""}`}
            onClick={() => setSeniorMode((prev) => !prev)}
          >
            <span></span>
          </button>
        </div>
      </div>
    </PageShell>
  );
}

/* =========================================================
   HELP
   ========================================================= */

function HelpPage() {
  const faqs = [
    {
      q: "What does GovAssist do?",
      a: "GovAssist helps citizens understand eligibility, documents, procedure, office visits and next steps before applying."
    },
    {
      q: "Does GovAssist replace a government portal?",
      a: "No. GovAssist is a preparation assistant. Official government portals and departments remain the final source of truth."
    },
    {
      q: "Can GovAssist tell me if I need to visit?",
      a: "Yes. It provides a preparation-level No, Maybe or Yes decision based on the selected service and your answers."
    },
    {
      q: "Can it track applications?",
      a: "GovAssist can save preparation/application records locally and display a simple progress timeline."
    },
    {
      q: "Are fees and processing times guaranteed?",
      a: "No. Requirements, fees and processing times can change. Verify the latest official information before applying."
    },
    {
      q: "Does GovAssist store my data online?",
      a: "The current demo stores preparation data in your browser's localStorage."
    }
  ];

  return (
    <PageShell
      eyebrow="HELP CENTRE"
      title="How can we help?"
      description="Simple answers about using GovAssist."
    >
      <div className="help-grid">
        {faqs.map((faq) => (
          <div className="faq-card" key={faq.q}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="help-cta">
        <div>
          <h2>Still confused?</h2>
          <p>Use the GovAssist AI assistant for quick service guidance.</p>
        </div>

        <button className="btn btn-primary">
          Ask GovAssist AI
        </button>
      </div>
    </PageShell>
  );
}

/* =========================================================
   AI CHAT
   ========================================================= */

function AIChat({
  aiOpen,
  setAiOpen,
  aiMessages,
  aiInput,
  setAiInput,
  sendAIMessage,
  aiLoading
}) {
  return (
    <>
      <button
        className="ai-floating-button"
        onClick={() => setAiOpen((prev) => !prev)}
      >
        🤖 GovAssist AI
      </button>

      {aiOpen && (
        <div className="ai-overlay">
          <div className="ai-chat">
            <div className="ai-header">
              <div>
                <strong>GovAssist AI</strong>
                <small>Local guidance assistant</small>
              </div>

              <button onClick={() => setAiOpen(false)}>×</button>
            </div>

            <div className="ai-messages">
              {aiMessages.map((message, index) => (
                <div
                  className={`ai-message ${message.role}`}
                  key={index}
                >
                  {message.text}
                </div>
              ))}

              {aiLoading && (
                <div className="ai-message assistant">
                  Thinking...
                </div>
              )}
            </div>

            <div className="ai-suggestions">
              <button onClick={() => sendAIMessage("What documents do I need?")}>
                Documents
              </button>

              <button onClick={() => sendAIMessage("Am I eligible?")}>
                Eligibility
              </button>

              <button onClick={() => sendAIMessage("Do I need to visit?")}>
                Visit?
              </button>

              <button onClick={() => sendAIMessage("What are the steps?")}>
                Steps
              </button>
            </div>

            <div className="ai-input">
              <input
                placeholder="Ask GovAssist..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendAIMessage();
                }}
              />

              <button onClick={() => sendAIMessage()}>
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   FOOTER
   ========================================================= */

function Footer({ go }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <span className="brand-icon">G</span>
            <strong>GovAssist</strong>
          </div>

          <p>
            Making government services easier to understand, prepare for and
            access.
          </p>
        </div>

        <div>
          <h4>Navigate</h4>

          <button onClick={() => go("home")}>Home</button>
          <button onClick={() => go("services")}>Services</button>
          <button onClick={() => go("tracking")}>Tracking</button>
          <button onClick={() => go("help")}>Help</button>
        </div>

        <div>
          <h4>Important</h4>
          <p>
            GovAssist is a preparation assistant and does not replace official
            government departments or portals.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 GovAssist · Technology for Everyday Life
      </div>
    </footer>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
   ========================================================= */

function ServiceCard({ service, onClick }) {
  return (
    <button className="service-card" onClick={onClick}>
      <div className="service-card-top">
        <div className="service-icon">{service.icon}</div>

        {service.popular && (
          <span className="popular-badge">POPULAR</span>
        )}
      </div>

      <span className="service-category">{service.category}</span>

      <h3>{service.name}</h3>

      <p>{service.description}</p>

      <div className="service-card-bottom">
        <span>{service.process}</span>
        <strong>Prepare →</strong>
      </div>
    </button>
  );
}

function FeatureBox({ number, title, icon, children }) {
  return (
    <div className="feature-box">
      <div className="feature-box-header">
        <div className="feature-box-icon">{icon}</div>

        <div>
          <span>FEATURE {number}</span>
          <h3>{title}</h3>
        </div>
      </div>

      <div className="feature-box-content">{children}</div>
    </div>
  );
}

function ApplicationCard({ application }) {
  const timeline = application.timeline || [
    { title: "Preparation Started", done: true },
    {
      title: "Documents Checked",
      done: application.progress >= 50
    },
    { title: "Application Submitted", done: false },
    { title: "Department Verification", done: false },
    { title: "Service Completed", done: false }
  ];

  return (
    <div className="application-card">
      <div className="application-main">
        <div className="application-icon">📋</div>

        <div>
          <div className="application-id">{application.id}</div>

          <h3>{application.service}</h3>

          <p>Saved on {application.date}</p>

          <div className="tracking-timeline">
            {timeline.map((item, index) => (
              <div
                className={`timeline-item ${item.done ? "done" : ""}`}
                key={index}
              >
                <div className="timeline-dot">
                  {item.done ? "✓" : ""}
                </div>

                <div>
                  <strong>{item.title}</strong>
                  <small>
                    {item.done ? "Completed" : "Next step"}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="application-status">
        <span>{application.status}</span>

        <div className="application-progress">
          <span style={{ width: `${application.progress}%` }}></span>
        </div>

        <small>{application.progress}% prepared</small>
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function PageShell({ eyebrow, title, description, children }) {
  return (
    <main className="page-shell">
      <div className="container">
        <div className="page-heading">
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        {children}
      </div>
    </main>
  );
}