// Edit this file to add your projects, skills, and contact links.

const siteConfig = {
  name: "Sophia Feldman",
  tagline: "Software development, AI, and data science.",
  about:
    "Recently graduated from James Madison University with a multidisciplinary background in software development, AI, and data science. I enjoy building practical applications that solve real problems, from agentic AI systems to full-stack web applications.",
  skillCategories: [
    {
      title: "Programming",
      skills: ["Python", "SQL", "R", "Pandas", "NumPy"],
    },
    {
      title: "AI & ML",
      skills: ["OpenAI API", "LangGraph", "RAG", "TensorFlow/Keras", "Scikit-learn"],
    },
    {
      title: "Software & Data",
      skills: ["PostgreSQL", "ETL", "REST APIs", "Flask", "Streamlit", "Docker", "Git", "AWS EC2", "Linux"],
    },
  ],
  contact: [
    { label: "Copy email", type: "email", value: "sophia.fay.f@gmail.com" },
    { label: "Resume", url: "assets/Sophia_Feldman_Resume.pdf" },
    { label: "GitHub", url: "https://github.com/SophiaFeld1" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sophia-feldman/" },
  ],
};

const projects = [
  {
    title: "Path to Peace Psychotherapy",
    context: "Visions Web Development",
    client: "Path to Peace Psychotherapy",
    year: "2025",
    projectType: ["Website", "Client Work"],
    role: ["Web development", "Deployment"],
    summary:
      "A production website for a trauma therapy practice in Reston, VA — built and deployed for a real client through Visions web development.",
    detail:
      "Designed and launched the full site on Vercel, including a contact flow powered by the <strong>Postmark API</strong> so the practice can receive inquiries reliably from day one.",
    tools: ["Next.js", "Vercel", "Postmark API", "JavaScript"],
    liveUrl: "https://path2-peace.vercel.app/",
    githubUrl: "https://github.com/SophiaFeld1/Path2Peace",
    image: "assets/path-to-peace.png",
  },
  {
    title: "Visions Clothing",
    context: "Visions Web Development",
    client: "Visions Clothing",
    year: "2020–2022",
    projectType: ["E-commerce", "Website"],
    role: ["Founder", "Web development", "Product design"],
    summary:
      "An online clothing brand I founded — from product design and manufacturing to the e-commerce site and digital marketing.",
    detail:
      "Built under <strong>Visions web development</strong>, generating $1,500+ across 36 sales through the shop site, product curation, and brand marketing.",
    tools: ["Next.js", "Vercel", "E-commerce"],
    liveUrl: "https://visions-shop-sophias-projects-5010dcb3.vercel.app/",
    githubUrl: "https://github.com/sophiafeld1/Visions",
  },
  {
    title: "E3 Sponsor Database",
    context: "Madison Consulting Club",
    client: "Empowerment3",
    year: "2025–2026",
    projectType: ["Database", "Consulting", "Web App"],
    role: ["Project lead", "Full-stack development"],
    summary:
      "A sponsor management and outreach tool built for Empowerment3 — a JMU center for physical activity and wellness for underserved communities.",
    detail:
      "Pro-bono consulting project through the <strong>Madison Consulting Club</strong>. Centralizes sponsor records in a searchable database and generates customized outreach emails from record fields and criteria — template-driven, not AI.",
    tools: ["Streamlit", "Python", "Pandas", "SQL"],
    liveUrl: "https://sophiafeld1-empowerment3-app-bbtrse.streamlit.app/",
    githubUrl: "https://github.com/sophiafeld1/Empowerment3",
    clientUrl: "https://www.jmu.edu/chbs/kinesiology/empowerment3/",
    clientLabel: "Empowerment3",
    image: "assets/e3-sponsor-database.png",
  },
  {
    title: "ISAT Recruiter",
    context: "ISAT Senior Capstone",
    client: "James Madison University · ISAT",
    year: "2025–2026",
    projectType: ["AI Application", "Web App", "Capstone"],
    role: ["Full-stack development", "AI engineering"],
    summary:
      "ISAT Recruiter is an AI-powered advising agent that helps prospective and current students navigate JMU's Integrated Science & Technology program.",
    detail:
      "Built as my <strong>senior capstone</strong>, this agentic RAG application answers questions about courses, concentrations, and prerequisites — and generates 4-year academic plans using ABET documentation, course catalogs, and crawled ISAT website content.",
    tools: ["LangGraph", "RAG", "Next.js", "PostgreSQL", "OpenAI API", "Python"],
    liveUrl: "https://isat-recruiter-2w1a-n2hnyxvr6-sophias-projects-5010dcb3.vercel.app/",
    githubUrl: "https://github.com/sophiafeld1/ISATRecruiter",
    image: "assets/isat-recruiter.png",
  },
];
