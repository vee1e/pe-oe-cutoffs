// Type definitions and data for electives

export interface Elective {
  type: "OE" | "PE I" | "PE II";
  typeLabel: string;
  code: string;
  name: string;
  department: string;
  lowestCGPA: number;
  highestCGPA: number;
  students: number;
}

// Parse course code and name from the full course name
function parseCourseName(fullName: string): { code: string; name: string; department: string } {
  // Handle various separators: " : ", " - ", ":"
  const separators = [" : ", " - ", ": "];
  let code = "";
  let name = fullName;
  
  for (const sep of separators) {
    const idx = fullName.indexOf(sep);
    if (idx > 0 && idx < 15) {
      code = fullName.substring(0, idx).trim();
      name = fullName.substring(idx + sep.length).trim();
      break;
    }
  }
  
  // Extract department from code (first 2-3 letters)
  const deptMatch = code.match(/^([A-Z]+)/);
  const department = deptMatch ? deptMatch[1] : "OTHER";
  
  // Clean up redundant parts from name
  name = name
    .replace(/^OPEN ELECTIVE\s*-?\s*/i, "")
    .replace(/^ELECTIVE\s*-?\s*/i, "")
    .replace(/^ELCTIVE\s*-?\s*/i, "")  // Typo in data
    .trim();
  
  return { code, name, department };
}

// Raw elective data parsed from CSV
export const electiveData: Elective[] = [
  // Open Electives (OE)
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("AAE 4311 : OPEN ELECTIVE - INTRODUCTION TO AEROSPACE ENGINEERING"), lowestCGPA: 6.75, highestCGPA: 8.98, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("AAE 4313 : Introduction to Automobile Engineering"), lowestCGPA: 6.33, highestCGPA: 9.07, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("BME 4315 : OPEN ELECTIVE - INTRODUCTION TO NANOTECHNOLOGY AND CHARACTERIZATION TECHNIQUES"), lowestCGPA: 4.98, highestCGPA: 8.71, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("CHE 4311 : Industrial Pollution Control"), lowestCGPA: 5.88, highestCGPA: 8.40, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("CHE 4312 : Risk and Safety Management in Industries"), lowestCGPA: 6.34, highestCGPA: 7.73, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("CHM 4312 : OPEN ELECTIVE - SUSTAINABLE CHEMICAL PROCESSES AND PRODUCTS"), lowestCGPA: 4.23, highestCGPA: 8.46, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("CIE 4313 : ENVIRONMENTAL MANAGEMENT"), lowestCGPA: 6.55, highestCGPA: 8.96, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("CIE 4314 : OPEN ELECTIVE - GEOLOGY FOR ENGINEERS"), lowestCGPA: 5.75, highestCGPA: 9.56, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("CIE 4316 : STRENGTH OF MATERIALS"), lowestCGPA: 3.19, highestCGPA: 8.86, students: 43 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("CSE 4456 : IOS APPLICATION DEVELOPMENT"), lowestCGPA: 7.12, highestCGPA: 9.61, students: 24 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("ECE 4311 : Consumer Electronics"), lowestCGPA: 4.72, highestCGPA: 8.66, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("ECE 4323 : Vedic Mathematics and its Applications in Modern Technologies"), lowestCGPA: 4.54, highestCGPA: 8.75, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("ELE 4311 : MATLAB for Engineers"), lowestCGPA: 4.66, highestCGPA: 9.49, students: 139 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("ELE 4312 : Essentials of Energy Auditing"), lowestCGPA: 4.06, highestCGPA: 7.39, students: 27 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("HUM 4322 : OPEN ELECTIVE - FILM STUDIES"), lowestCGPA: 8.60, highestCGPA: 9.74, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("HUM 4323 : OPEN ELECTIVE - GERMAN FOR BEGINNERS"), lowestCGPA: 8.87, highestCGPA: 9.98, students: 30 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("HUM 4329 - CREATIVE COMMUNICATION: ART, MEDIA, CULTURE AND IDEAS"), lowestCGPA: 7.16, highestCGPA: 9.38, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("HUM 4337 : INTRODUCTION TO ENTERPRISE RISK MANAGEMENT"), lowestCGPA: 7.42, highestCGPA: 9.01, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("ICE 4314 : Sensor Technology"), lowestCGPA: 5.14, highestCGPA: 8.93, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("ICE 4316 : Virtual Instrumentation"), lowestCGPA: 4.28, highestCGPA: 8.84, students: 28 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("ICE 4318: Outdoor Leadership"), lowestCGPA: 7.18, highestCGPA: 9.02, students: 25 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("ICE 4319 : HIMALAYAN OUTDOOR LEADERSHIP"), lowestCGPA: 7.20, highestCGPA: 8.73, students: 20 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("ICE 4320 : NATURE JOURNALING"), lowestCGPA: 7.86, highestCGPA: 9.47, students: 15 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("IIE 4310 - OPEN ELECTIVE - MEDICAL EMERGENCY AND FIRST AID"), lowestCGPA: 7.61, highestCGPA: 9.49, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("IIE 4315 : OPEN ELCTIVE - REPORTING AND WRITING"), lowestCGPA: 7.44, highestCGPA: 9.46, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("IIE 4318 : OPEN ELECTIVE - MEDIA PRODUCTION TECHNIQUES"), lowestCGPA: 7.79, highestCGPA: 9.55, students: 40 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("IIE 4324 : OPEN ELECTIVE - YOGA"), lowestCGPA: 8.13, highestCGPA: 9.78, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("IIE 4333 : OPEN ELECTIVE - MEDITATION AND CONSCIOUS LIVING COURSE"), lowestCGPA: 7.36, highestCGPA: 9.69, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("IIE 4334 : OPEN ELECTIVE - DISCERNING INDIA : LIVING CULTURES OF TULUNADU"), lowestCGPA: 7.53, highestCGPA: 9.27, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("IIE 4335 : OPEN ELECTIVE - INTRODUCTION TO FOREIGN LANGUAGE - FRENCH I"), lowestCGPA: 7.81, highestCGPA: 9.45, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("MAT 5301 : OPEN ELECTIVE - APPLIED GRAPH THEORY"), lowestCGPA: 4.93, highestCGPA: 9.33, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("MAT 5302 : OPEN ELECTIVE - APPLIED LINEAR ALGEBRA"), lowestCGPA: 5.45, highestCGPA: 9.49, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("MAT 5305 : OPEN ELECTIVE - OPTIMIZATION TECHNIQUES"), lowestCGPA: 4.45, highestCGPA: 9.08, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("MIE 4311 : INTRODUCTION TO COMPOSITE MATERIALS"), lowestCGPA: 4.13, highestCGPA: 8.34, students: 32 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("MIE 4312 : INTRODUCTION TO BIOMECHANICS"), lowestCGPA: 4.45, highestCGPA: 8.20, students: 32 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("MIE 4313 : INTRODUCTION TO OPERATIONS RESEARCH"), lowestCGPA: 5.13, highestCGPA: 8.93, students: 70 },
  { typeLabel: "Open Elective (OE)", type: "OE", ...parseCourseName("MTE 4315 : Introduction to Industrial Robotics"), lowestCGPA: 6.40, highestCGPA: 9.75, students: 70 },

  // Program Elective I (PE I)
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("AAE 4401 : Applied Aerodynamics"), lowestCGPA: 5.72, highestCGPA: 9.78, students: 17 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("AAE 4405 : Unmanned Aircraft Systems, Sensors, and Instrumentation"), lowestCGPA: 4.28, highestCGPA: 8.91, students: 28 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("AAE 4413 : Engine Systems Design"), lowestCGPA: 4.56, highestCGPA: 8.47, students: 30 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("AAE 4417 : Electrical Vehicle System Engineering"), lowestCGPA: 4.60, highestCGPA: 9.38, students: 20 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("AAE 4421 : ELECTIVE - SPACEFLIGHT MECHANICS AND ATTITUDE DYNAMICS"), lowestCGPA: 5.20, highestCGPA: 8.39, students: 15 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("BIO 4402 : Biological Treatment of Wastewater"), lowestCGPA: 4.79, highestCGPA: 8.20, students: 7 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("BIO 4405 : Biomaterials & Drug Delivery Engineering Principles"), lowestCGPA: 6.45, highestCGPA: 9.46, students: 40 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("BME 4402 : Biomaterial Characterization Techniques"), lowestCGPA: 4.64, highestCGPA: 7.60, students: 10 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("BME 4405 : Artificial Intelligence"), lowestCGPA: 4.58, highestCGPA: 9.71, students: 17 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("CHE 4401 : Oil and Gas Reservoir Engineering"), lowestCGPA: 5.72, highestCGPA: 9.49, students: 11 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("CHE 4407 : Air Pollution Monitoring and Control"), lowestCGPA: 5.26, highestCGPA: 5.35, students: 3 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("CHE 4409 : Renewable Energy"), lowestCGPA: 4.92, highestCGPA: 9.13, students: 11 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("CIE 4401 : ADVANCES IN CONCRETE TECHNOLOGY"), lowestCGPA: 5.47, highestCGPA: 7.82, students: 14 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("CIE 4409 : STRUCTURAL DYNAMICS"), lowestCGPA: 5.87, highestCGPA: 9.04, students: 10 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("CIE 4417 : FORMWORK ENGINEERING PRACTICES"), lowestCGPA: 4.54, highestCGPA: 8.29, students: 11 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("CRA 4401 : ELECTIVE-MARKETING IN A DIGITAL WORLD"), lowestCGPA: 6.25, highestCGPA: 9.44, students: 251 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("CRA 4405 : ELECTIVE - BIG DATA MODELLING AND MANAGEMENT"), lowestCGPA: 7.58, highestCGPA: 9.98, students: 325 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("CRA 4409 : ELECTIVE - DATA SCIENTISTS TOOLBOX AND R PROGRAMMING"), lowestCGPA: 4.72, highestCGPA: 8.35, students: 117 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("CRA 4413 : ELECTIVE - INTRODUCTION TO INTERACTIVE PROGRAMMING IN PYTHON"), lowestCGPA: 6.16, highestCGPA: 8.49, students: 61 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("CSE 4405 : ARTIFICIAL INTELLIGENCE"), lowestCGPA: 4.44, highestCGPA: 9.73, students: 97 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("CSE 4417 : NETWORK SECURITY"), lowestCGPA: 3.19, highestCGPA: 9.35, students: 27 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("CSE 4429 : NATURAL LANGUAGE PROCESSING"), lowestCGPA: 4.48, highestCGPA: 9.08, students: 38 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("CSF 4444 : Economics"), lowestCGPA: 5.11, highestCGPA: 9.35, students: 18 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("DSE 4401 : INFORMATION RETRIEVAL"), lowestCGPA: 4.67, highestCGPA: 9.47, students: 26 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("DSE 4405 : Cloud Computing"), lowestCGPA: 4.34, highestCGPA: 8.71, students: 38 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("ECE 4406 : MOS Device Modelling"), lowestCGPA: 4.67, highestCGPA: 9.42, students: 64 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("ECE 4411 : Embedded System Design"), lowestCGPA: 6.02, highestCGPA: 9.59, students: 74 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("ECE 4421 : Machine Learning for VLSI Design Automation"), lowestCGPA: 5.51, highestCGPA: 8.64, students: 15 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("ECE 4423 : VLSI Architecture for IOT & EDGE Devices"), lowestCGPA: 5.53, highestCGPA: 8.53, students: 16 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("ELE 4409 : Artificial Intelligence"), lowestCGPA: 6.34, highestCGPA: 8.54, students: 61 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("ELE 4415 : EV Battery Technology and Power Train Development"), lowestCGPA: 5.06, highestCGPA: 9.39, students: 111 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("HUM 4401 : HUMAN RESOURCE MANAGEMENT"), lowestCGPA: 4.72, highestCGPA: 9.09, students: 59 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("HUM 4408 : FINTECH SERVICES"), lowestCGPA: 6.24, highestCGPA: 9.27, students: 60 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("HUM 4411 : ENTREPRENEURSHIP"), lowestCGPA: 5.06, highestCGPA: 8.54, students: 58 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("HUM 4420 : Technical and Business Writing"), lowestCGPA: 4.23, highestCGPA: 6.64, students: 29 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("HUM 4421 : Understanding Literature"), lowestCGPA: 4.58, highestCGPA: 8.73, students: 29 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("ICE 4401 : Modern Control Theory"), lowestCGPA: 4.06, highestCGPA: 9.01, students: 20 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("ICT 4401 : Artificial Intelligence"), lowestCGPA: 3.67, highestCGPA: 9.48, students: 101 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("ICT 4416 : Artificial Intelligence in Cyber security"), lowestCGPA: 4.39, highestCGPA: 9.46, students: 28 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("MAT 4055 : Introduction to Game Theory"), lowestCGPA: 4.91, highestCGPA: 9.74, students: 64 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("MAT 4405 : Linear Optimization"), lowestCGPA: 6.06, highestCGPA: 8.80, students: 14 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("MIE 4401 : DESIGN OF MECHANICAL SYSTEMS"), lowestCGPA: 4.42, highestCGPA: 8.98, students: 28 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("MIE 4406 : NON-TRADITIONAL MANUFACTURING TECHNIQUES"), lowestCGPA: 4.78, highestCGPA: 7.05, students: 10 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("MIE 4409 : CRYOGENICS"), lowestCGPA: 6.91, highestCGPA: 9.28, students: 14 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("MIE 4413 : PROCESSING OF POLYMERS AND POLYMER COMPOSITES"), lowestCGPA: 4.98, highestCGPA: 8.02, students: 11 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("MIE 4421 : ROBOTICS: MECHANICS AND CONTROL"), lowestCGPA: 5.58, highestCGPA: 9.51, students: 10 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("MIE 4427 : OPERATIONS RESEARCH"), lowestCGPA: 4.55, highestCGPA: 8.56, students: 13 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("MIE 4433 : INDUSTRY 4.0"), lowestCGPA: 5.23, highestCGPA: 8.33, students: 7 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("MTE 4405 : Database Management Systems"), lowestCGPA: 4.60, highestCGPA: 9.04, students: 14 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("MTE 4409 : Artificial Intelligence for Robotic Vision"), lowestCGPA: 4.45, highestCGPA: 9.52, students: 38 },
  { typeLabel: "Program Elective I (PE I)", type: "PE I", ...parseCourseName("PHY 4401 : ELECTIVE - FUNDAMENTALS OF ASTROPHYSICS"), lowestCGPA: 4.76, highestCGPA: 9.56, students: 29 },

  // Program Elective II (PE II)
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("AAE 4403 : Experimental Aerodynamics"), lowestCGPA: 5.72, highestCGPA: 9.78, students: 17 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("AAE 4406 : Antenna Design, Analysis, and its Applications"), lowestCGPA: 4.28, highestCGPA: 8.91, students: 28 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("AAE 4414 : Automotive Ergonomics"), lowestCGPA: 4.56, highestCGPA: 8.98, students: 33 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("AAE 4418 : Energy Storage System and Devices for Electric Vehicles"), lowestCGPA: 4.60, highestCGPA: 9.56, students: 21 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("AAE 4422 : ELECTIVE - SPACECRAFT SYSTEMS AND ENGINEERING"), lowestCGPA: 5.20, highestCGPA: 8.29, students: 14 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("BIO 4403 : Biofuels Engineering"), lowestCGPA: 4.79, highestCGPA: 8.86, students: 7 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("BIO 4407 : Biological Therapeutics"), lowestCGPA: 6.45, highestCGPA: 9.46, students: 42 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("BME 4404 : Drug Delivery"), lowestCGPA: 4.64, highestCGPA: 7.60, students: 10 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("BME 4406 : Biomedical Signal Processing"), lowestCGPA: 4.58, highestCGPA: 9.71, students: 16 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("CHE 4402 : ELECTIVE - PETROLEUM REFINERY ENGINEERING"), lowestCGPA: 5.72, highestCGPA: 9.49, students: 13 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("CHE 4406 : Solid and Hazardous Waste Management"), lowestCGPA: 5.34, highestCGPA: 9.13, students: 4 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("CHE 4410 : Solar Energy"), lowestCGPA: 4.92, highestCGPA: 8.36, students: 8 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("CIE 4402 : BUILDING CODES AND FUNCTIONAL SERVICES"), lowestCGPA: 4.54, highestCGPA: 7.82, students: 15 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("CIE 4410 : DESIGN OF STEEL STRUCTURES"), lowestCGPA: 5.87, highestCGPA: 9.04, students: 10 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("CIE 4418 : DEEP EXCAVATIONS, FOUNDATIONS & TUNNELS"), lowestCGPA: 4.73, highestCGPA: 8.29, students: 10 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("CRA 4402 : ELECTIVE - DIGITAL ANALYTICS FOR MARKETING"), lowestCGPA: 6.25, highestCGPA: 9.44, students: 251 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("CRA 4406 : ELECTIVE - BIG DATA INTEGRATION AND PROCESSING"), lowestCGPA: 7.58, highestCGPA: 9.98, students: 325 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("CRA 4410 : ELECTIVE - INTRODUCTION TO DATA SCIENCE"), lowestCGPA: 4.72, highestCGPA: 8.35, students: 117 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("CRA 4414 : ELECTIVE - MATHEMATICAL PROBLEM SOLVING USING PYTHON"), lowestCGPA: 6.16, highestCGPA: 8.49, students: 61 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("CSE 4408 : MACHINE LEARNING"), lowestCGPA: 4.44, highestCGPA: 9.73, students: 101 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("CSE 4418 : CYBER FORENSICS"), lowestCGPA: 3.19, highestCGPA: 9.35, students: 28 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("CSE 4430 : SPEECH PROCESSING"), lowestCGPA: 4.48, highestCGPA: 9.08, students: 39 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("CSF 4445 : Financial Statement Analysis"), lowestCGPA: 5.11, highestCGPA: 9.35, students: 18 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("DSE 4402 : NATURAL LANGUAGE PROCESSING"), lowestCGPA: 4.67, highestCGPA: 9.47, students: 38 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("DSE 4406 : Internet of Things"), lowestCGPA: 4.34, highestCGPA: 8.65, students: 31 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("ECE 4405 : Low Power VLSI Design"), lowestCGPA: 4.71, highestCGPA: 9.40, students: 66 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("ECE 4409 : Machine Learning"), lowestCGPA: 4.56, highestCGPA: 8.81, students: 89 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("ECE 4416 : Compound Semiconductor Electronics"), lowestCGPA: 5.94, highestCGPA: 7.85, students: 3 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("ECE 4424 : Security Solutions In VLSI"), lowestCGPA: 5.53, highestCGPA: 8.64, students: 17 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("ELE 4411 : FPGA Based System Design"), lowestCGPA: 6.06, highestCGPA: 9.59, students: 67 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("ELE 4416 : EV Charging Infrastructure, Vehicle Testing & Homologation"), lowestCGPA: 5.06, highestCGPA: 9.39, students: 111 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("HUM 4402 : MARKETING MANAGEMENT"), lowestCGPA: 4.72, highestCGPA: 9.09, students: 59 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("HUM 4409 : INTRODUCTION TO BANKING AND PAYMENTS"), lowestCGPA: 6.24, highestCGPA: 9.27, students: 60 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("HUM 4412 : DESIGN THINKING"), lowestCGPA: 5.06, highestCGPA: 8.54, students: 58 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("HUM 4418 : Intercultural Communication"), lowestCGPA: 4.23, highestCGPA: 6.64, students: 29 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("HUM 4424 : Modern Indian Literature"), lowestCGPA: 4.58, highestCGPA: 8.73, students: 29 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("ICE 4402 : Nonlinear control theory"), lowestCGPA: 4.06, highestCGPA: 9.01, students: 15 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("ICT 4402 : Machine Learning"), lowestCGPA: 3.67, highestCGPA: 9.48, students: 97 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("ICT 4414 : Ethical hacking"), lowestCGPA: 4.39, highestCGPA: 9.46, students: 31 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("MAT 4056 : Time Series Analysis"), lowestCGPA: 4.91, highestCGPA: 9.74, students: 52 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("MAT 4407 : Combinatorics and Design of Experiments"), lowestCGPA: 6.06, highestCGPA: 8.80, students: 12 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("MIE 4402 : INTRODUCTION TO CONTINUUM MECHANICS FOR ENGINEERS"), lowestCGPA: 4.42, highestCGPA: 8.98, students: 27 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("MIE 4408 : MICRO MACHINING"), lowestCGPA: 4.89, highestCGPA: 9.51, students: 10 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("MIE 4410 : SOLAR THERMAL SYSTEMS"), lowestCGPA: 6.91, highestCGPA: 9.28, students: 14 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("MIE 4414 : METAL AND CERAMIC COMPOSITE MATERIALS"), lowestCGPA: 4.98, highestCGPA: 7.86, students: 10 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("MIE 4423 : FLUID DRIVES AND CONTROL"), lowestCGPA: 5.85, highestCGPA: 7.07, students: 5 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("MIE 4428 : TOTAL QUALITY MANAGEMENT"), lowestCGPA: 4.55, highestCGPA: 8.32, students: 14 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("MIE 4439 : PROGRAMMING USING PYTHON"), lowestCGPA: 5.23, highestCGPA: 8.33, students: 7 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("MTE 4406 : Cyber Security for Industrial Automation"), lowestCGPA: 4.60, highestCGPA: 7.79, students: 14 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("MTE 4410 : Robot Dynamics and Control"), lowestCGPA: 4.45, highestCGPA: 9.52, students: 39 },
  { typeLabel: "Program Elective II (PE II)", type: "PE II", ...parseCourseName("PHY 4402 : ELECTIVE - ASTROPHYSICAL PROCESSES"), lowestCGPA: 4.28, highestCGPA: 8.84, students: 27 },
];

// Get unique departments
export function getDepartments(): string[] {
  const depts = new Set(electiveData.map(e => e.department));
  return Array.from(depts).sort();
}

// Get elective types
export function getElectiveTypes(): ("OE" | "PE I" | "PE II")[] {
  return ["OE", "PE I", "PE II"];
}

// Filter electives
export function filterElectives(
  type?: string,
  department?: string,
  search?: string,
  sortBy?: "name" | "cutoff" | "students" | "difficulty",
  sortOrder?: "asc" | "desc"
): Elective[] {
  let filtered = [...electiveData];
  
  if (type && type !== "all") {
    filtered = filtered.filter(e => e.type === type);
  }
  
  if (department && department !== "all") {
    filtered = filtered.filter(e => e.department === department);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(e => 
      e.name.toLowerCase().includes(searchLower) ||
      e.code.toLowerCase().includes(searchLower) ||
      e.department.toLowerCase().includes(searchLower)
    );
  }
  
  // Sort
  const order = sortOrder === "desc" ? -1 : 1;
  switch (sortBy) {
    case "cutoff":
      filtered.sort((a, b) => (a.lowestCGPA - b.lowestCGPA) * order);
      break;
    case "students":
      filtered.sort((a, b) => (a.students - b.students) * order);
      break;
    case "difficulty":
      // Difficulty = higher cutoff means harder to get in
      filtered.sort((a, b) => (a.lowestCGPA - b.lowestCGPA) * order);
      break;
    case "name":
    default:
      filtered.sort((a, b) => a.name.localeCompare(b.name) * order);
  }
  
  return filtered;
}

// Get statistics
export function getStats() {
  const oe = electiveData.filter(e => e.type === "OE");
  const pe1 = electiveData.filter(e => e.type === "PE I");
  const pe2 = electiveData.filter(e => e.type === "PE II");
  
  const lowestCutoff = Math.min(...electiveData.map(e => e.lowestCGPA));
  const highestCutoff = Math.max(...electiveData.map(e => e.lowestCGPA));
  const totalStudents = electiveData.reduce((sum, e) => sum + e.students, 0);
  
  return {
    totalElectives: electiveData.length,
    oeCount: oe.length,
    pe1Count: pe1.length,
    pe2Count: pe2.length,
    lowestCutoff,
    highestCutoff,
    totalStudents,
    departments: getDepartments().length,
  };
}

// Get difficulty level based on cutoff
export function getDifficultyLevel(cutoff: number): { level: string; color: string } {
  if (cutoff >= 8) return { level: "Very Hard", color: "text-red-400" };
  if (cutoff >= 7) return { level: "Hard", color: "text-orange-400" };
  if (cutoff >= 6) return { level: "Medium", color: "text-yellow-400" };
  if (cutoff >= 5) return { level: "Easy", color: "text-green-400" };
  return { level: "Very Easy", color: "text-emerald-400" };
}

// Valid course codes that have pages on courses.coolstuff.work
const VALID_COURSE_CODES = new Set([
  "AAE 4311", "AAE 4313", "AAE 4401", "AAE 4403", "AAE 4405", "AAE 4406",
  "AAE 4413", "AAE 4414", "AAE 4417", "AAE 4418", "AAE 4421", "AAE 4422",
  "BIO 4402", "BIO 4403", "BIO 4405", "BIO 4407", "BME 4315", "BME 4402",
  "BME 4404", "BME 4405", "BME 4406", "CHE 4311", "CHE 4312", "CHE 4401",
  "CHE 4402", "CHE 4406", "CHE 4407", "CHE 4409", "CHE 4410", "CHM 4312",
  "CIE 4313", "CIE 4314", "CIE 4316", "CIE 4401", "CIE 4402", "CIE 4409",
  "CIE 4410", "CIE 4417", "CIE 4418", "DSE 4401", "DSE 4402", "DSE 4405",
  "DSE 4406", "ECE 4311", "ECE 4406", "ECE 4409", "ECE 4411", "ECE 4416",
  "ECE 4421", "ECE 4424", "ELE 4312", "ELE 4409", "ELE 4415", "ELE 4416",
  "HUM 4322", "HUM 4323", "HUM 4329", "HUM 4401", "HUM 4402", "HUM 4408",
  "HUM 4409", "HUM 4411", "HUM 4420", "HUM 4424", "ICE 4316", "ICE 4402",
  "ICT 4401", "ICT 4402", "ICT 4414", "MAT 4405", "MAT 4407", "MIE 4401",
  "MIE 4402", "MIE 4408", "MIE 4409", "MIE 4421"
]);

// Check if a course has a valid page on courses.coolstuff.work
export function hasValidCoursePage(code: string): boolean {
  return VALID_COURSE_CODES.has(code);
}

// Get the URL for a course page (returns null if invalid)
export function getCoursePageUrl(code: string): string | null {
  if (!hasValidCoursePage(code)) return null;
  return `https://courses.coolstuff.work/course/${encodeURIComponent(code)}`;
}
