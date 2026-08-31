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
    title: "ISAT Recruiter",
    description:
      "Built and deployed an AI-powered academic advising agent for JMU's ISAT program — full-stack system with LangGraph, Next.js, and PostgreSQL.",
    tags: ["AI", "Web"],
    liveUrl: "https://isat-recruiter-2w1a-n2hnyxvr6-sophias-projects-5010dcb3.vercel.app/",
    githubUrl: "https://github.com/sophiafeld1/ISATRecruiter",
    image: "assets/isat-recruiter.png",
  },
  {
    title: "Path to Peace Psychotherapy",
    description:
      "Built and deployed a production website for a psychotherapy practice — from design through launch on Vercel.",
    tags: ["Web"],
    liveUrl: "https://path2-peace.vercel.app/",
    githubUrl: "https://github.com/SophiaFeld1/Path2Peace",
    image: "assets/path-to-peace.png",
  },
  {
    title: "E3 Sponsor Database",
    description:
      "Built a Streamlit app for Empowerment3 that centralizes sponsor records and generates customized outreach emails — search and filter the database, then populate sponsorship emails from record fields and criteria (template-driven)",
    tags: ["Streamlit", "Database"],
    liveUrl: "https://sophiafeld1-empowerment3-app-bbtrse.streamlit.app/",
    githubUrl: "https://github.com/sophiafeld1/Empowerment3",
    image: "assets/e3-sponsor-database.png",
  },
];
