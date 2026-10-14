/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CampusItem } from '../types';

export const CAMPUS_ITEMS: CampusItem[] = [
  // --- LATEST CAMPUS NEWS ---
  {
    id: 'news-robotics-hub',
    title: 'New $12M Autonomous Robotics & AI Innovation Hub Inaugurated in North Quad',
    category: 'news',
    department: 'School of Computing & Robotics',
    date: 'Oct 09, 2026',
    summary: 'The state-of-the-art facility features autonomous rover arenas, high-performance GPU clusters, and maker spaces open to all engineering undergraduates.',
    content: `The University officially cut the ribbon on the new 45,000-sq-ft Autonomous Robotics & AI Innovation Hub in the North Quad today. Built with a $12M grant from alumni and industry consortium partners, the facility will house 8 specialized labs:
- Autonomous Mobile Systems & Drone Testbed
- Human-Robot Interaction & Computer Vision Studio
- Open-Access 3D Rapid Prototyping & PCB Assembly Suite
- Dedicated GPU Workstation Cluster for Student AI Research

Undergraduate and graduate students can book lab benches starting next Monday. Weekly safety and equipment certification sessions will be held every Tuesday and Thursday at 4:00 PM.`,
    venue: 'North Quad, Robotics Innovation Center 101',
    image: '/src/assets/images/news_tech_symposium_1791640113837.jpg',
    featured: true,
    tags: ['Robotics', 'AI', 'Facility', 'Innovation'],
    eligibility: 'Open to all enrolled students with safety orientation badge',
    contact: 'robotics-hub@university.edu',
    actionText: 'Book Orientation Session',
    actionUrl: '#',
    metrics: [
      { label: 'Facility Size', value: '45,000 sq ft' },
      { label: 'Workstations', value: '64 Benches' },
      { label: 'Access', value: '24/7 with ID' }
    ]
  },
  {
    id: 'news-solar-union',
    title: 'University Green Energy Milestone: Campus Student Union Achieves 100% Net-Zero Solar Power',
    category: 'news',
    department: 'Campus Sustainability & Facilities',
    date: 'Oct 08, 2026',
    summary: 'With 1,200 rooftop photovoltaic panels and battery storage installed, the Student Union becomes the campus’s first completely energy self-sufficient building.',
    content: `Following a 9-month student-led initiative in partnership with Facilities Management, the Student Union building is officially operating on 100% net-zero solar energy. 
The rooftop array produces an estimated 850,000 kWh annually, offset by smart LED sensory lighting and high-efficiency HVAC retrofits. An interactive live energy telemetry display has been installed in the main atrium allowing visitors to monitor real-time power generation and grid offset.`,
    venue: 'Student Union Atrium',
    tags: ['Sustainability', 'Green Campus', 'Solar Energy'],
    contact: 'green-initiative@university.edu',
    metrics: [
      { label: 'Panels Installed', value: '1,200 Solar' },
      { label: 'CO2 Offset', value: '410 Metric Tons' },
      { label: 'Status', value: 'Net-Zero Certified' }
    ]
  },
  {
    id: 'news-library-hours',
    title: 'University Library Extends 24/7 Hours with Silent Collaborative Study Pods for Midterms',
    category: 'news',
    department: 'University Libraries & Academic Resources',
    date: 'Oct 07, 2026',
    summary: 'Starting this weekend, Floors 2 through 4 will remain open around the clock with boosted Wi-Fi, reservable acoustic meeting pods, and free late-night drip coffee.',
    content: `To support students preparing for upcoming midterm assessments and project deadlines, the Main Library will operate on a 24/7 schedule from October 10 through November 15.
Key amenities added:
- 16 new acoustic sound-dampened 4-person study pods on the 3rd floor
- High-density Wi-Fi 7 access points across all reading halls
- Laptop power chargers and scientific calculator loan desks at the front reception
- Complimentary midnight drip coffee and herbal tea at the 1st-floor café lounge from 11:00 PM to 2:00 AM`,
    venue: 'Main University Library (Floors 1-4)',
    tags: ['Academics', 'Library', 'Midterms', 'Campus Life'],
    contact: 'library-services@university.edu',
    metrics: [
      { label: 'Schedule', value: '24/7 Continuous' },
      { label: 'New Pods', value: '16 Pods' },
      { label: 'Wi-Fi Standard', value: 'Wi-Fi 7' }
    ]
  },
  {
    id: 'news-sports-varsity',
    title: 'Varsity Athletics: Men & Women Track Teams Break Conference 4x400m Record',
    category: 'news',
    department: 'Intercollegiate Athletics Department',
    date: 'Oct 05, 2026',
    summary: 'Both relay squads clocked historic qualifying times at the Metro Invitational, securing automatic bids for the National Inter-Collegiate Championships.',
    content: `The University track and field program made headlines this weekend at the Metro Collegiate Invitational. Senior anchor Jordan Chen brought home gold with a split time of 45.2 seconds, securing the school's first conference title in five years.
The student body is invited to the Homecoming Pep Rally this Friday at 5:30 PM at the Memorial Stadium.`,
    venue: 'Memorial Stadium & Track',
    tags: ['Athletics', 'Track & Field', 'Championship'],
    metrics: [
      { label: 'Relay Time', value: '3:04.12' },
      { label: 'Standing', value: '1st in Conference' }
    ]
  },

  // --- COLLEGE ANNOUNCEMENTS ---
  {
    id: 'ann-midterm-schedule',
    title: 'Fall 2026 Midterm Examination Schedule, Hall Tickets & Code of Conduct Notice',
    category: 'announcement',
    department: 'Office of the Controller of Examinations',
    date: 'Oct 09, 2026',
    deadline: 'Oct 16, 2026 · 5:00 PM',
    summary: 'Official timetable for Midterm Examinations (Oct 26 - Nov 04) is published. Digital hall tickets must be downloaded and verified by October 16.',
    content: `All undergraduate and postgraduate students are hereby notified that the Fall 2026 Midterm Examination schedule has been ratified by the Academic Senate.
Important instructions:
1. Examinations commence on Monday, October 26, 2026 and conclude on Wednesday, November 04, 2026.
2. Students must download their authenticated Hall Ticket from the Student Academic Portal by October 16, 5:00 PM.
3. Verify course codes, scheduled room numbers, and slot timings immediately. Discrepancies must be reported to examination-cell@university.edu within 48 hours.
4. Smart watches, programmable calculators (unless explicitly authorized on the question paper), and mobile phones are strictly barred from exam halls.`,
    venue: 'Academic Blocks A, B, and C Examination Halls',
    featured: true,
    tags: ['Exams', 'Mandatory', 'Academic Notice', 'Hall Tickets'],
    eligibility: 'All registered Fall 2026 students',
    contact: 'examination-cell@university.edu',
    actionText: 'Download Hall Ticket Portal',
    actionUrl: '#',
    metrics: [
      { label: 'Exam Window', value: 'Oct 26 - Nov 04' },
      { label: 'Verification Due', value: 'Oct 16' },
      { label: 'Sessions', value: 'Morning / Afternoon' }
    ]
  },
  {
    id: 'ann-scholarships',
    title: 'Annual Academic Merit & Need-Based Institutional Scholarships Application Window Open',
    category: 'announcement',
    department: 'Student Financial Aid & Scholarships Office',
    date: 'Oct 07, 2026',
    deadline: 'Nov 05, 2026 · 11:59 PM',
    summary: 'Over $1.5M in scholarships available across STEM, Humanities, and Diversity programs. Covers partial to full tuition waivers and research stipends.',
    content: `Applications are invited from eligible full-time enrolled students for the University Institutional Scholarship Program for Academic Year 2026-2027.
Categories available:
1. Dean’s Academic Excellence Award (CGPA $\ge 3.8$ or equivalent 8.5/10): $5,000 / semester
2. Women in STEM Research Fellowship: $6,500 + laboratory research allowance
3. First-Generation Scholar Opportunity Grant: Full tuition waiver + textbook allowance
4. Student Leadership and Community Service Award: $3,000

Required documents: Unofficial transcript, 500-word statement of purpose, two faculty recommendation letters, and financial disclosure declaration.`,
    venue: 'Online Student Portal & FinAid Office, Admin Bldg Rm 204',
    tags: ['Scholarships', 'Financial Aid', 'Grants', 'Tuition'],
    eligibility: 'Full-time matriculated students with good academic standing',
    contact: 'finaid@university.edu',
    actionText: 'Submit Scholarship Application',
    actionUrl: '#',
    metrics: [
      { label: 'Total Endowment', value: '$1.5 Million' },
      { label: 'Deadline', value: 'Nov 05, 2026' },
      { label: 'Awards Count', value: '250+ Grants' }
    ]
  },
  {
    id: 'ann-course-registration',
    title: 'Mandatory Semester Elective Selection & Credit Audit for Spring 2027 Pre-Registration',
    category: 'announcement',
    department: 'Office of the University Registrar',
    date: 'Oct 06, 2026',
    deadline: 'Oct 25, 2026 · 6:00 PM',
    summary: 'Pre-registration for Spring 2027 opens for seniors and juniors. Ensure departmental prerequisite checks and faculty advisor sign-offs are completed.',
    content: `The Office of the Registrar requests all enrolled 2nd, 3rd, and 4th-year students to review their Degree Audit Report (DARS) prior to Spring 2027 course selection.
Registration window breakdown:
- Class of 2027 (Final Year / Seniors): Monday, Oct 19, 8:00 AM
- Class of 2028 (Third Year / Juniors): Wednesday, Oct 21, 8:00 AM
- Class of 2029 (Second Year / Sophomores): Friday, Oct 23, 8:00 AM
- Class of 2030 (First Year / Freshmen): Monday, Oct 26, 8:00 AM

Advisor approvals must be electronically recorded via the portal prior to your registration slot opening.`,
    venue: 'University Registrar Portal',
    tags: ['Registrar', 'Electives', 'Course Selection', 'Spring 2027'],
    contact: 'registrar@university.edu',
    metrics: [
      { label: 'Early Window', value: 'Starts Oct 19' },
      { label: 'Max Credits', value: '21 Credits/Sem' }
    ]
  },
  {
    id: 'ann-transit-safety',
    title: 'Campus Transit Night-Owl Shuttle Expansion & SafeWalk Escort Service Update',
    category: 'announcement',
    department: 'Campus Safety & Transportation Authority',
    date: 'Oct 04, 2026',
    summary: 'Two new electric shuttle lines connecting North Quad, off-campus apartment complexes, and metro stations operate nightly until 3:30 AM.',
    content: `In response to student feedback from the University Senate safety audit, Campus Transit has added two direct express routes:
- Route Blue (North Campus Tech Park - Downtown Metro Station)
- Route Gold (South Quad Dormitories - Westside Student Housing Village)
Both routes run at 15-minute intervals between 9:00 PM and 3:30 AM every night.
Additionally, the campus SafeWalk escort service can be requested via student ID card tap at any blue emergency kiosk or directly through the Campus Mobile app.`,
    venue: 'Campus-wide Shuttles & Blue Emergency Kiosks',
    tags: ['Campus Safety', 'Transportation', 'Shuttle', 'Night Service'],
    contact: 'safety-transit@university.edu',
    metrics: [
      { label: 'Frequency', value: 'Every 15 mins' },
      { label: 'Operating Hours', value: '9:00 PM - 3:30 AM' }
    ]
  },

  // --- EVENTS & WORKSHOPS ---
  {
    id: 'event-agentic-ai',
    title: 'Hands-On Intensive Workshop: Building Agentic LLM Applications with Gemini & PyTorch',
    category: 'event',
    department: 'Google Developer Student Club & ACM Student Chapter',
    date: 'Oct 17, 2026 · 10:00 AM - 4:00 PM',
    deadline: 'Oct 15, 2026 · 11:59 PM',
    summary: 'Full-day deep dive into multi-modal models, tool calling, vector search, and deploying low-latency AI assistants. Includes free cloud credits and lunch.',
    content: `Join GDSC and the ACM Student Chapter for a comprehensive hands-on workshop led by senior AI researchers and visiting engineers from Google.
Workshop curriculum:
- Session 1 (10:00 AM - 12:00 PM): Fundamentals of Gemini 3 models, structured JSON output, and multi-modal prompting
- Networking Lunch & Project Team Formation (12:00 PM - 1:00 PM): Free catered meal
- Session 2 (1:00 PM - 3:00 PM): Implementing function calling, memory stores, and real-time streaming tools
- Session 3 (3:00 PM - 4:00 PM): Live deployment of custom student agents with code reviews and swag giveaways

Prerequisites: Basic familiarity with Python or TypeScript. Bring your laptop and charger. Free $100 cloud credits voucher provided to all verified attendees.`,
    venue: 'Turing Hall, CS Building Aud-1 & Virtual Stream',
    featured: true,
    tags: ['AI/ML', 'Google', 'Workshop', 'Hands-On', 'Free Swag'],
    eligibility: 'All university students (Limited to 150 in-person seats)',
    contact: 'gdsc-leads@university.edu',
    actionText: 'Reserve Workshop Seat',
    actionUrl: '#',
    metrics: [
      { label: 'Seats', value: '150 In-person' },
      { label: 'Cloud Credits', value: '$100 / Student' },
      { label: 'Fee', value: 'Free of Cost' }
    ]
  },
  {
    id: 'event-alumni-fintech',
    title: 'Distinguished Alumni Fireside Chat: "From Dorm Room MVP to $2B FinTech Unicorn"',
    category: 'event',
    department: 'Center for Entrepreneurship & Innovation',
    date: 'Oct 21, 2026 · 5:30 PM - 7:30 PM',
    summary: 'Alumna Priya Raman (Class of 2019), Founder & CEO of PayFlow, shares insights on product market fit, venture capital, and university startup incubation.',
    content: `The Center for Entrepreneurship invites you to an intimate evening talk and Q&A with Priya Raman, who started her fintech platform in our very own university incubator hub.
Agenda:
- 5:30 PM: Doors open & student startup demo showcase
- 6:00 PM: Keynote & Moderated Fireside Chat by Dean of Management
- 7:00 PM: Open Student Q&A
- 7:30 PM: Networking mixer with local angel investors and venture scouts

Catering and light refreshments provided. Dress code: Business casual.`,
    venue: 'Starlight Auditorium, Graduate School of Business',
    tags: ['Entrepreneurship', 'Alumni', 'Startups', 'Networking'],
    eligibility: 'Open to all students and alumni',
    contact: 'entrepreneurship@university.edu',
    metrics: [
      { label: 'Speaker', value: 'Priya Raman (CEO)' },
      { label: 'Topic', value: 'Venture & Startups' }
    ]
  },
  {
    id: 'event-cultural-gala',
    title: 'Annual Fall Cultural Extravaganza "Spectra 2026": Band Auditions & Ticket Bookings',
    category: 'event',
    department: 'Student Cultural Council & Arts Guild',
    date: 'Nov 06 - 08, 2026',
    deadline: 'Oct 22, 2026 for Audition Entries',
    summary: 'A 3-day campus festival featuring 40+ college bands, theatrical productions, dance battles, art installations, and international food trucks.',
    content: `Spectra 2026, the premier university cultural fest, is back! This year’s theme is "Neon Horizons". 
Highlights include:
- Battle of the Bands (Grand Prize: $3,000 + Studio Recording Time)
- Inter-College Choreography Showcase
- Stand-up Comedy Night featuring prominent national comedians
- Food Truck Alley with dishes from 18 global cuisines

Student bands and performers must submit audition video reels to the Cultural Council portal by October 22. Early bird student tickets ($5 for 3-day pass) go live Monday.`,
    venue: 'University Amphitheatre & Central Lawns',
    tags: ['Cultural Fest', 'Music', 'Arts', 'Campus Life'],
    contact: 'cultural-council@university.edu',
    metrics: [
      { label: 'Duration', value: '3 Days' },
      { label: 'Expected Footfall', value: '8,000+ Students' }
    ]
  },
  {
    id: 'event-uiux-masterclass',
    title: 'Design Systems & Modern Product UI/UX Masterclass with Lead Designers from Figma',
    category: 'event',
    department: 'Department of Human-Computer Interaction & Design',
    date: 'Oct 23, 2026 · 2:00 PM - 5:00 PM',
    summary: 'Learn enterprise design tokens, component accessibility, micro-animations, and portfolio critique from industry experts.',
    content: `Whether you are a CS student wanting to build cleaner web frontends or an aspiring product designer, this interactive masterclass will sharpen your skills.
Participants will receive a design system starter kit and participate in a live 45-minute lightning portfolio review.`,
    venue: 'Design Studio Lab 304 & Zoom Webcast',
    tags: ['UI/UX', 'Design', 'Figma', 'Product'],
    contact: 'hci-club@university.edu',
    metrics: [
      { label: 'Format', value: 'Hybrid (Lab + Zoom)' },
      { label: 'Software', value: 'Figma & Framer' }
    ]
  },

  // --- HACKATHONS ---
  {
    id: 'hack-innovatehacks',
    title: 'InnovateHacks 2026: 36-Hour National Collegiate Hackathon ($25,000 Prize Pool)',
    category: 'hackathon',
    department: 'School of Engineering & Tech Innovation Society',
    date: 'Nov 13 - 15, 2026',
    deadline: 'Oct 28, 2026 · 11:59 PM',
    summary: 'Over 800 hackers from 50 universities gathering on campus. Major tracks in Agentic AI, Climate Tech, Healthcare, and Decentralized Systems.',
    content: `The University’s premier national hackathon returns for its 7th edition! Join us for 36 hours of non-stop coding, hardware prototyping, and mentorship from top tech companies.
Tracks & Awards:
1. Agentic AI & Generative Workflows ($7,500 Grand Prize) - Sponsored by Google Cloud
2. Climate & Sustainable Smart Cities ($5,000) - Sponsored by CleanTech Ventures
3. Digital Health & Medical Diagnostics ($5,000) - Sponsored by MedTech Alliance
4. Open Innovation & Best Hardware Hack ($4,000)
5. Best Beginner / Freshman Team ($2,000)

What is provided:
- Free meals, midnight pizza, energy drinks, and snacks throughout the 36 hours
- Hardware lab access with Raspberry Pi 5, ESP32, and sensor kits
- Direct recruitment booths with sponsoring engineering managers
- Travel stipends available for select out-of-state teams.`,
    venue: 'Student Activities Complex & Innovatech Hall',
    image: '/src/assets/images/event_hackathon_1791640128996.jpg',
    featured: true,
    tags: ['Hackathon', 'AI', 'Prizes', 'Team Competition', 'Coding'],
    eligibility: 'All undergraduate and graduate students. Teams of 2 to 4 members.',
    contact: 'team@innovatehacks.org',
    actionText: 'Register Hackathon Team',
    actionUrl: '#',
    metrics: [
      { label: 'Prize Pool', value: '$25,000' },
      { label: 'Team Size', value: '2 - 4 Hackers' },
      { label: 'Duration', value: '36 Hours' },
      { label: 'Registration', value: 'Closes Oct 28' }
    ]
  },
  {
    id: 'hack-code-for-good',
    title: 'Campus Social Impact Sprint "CodeForGood": 24-Hour Non-Profit Tech Challenge',
    category: 'hackathon',
    department: 'Center for Community Engagement & CS Outreach',
    date: 'Oct 24 - 25, 2026',
    deadline: 'Oct 18, 2026 · 6:00 PM',
    summary: 'Build real-world software solutions for 6 local NGOs and community clinics. Winning projects receive $5,000 grants for full semester deployment.',
    content: `Work directly with representatives from local food banks, community mental health clinics, and educational non-profits to build tools they genuinely need.
Mentors will be present from social impact startups to assist with architecture, security, and mobile UX. No prior hackathon experience required!`,
    venue: 'Innovation Hub Incubator Space, Floor 2',
    tags: ['Social Impact', 'Hackathon', 'NGO', 'Community'],
    eligibility: 'Open to all students across all academic majors',
    contact: 'codeforgood@university.edu',
    metrics: [
      { label: 'Grant Pool', value: '$10,000' },
      { label: 'NGO Partners', value: '6 Organizations' },
      { label: 'Team Size', value: '1 - 4 Members' }
    ]
  },
  {
    id: 'hack-cyberdefend',
    title: 'CyberDefend 2026: Collegiate Capture-The-Flag (CTF) Cybersecurity Championship',
    category: 'hackathon',
    department: 'Cybersecurity Research Institute & Information Assurance Group',
    date: 'Oct 30, 2026 · 6:00 PM - Midnight',
    deadline: 'Oct 26, 2026 · 11:59 PM',
    summary: 'Compete in binary exploitation, reverse engineering, web penetration, cryptography, and digital forensics challenges with live leaderboards.',
    content: `Put your defensive and offensive cyber skills to the test in this fast-paced 6-hour CTF tournament.
Sponsored by leading national defense labs and cyber consulting firms. Top performers will be invited to priority security engineering interviews.`,
    venue: 'Cyber Range Lab, Turing Hall 204 & Remote VPN',
    tags: ['Cybersecurity', 'CTF', 'Hacking', 'Infosec'],
    eligibility: 'Current university students with valid student email',
    contact: 'ctf-admin@university.edu',
    metrics: [
      { label: 'Prize Money', value: '$4,000' },
      { label: 'Duration', value: '6 Hours' },
      { label: 'Platform', value: 'Custom CTFd' }
    ]
  },

  // --- PLACEMENT UPDATES ---
  {
    id: 'place-google-swe',
    title: 'Google Campus Placement Drive 2026-27: Software Engineer (SWE) & APM Roles',
    category: 'placement',
    department: 'University Career Center & Placement Directorate',
    date: 'Oct 09, 2026',
    deadline: 'Oct 19, 2026 · 11:59 PM',
    summary: 'Google visits campus for full-time Class of 2027 recruitment. Compensation package: $145k - $165k base + equity. Online coding round scheduled Oct 24.',
    content: `The University Career Center is pleased to announce the opening of applications for Google's Annual On-Campus Recruitment Drive for graduating students (Class of 2027).
Roles Offered:
1. Software Engineer (SWE) - Systems, Core Infrastructure, Web & Cloud
2. Associate Product Manager (APM) - AI & Consumer Products
3. Site Reliability Engineer (SRE)

Eligibility & Cutoffs:
- Degree: B.Tech / B.S. / M.S. in Computer Science, Data Science, Electrical & Computer Engineering, or Mathematics
- Academic Standing: Minimum CGPA $\ge 7.50$ (or 3.20/4.00) with zero active academic backlogs
- Graduation Year: Spring / Summer 2027

Hiring Timeline:
- Resume Submission & Portal Registration Closes: October 19, 11:59 PM
- Pre-Placement Talk & Tech Q&A: October 21, 5:00 PM (Main Auditorium)
- Online Coding Assessment (OA): Saturday, October 24 (90 mins, Proctoring mandatory)
- Technical Interviews (2 Rounds) & Googliness Round: October 30 - 31 (In-person on campus)

Important: Please format resumes according to the Career Center standard 1-page template. Late applications will not be processed by Google University Programs.`,
    venue: 'Online Portal & Placement Cell Interview Suites, Block D',
    image: '/src/assets/images/career_placement_drive_1791640147551.jpg',
    featured: true,
    tags: ['Google', 'SWE', 'High CTC', 'Tech Placement', 'Class of 2027'],
    eligibility: 'Final Year CS, ECE, Data Science with CGPA >= 7.5',
    contact: 'placements@university.edu',
    actionText: 'Register on Career Portal',
    actionUrl: '#',
    metrics: [
      { label: 'Package (CTC)', value: '$145k - $165k' },
      { label: 'Eligible CGPA', value: '>= 7.5 / 10' },
      { label: 'Assessment Date', value: 'Oct 24, 2026' },
      { label: 'Role', value: 'SWE & APM' }
    ]
  },
  {
    id: 'place-microsoft-intern',
    title: 'Microsoft Cloud & AI Summer 2027 Internship Drive: Pre-Placement Talk & Fast-Track OA',
    category: 'placement',
    department: 'Career Services & Industry Relations',
    date: 'Oct 08, 2026',
    deadline: 'Oct 18, 2026 · 5:00 PM',
    summary: 'Summer 2027 internship opportunities for 2nd and 3rd-year students in Azure, Windows, and Generative AI teams. Monthly stipend $9,500 + housing.',
    content: `Microsoft is launching its summer internship drive for pre-final year students (graduating 2028).
The internship spans 12 weeks with strong pre-placement offer (PPO) conversion history (82% conversion rate in 2026).
- Minimum CGPA required: 7.0 / 10
- Pre-placement talk: October 18, 4:00 PM in Science Atrium
- Shortlisted candidates will receive Codility assessment links on October 20.`,
    venue: 'Science Atrium & Virtual Teams',
    tags: ['Microsoft', 'Internship', 'Azure', 'PPO', 'Cloud'],
    eligibility: '2nd & 3rd Year undergraduates across all engineering streams',
    contact: 'internships@university.edu',
    metrics: [
      { label: 'Monthly Stipend', value: '$9,500 / mo' },
      { label: 'Min CGPA', value: '7.0 / 10' },
      { label: 'Duration', value: '12 Weeks' },
      { label: 'Target Batch', value: 'Class of 2028' }
    ]
  },
  {
    id: 'place-deloitte-analyst',
    title: 'Deloitte Strategy & Analytics Campus Recruitment Drive: Registration Closing Soon',
    category: 'placement',
    department: 'University Placement Office',
    date: 'Oct 07, 2026',
    deadline: 'Oct 22, 2026 · 11:59 PM',
    summary: 'Open to all engineering, business, and economics final year students. Roles in Technology Consulting, Cloud Transformation, and Financial Risk Analytics.',
    content: `Deloitte Consulting invites graduating seniors from diverse academic backgrounds for the 2026-27 campus hiring season.
Selection stages:
1. Aptitude & Reasoning Online Test (Oct 25)
2. Business Case Study & Group Discussion (Oct 28)
3. Partner Behavioral & Technical Interview (Oct 31)

Package: $85,000 base + joining bonus + rapid promotion track.`,
    venue: 'Career Center Boardrooms & Video Conference Suites',
    tags: ['Deloitte', 'Consulting', 'Analytics', 'All Majors'],
    eligibility: 'Final year all majors with CGPA >= 6.5 and no active backlogs',
    contact: 'consulting-placements@university.edu',
    metrics: [
      { label: 'Compensation', value: '$85,000 + Bonus' },
      { label: 'Min CGPA', value: '6.5 / 10' },
      { label: 'Test Date', value: 'Oct 25, 2026' }
    ]
  },
  {
    id: 'place-stripe-fintech',
    title: 'Stripe Engineering Placement Drive: Full-Stack & Infrastructure Teams',
    category: 'placement',
    department: 'Career Development Office',
    date: 'Oct 05, 2026',
    deadline: 'Oct 21, 2026 · 6:00 PM',
    summary: 'Stripe is hiring 15 graduating engineers for global payments infrastructure. Highly competitive packages with remote flexibility options.',
    content: `Stripe's university recruiting team is hosting an exclusive on-campus coding evaluation for students passionate about API design, distributed systems, and banking rail infrastructure.
Key requirements: solid fundamentals in data structures, concurrency, and API architecture. Take-home system design or live pair programming rounds.`,
    venue: 'Online HackerRank Assessment',
    tags: ['Stripe', 'FinTech', 'Full-Stack', 'High CTC'],
    eligibility: 'Final Year CS / EE / Software Engineering students',
    contact: 'careers@stripe.com',
    metrics: [
      { label: 'Openings', value: '15 Positions' },
      { label: 'Assessment', value: 'HackerRank' }
    ]
  }
];

// Quick knowledge base compiler to pass as grounded context to Gemini
export function getCampusKnowledgeBase(): string {
  return CAMPUS_ITEMS.map((item) => {
    return `[ID: ${item.id}]
TITLE: ${item.title}
CATEGORY: ${item.category.toUpperCase()}
DEPARTMENT: ${item.department}
DATE: ${item.date}
${item.deadline ? `DEADLINE: ${item.deadline}` : ''}
${item.venue ? `VENUE: ${item.venue}` : ''}
${item.eligibility ? `ELIGIBILITY: ${item.eligibility}` : ''}
${item.metrics ? `METRICS: ${item.metrics.map(m => `${m.label}: ${m.value}`).join(', ')}` : ''}
SUMMARY: ${item.summary}
CONTENT: ${item.content}
TAGS: ${item.tags.join(', ')}
---`;
  }).join('\n\n');
}
