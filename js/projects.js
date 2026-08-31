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
    context: "ISAT Senior Capstone",
    description:
      "An AI-powered advising agent that helps prospective and current ISAT students navigate the program — answers questions about courses, concentrations, and prerequisites, and generates 4-year academic plans using RAG over ABET docs, course catalogs, and ISAT website content.",
    tools: ["LangGraph", "RAG", "Next.js", "PostgreSQL", "OpenAI API", "Python"],
    liveUrl: "https://isat-recruiter-2w1a-n2hnyxvr6-sophias-projects-5010dcb3.vercel.app/",
    githubUrl: "https://github.com/sophiafeld1/ISATRecruiter",
    image: "assets/isat-recruiter.png",
  },
  {
    title: "Path to Peace Psychotherapy",
    context: "Visions Web Development",
    description:
      "Built and deployed a production website for a psychotherapy practice in Reston, VA — a client project through Visions web development, with contact forms powered by the Postmark API.",
    tools: ["Next.js", "Vercel", "Postmark API", "JavaScript"],
    liveUrl: "https://path2-peace.vercel.app/",
    githubUrl: "https://github.com/SophiaFeld1/Path2Peace",
    image: "assets/path-to-peace.png",
  },
  {
    title: "E3 Sponsor Database",
    context: "Madison Consulting Club",
    description:
      "Pro-bono consulting project for Empowerment3 — a Streamlit app that centralizes sponsor records and generates customized outreach emails from database fields and criteria (template-driven, not AI).",
    tools: ["Streamlit", "Python", "Pandas", "SQL"],
    liveUrl: "https://sophiafeld1-empowerment3-app-bbtrse.streamlit.app/",
    githubUrl: "https://github.com/sophiafeld1/Empowerment3",
    clientUrl: "https://www.jmu.edu/chbs/kinesiology/empowerment3/",
    clientLabel: "Empowerment3",
    image: "assets/e3-sponsor-database.png",
  },
  {
    title: "Visions Clothing",
    context: "Visions Web Development",
    description:
      "Founded and built an online clothing brand — designed products, built the e-commerce site, and ran digital marketing. Generated $1,500+ across 36 sales.",
    tools: ["Next.js", "Vercel", "E-commerce"],
    liveUrl: "https://visions-shop-sophias-projects-5010dcb3.vercel.app/",
    githubUrl: "https://github.com/sophiafeld1/Visions",
  },
];
