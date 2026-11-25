// Programme schedule transcribed from MTMM26_Schedule.pdf (also served at /docs/MTMM26_Schedule.pdf).

// WHY: "short" marks the 20-minute talks (orange in the PDF); kept as data only, rendered the same as other talks
export type TalkItem = { kind: "talk" | "short"; time: string; speaker: string; affiliation: string; title: string };
export type NonTalkItem = { kind: "break" | "event"; time: string; label: string; note?: string };
export type ProgramItem = TalkItem | NonTalkItem;

export const isTalk = (item: ProgramItem): item is TalkItem => item.kind === "talk" || item.kind === "short";

export type ProgramSession = { name: string; items: ProgramItem[] };
// isoDate (YYYY-MM-DD, conference local date) drives "Today" auto-selection and the live "Now" highlight
export type ProgramDay = { day: string; date: string; isoDate: string; sessions: ProgramSession[] };

// WHY: Session times in the schedule are local to Tezpur, so "now" is always evaluated in India Standard Time
export const PROGRAM_TIME_ZONE = "Asia/Kolkata";

export const PROGRAM_PDF_URL = "/docs/MTMM26_Schedule.pdf";
export const PROGRAM_VENUE = "Council Hall, Tezpur University";

const dinner: ProgramItem = { kind: "break", time: "20:00 onwards", label: "Dinner", note: "Niribili Guest House" };

export const program: ProgramDay[] = [
  {
    day: "Day 1",
    date: "Wednesday, 2 December 2026",
    isoDate: "2026-12-02",
    sessions: [
      {
        name: "Inaugural Session",
        items: [
          { kind: "event", time: "13:00–14:30", label: "Registration" },
          { kind: "event", time: "14:30–15:00", label: "Inaugural Ceremony" },
        ],
      },
      {
        name: "Session I",
        items: [
          { kind: "talk", time: "15:00–15:30", speaker: "Prof. S. Ramasesha", affiliation: "IISc Bangalore, India", title: "Kinetic Monte Carlo Studies of Magnetization Relaxation" },
          { kind: "talk", time: "15:30–16:00", speaker: "Prof. Rodolphe Clérac", affiliation: "University of Bordeaux - CNRS, France", title: "Redox Engineering of Metal-Organic Materials: From Magnetic Semiconductors and Metals, to Room-Temperature Hard Magnets" },
          { kind: "talk", time: "16:00–16:30", speaker: "Prof. Peter Comba", affiliation: "Heidelberg University, Germany", title: "Validation of ab-initio-predicted magnetic anisotropies in Dy(III) compounds" },
          { kind: "break", time: "16:30–16:45", label: "Tea Break" },
        ],
      },
      {
        name: "Session II",
        items: [
          { kind: "talk", time: "16:45–17:15", speaker: "Prof. Javier Campo", affiliation: "Aragón Materials Science Institute, Spain", title: "Magnetic long-range order in a purely organic triangular magnet" },
          { kind: "talk", time: "17:15–17:45", speaker: "Prof. Szymon Chorąży", affiliation: "Jagiellonian University, Poland", title: "From ratiometric luminescent thermometry to luminescent detection of photomagnetism in lanthanide-based molecular magnets" },
          { kind: "short", time: "17:45–18:05", speaker: "Prof. Shouvik Chatterjee", affiliation: "TIFR Mumbai, India", title: "Template-Engineered Polar Distortion in a Dirac Semimetal Enables Non-linear Hall Response" },
          dinner,
        ],
      },
    ],
  },
  {
    day: "Day 2",
    date: "Thursday, 3 December 2026",
    isoDate: "2026-12-03",
    sessions: [
      {
        name: "Session III",
        items: [
          { kind: "talk", time: "09:00–09:30", speaker: "Prof. Ramaswamy Murugavel", affiliation: "IIT Bombay, India", title: "Phosphonamides as Futuristic Ligands for f-Block Magnetism" },
          { kind: "talk", time: "09:30–10:00", speaker: "Prof. Masanori Wakizaka", affiliation: "CIST, Japan", title: "Single-ion magnetism in the doped metal-organic frameworks" },
          { kind: "talk", time: "10:00–10:30", speaker: "Prof. Abhishake Mondal", affiliation: "IISc Bangalore, India", title: "Designing Molecular Systems with Multi-Stimuli-Responsive Bistability" },
          { kind: "short", time: "10:30–10:50", speaker: "Prof. Sanchita Goswami", affiliation: "University of Calcutta, India", title: "3d, 4f and 3d-4f complexes: from molecular design to magnetic properties" },
          { kind: "break", time: "10:50–11:05", label: "Tea Break" },
        ],
      },
      {
        name: "Session IV",
        items: [
          { kind: "talk", time: "11:05–11:35", speaker: "Prof. Talal Mallah", affiliation: "Paris-Saclay University, France", title: "Ni(II) Complexes as Spin Quantum Bits with a Clock Transition" },
          { kind: "talk", time: "11:35–12:05", speaker: "Prof. Peter Weinberger", affiliation: "TU Wien, Austria", title: "Tetrazoles as versatile ligands - on the way to establish structure-property relationships in photoluminescent Fe(II) SCO compounds" },
          { kind: "talk", time: "12:05–12:35", speaker: "Prof. Anirban Misra", affiliation: "University of North Bengal, India", title: "Electronic Structure-Property Relationships in Open-Shell Transition-Metal Complexes: From Magnetic Exchange Coupling to EPR Spectroscopic Parameters" },
          { kind: "short", time: "12:35–12:55", speaker: "Prof. K. R. Vignesh", affiliation: "IISER Mohali, India", title: "Mixed 3d-4f Single-Molecule Toroics as Quantum Spin Sensors" },
          { kind: "break", time: "12:55–13:45", label: "Lunch Break", note: "Community Hall" },
          { kind: "event", time: "13:45–14:45", label: "Poster Presentation", note: "Community Hall" },
          { kind: "event", time: "14:45–14:55", label: "Conference Photo Session", note: "Badminton Court, Department of Chemical Sciences" },
        ],
      },
      {
        name: "Session V",
        items: [
          { kind: "talk", time: "15:00–15:30", speaker: "Prof. Joris van Slageren", affiliation: "University of Stuttgart, Germany", title: "Electronic structure of mononuclear and radical-bridged dinuclear cobalt(II) single-molecule magnets" },
          { kind: "talk", time: "15:30–16:00", speaker: "Prof. Corine Mathonière", affiliation: "Université de Bordeaux CNRS, France", title: "Modulating electron transfer properties in cyanido-bridged Fe/Co pairs via anion exchange" },
          { kind: "talk", time: "16:00–16:30", speaker: "Prof. José J. Baldoví", affiliation: "University of València, Spain", title: "Chemical Engineering of 2D Materials: from Magnonics to Molecular Altermagnets" },
          { kind: "break", time: "16:30–16:45", label: "Tea Break" },
        ],
      },
      {
        name: "Session VI",
        items: [
          { kind: "talk", time: "16:45–17:15", speaker: "Prof. Grace G. Morgan", affiliation: "University College Dublin, Ireland", title: "Spin State Switching in Crystals and Soft Matter" },
          { kind: "short", time: "17:15–17:35", speaker: "Prof. Vasudeva Siruguri", affiliation: "Pillai University, India", title: "Neutron scattering: a powerful technique to probe magnetic materials" },
          { kind: "event", time: "18:30–20:00", label: "Cultural Programme", note: "Kalaguru Bishnu Prasad Rabha Auditorium" },
          dinner,
        ],
      },
    ],
  },
  {
    day: "Day 3",
    date: "Friday, 4 December 2026",
    isoDate: "2026-12-04",
    sessions: [
      {
        name: "Session VII",
        items: [
          { kind: "talk", time: "09:00–09:30", speaker: "Prof. Masahiro Yamashita", affiliation: "Tohoku University, Japan", title: "Molecular Spin Qubits toward Quantum Computer and High-Density Memory Devices Based on Molecular Magnets" },
          { kind: "talk", time: "09:30–10:00", speaker: "Prof. Swapan Kumar Pati", affiliation: "JNCASR, India", title: "Computational Modeling of Competing Quantum Magnetic Phases and Possible Quantum Spin Liquid Candidates" },
          { kind: "talk", time: "10:00–10:30", speaker: "Prof. Gopalan Rajaraman", affiliation: "IIT Bombay, India", title: "Accelerating the Discovery of Molecular Magnets through Machine Learning and Generative Artificial Intelligence" },
          { kind: "short", time: "10:30–10:50", speaker: "Prof. Prashurya Pritam Mudoi", affiliation: "Dibrugarh University, Assam", title: "Protonation-Assisted Charge Transfer and Magnetic Properties in Cyanido-Bridged Heterometallic Complexes" },
          { kind: "break", time: "10:50–11:05", label: "Tea Break" },
        ],
      },
      {
        name: "Session VIII",
        items: [
          { kind: "talk", time: "11:05–11:35", speaker: "Prof. Rodrigue Lescouëzec", affiliation: "Sorbonne Université, France", title: "Cooperativity in Fe₂Co₂ Charge-Transfer Switchable Complexes: insights from Pressure Studies & Optical Microscopy" },
          { kind: "talk", time: "11:35–12:05", speaker: "Prof. Yoshihiro Sekine", affiliation: "Kumamoto University, Japan", title: "Tuning Electron-Transfer Phase Transitions through Intermolecular Interactions in Cyanide-Bridged Co-Fe Complexes" },
          { kind: "talk", time: "12:05–12:35", speaker: "Prof. John F. Berry", affiliation: "University of Wisconsin-Madison, USA", title: "Magnetic Properties of Heterometallic Extended Metal Atom Chains" },
          { kind: "short", time: "12:35–12:55", speaker: "Prof. Chinmoy Das", affiliation: "SRM University, India", title: "Emergent Spin-Glass Behaviour in an Iron(II)-based Metal-Organic Framework Glass" },
          { kind: "event", time: "12:55–13:05", label: "LabIndia Analytical Instruments Pvt. Ltd. Presentation" },
          { kind: "break", time: "13:05–14:05", label: "Lunch Break", note: "Community Hall" },
          { kind: "event", time: "14:05–15:05", label: "Poster Presentation", note: "Community Hall" },
        ],
      },
      {
        name: "Session IX",
        items: [
          { kind: "talk", time: "15:05–15:35", speaker: "Prof. Nathalie Guihéry", affiliation: "University of Toulouse, France", title: "Impact of the Magneto-electric Effect on the ZFS Parameters" },
          { kind: "talk", time: "15:35–16:05", speaker: "Prof. Maheswaran Shanmugam", affiliation: "IIT Bombay, India", title: "Quantifying Magnetic Anisotropy and Exchange Interactions in a Metamagnetic Cobalt(II) System Based on Ferromagnetically Coupled Ising Spin Chains" },
          { kind: "short", time: "16:05–16:25", speaker: "Dr. Rajamani Raghunathan", affiliation: "UGC-DAE CSR Indore", title: "Unconventional electronic and magnetic ground states of 5/7 skewed ladder" },
          { kind: "break", time: "16:25–16:40", label: "Tea Break" },
        ],
      },
      {
        name: "Session X",
        items: [
          { kind: "talk", time: "16:40–17:10", speaker: "Prof. Federico Totti", affiliation: "University of Florence, Italy", title: "Tuning the Molecular Beat: From Atomic Doping to Photoactivated Spin Coupling" },
          { kind: "talk", time: "17:10–17:40", speaker: "Dr. Mahesh Sundararajan", affiliation: "BARC, Mumbai, India", title: "Tuning the Magnetic Anisotropy of Co(II)TPMA Complexes decorated with Supramolecular Architectures" },
          { kind: "short", time: "17:40–18:00", speaker: "Prof. Pratap Vishnoi", affiliation: "JNCASR, India", title: "Steering Lattice Dimensionality and Magnetism in Low-Dimensional Halide Perovskites by Chemical Design" },
          dinner,
        ],
      },
    ],
  },
  {
    day: "Day 4",
    date: "Saturday, 5 December 2026",
    isoDate: "2026-12-05",
    sessions: [
      {
        name: "Session XI",
        items: [
          { kind: "talk", time: "09:00–09:30", speaker: "Prof. Mario Ruben", affiliation: "KIT, Germany", title: "Isotopologue coordination chemistry: quantum computing with molecules and optically-detected NMR (OD-NMR)" },
          { kind: "talk", time: "09:30–10:00", speaker: "Prof. Shinya Hayami", affiliation: "Kumamoto University, Japan", title: "Slow Magnetic Relaxation in Spin-Crossover Complexes" },
          { kind: "talk", time: "10:00–10:30", speaker: "Prof. David J. R. Brook", affiliation: "San José State University, USA", title: "Magnetism and Mixed Valence. Hidden Complexity and State Switching in Transition Metal-Verdazyl Coordination Compounds" },
          { kind: "short", time: "10:30–10:50", speaker: "Prof. Sandeep K. Gupta", affiliation: "IIT Delhi, India", title: "Engineering Magnetic Anisotropy in Cobalt Complexes: Interplay of Coordination Geometry, Electronic Structure, and Magnetic Exchange" },
          { kind: "break", time: "10:50–11:05", label: "Tea Break" },
        ],
      },
      {
        name: "Session XII",
        items: [
          { kind: "talk", time: "11:05–11:35", speaker: "Prof. Daniel R. Talham", affiliation: "University of Florida, USA", title: "Interface and Matrix Effects on Spin Transition Solids" },
          { kind: "talk", time: "11:35–12:05", speaker: "Prof. Ludovic Jaubert", affiliation: "University of Bordeaux, France", title: "The frustrated centred pyrochlore in metal-organic frameworks" },
          { kind: "talk", time: "12:05–12:35", speaker: "Prof. Md. Ehesan Ali", affiliation: "INST Mohali, India", title: "Exchange Pathways and Relaxation Dynamics in Molecular Spin Architectures" },
          { kind: "short", time: "12:35–12:55", speaker: "Prof. Pragati Pandey", affiliation: "IIT Jodhpur, India", title: "Praseodymium (IV): A Journey of Unusual Oxidation State and Magnetic Properties" },
          { kind: "break", time: "12:55–13:55", label: "Lunch Break", note: "Community Hall" },
        ],
      },
      {
        name: "Session XIII",
        items: [
          { kind: "talk", time: "13:55–14:25", speaker: "Prof. Birgit Weber", affiliation: "Friedrich-Schiller-Universität Jena, Germany", title: "Hysteresis and Trapping Effects in Iron(II) and Iron(III) Spin Crossover Complexes" },
          { kind: "talk", time: "14:25–14:55", speaker: "Prof. Pierre Dechambenoit", affiliation: "University of Bordeaux, France", title: "Delocalizing Spins and Charges: New Pathways to High Temperature Molecule-Based Magnets and Conductors" },
          { kind: "talk", time: "14:55–15:25", speaker: "Prof. Marius Andruh", affiliation: "University of Bucharest, Romania", title: "Paramagnetic, Compartmental, and Chiral Ligands for Magnetic and Luminescent Complexes" },
          { kind: "short", time: "15:25–15:45", speaker: "Prof. Saurabh Kumar Singh", affiliation: "IIT Hyderabad, India", title: "From Chemical Bonding to Molecular Magnetism: Insights into Actinide Covalency and Nanostructured Single-Molecule Magnets" },
          { kind: "break", time: "15:45–16:00", label: "Tea Break" },
        ],
      },
      {
        name: "Session XIV",
        items: [
          { kind: "talk", time: "16:00–16:30", speaker: "Prof. Pradip K. Chakraborty", affiliation: "IIT Kharagpur, India", title: "Stimuli-responsive Structure-property Interplay in Fe(II)-based Spin crossover Materials: Fascinating Diversity at the Fundamental Level" },
          { kind: "talk", time: "16:30–17:00", speaker: "Prof. Lorenzo Sorace", affiliation: "University of Florence, Italy", title: "Cantilever Torque Magnetometry as a platform for characterizing Molecular Qubits" },
          { kind: "short", time: "17:00–17:20", speaker: "Prof. Arup Sarkar", affiliation: "SRM University, India", title: "Ab Initio Insights into Spin Relaxation in Organic Diradicals" },
          { kind: "event", time: "17:20–18:00", label: "Valedictory Session" },
          dinner,
        ],
      },
    ],
  },
];
