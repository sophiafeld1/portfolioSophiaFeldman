// Edit this file to add your projects, skills, and contact links.

const siteConfig = {
  name: "Sophia Feldman",
  tagline: "Data science, software development, web development, and consulting.",
  heroRotatorPhrases: [
    "a consultant",
    "a data scientist",
    "a software developer",
    "a web developer",
  ],
  headshot: "assets/sophiaheadshot.jpeg",
  linkedinUrl: "https://www.linkedin.com/in/sophia-feldman/",
  // Photos for the About page carousel (left side)
  aboutImages: [
    "assets/about_imgs/IMG_3429.jpeg",
    "assets/about_imgs/IMG_4939.jpeg",
    "assets/about_imgs/IMG_9166.jpeg",
  ],
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
    year: "August 2026",
    projectType: ["Website", "Client Work"],
    role: ["Web development", "Deployment"],
    summary:
      "A production website for a trauma therapy practice in Reston, VA — built and deployed for a real client through Visions web development.",
    detail:
      "Real client work through <strong>Visions Web Development</strong> for a trauma therapy practice in Reston, VA. They needed a site that felt professional and actually worked for new patient inquiries — not a Squarespace template they were paying for every month with limited control over changes. I migrated the site to <strong>Vercel</strong>, rebuilt it in Next.js, and set up a contact flow with the <strong>Postmark API</strong> so inquiries go straight to the practice reliably.",
    Task:
      "Migrate an existing therapy practice website from Squarespace to Vercel and implement a contact form powered by the Postmark API.",
    Impact:
      "Moved the client off Squarespace, which cut hosting costs and gave them more freedom to update and customize the site. Inquiries now go through a dependable email flow they can count on instead of a generic form setup that was hard to change.",
    tools: ["Next.js", "Vercel", "Postmark API", "JavaScript"],
    liveUrl: "https://path2-peace.vercel.app/",
    githubUrl: "https://github.com/SophiaFeld1/Path2Peace",
    image: "assets/path-to-peace-preview.png",
    previewVideo: "assets/path-to-peace-preview.mp4",
  },
  {
    title: "Visions Clothing",
    context: "Visions Web Development",
    client: "Visions Clothing",
    year: "2026",
    projectType: ["E-commerce", "Website"],
    role: ["Founder", "Web development", "Product design"],
    summary:
      "An online clothing brand I founded — from product design and sewing to the e-commerce site and digital marketing.",
    detail:
      "I founded Visions Clothing in 2020 — designing, sewing, and selling handmade pieces through an early shop site that brought in <strong>$1,500+ across 36 sales</strong>. I'm revamping the brand now with a site that actually looks like a real store. Built with Next.js and <strong>Stripe</strong> checkout on Vercel, so customers have a clear path from browsing to buying.",
    Task:
      "Build an e-commerce site with Stripe integration so customers can browse and purchase handmade clothing online.",
    Impact:
      "Relaunched the brand with a professional storefront and Stripe checkout — giving customers a polished, trustworthy way to buy clothing. Builds on what worked in 2020, but with a shop that finally matches the quality of the products.",
    tools: ["Next.js", "Vercel", "E-commerce"],
    liveUrl: "https://visions-shop-sophias-projects-5010dcb3.vercel.app/",
    githubUrl: "https://github.com/sophiafeld1/Visions",
    image: "assets/visions-preview.png",
    previewVideo: "assets/visions-preview.mp4",
  },
  {
    title: "E3 Sponsor Database",
    context: "Madison Consulting Club",
    client: "Empowerment3",
    year: "Spring 2026",
    projectType: ["Consulting", "Database", "Web App"],
    role: ["Project lead", "Full-stack development"],
    summary:
      "A sponsor management and outreach tool built for Empowerment3 — a JMU empowerment center for families, veterans, and individuals with disabilities.",
    detail:
      "Pro-bono consulting through the <strong>Madison Consulting Club</strong>. Empowerment3 — a JMU center serving families, veterans, and individuals with disabilities — had sponsor records scattered across past semesters with no single place to search, update, or follow up. I led the project as PM and built the full app: a <strong>Streamlit</strong> interface on a <strong>SQLite</strong> database where staff can look up sponsors, edit records, and generate outreach emails from templates instead of starting from scratch every time.",
    Task:
      "Turn messy semester-by-semester sponsor records into a centralized, searchable database with a simple UI and template-driven email outreach.",
    Impact:
      "Gave Empowerment3 one place to manage sponsor relationships instead of digging through disconnected records. Outreach is faster and more consistent, which makes it easier to stay in touch with sponsors and keep donations and collaborations moving.",
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
    year: "2026",
    projectType: ["AI Application", "Web App", "Capstone"],
    role: ["Full-stack development", "AI engineering"],
    summary:
      "ISAT Recruiter is an AI-powered advising agent that helps prospective and current students navigate JMU's Integrated Science & Technology program.",
    detail:
      "Built as my <strong>senior capstone</strong>. ISAT is a complicated major — course maps, concentrations, prerequisites, and ABET requirements live across PDFs, the JMU site, and advising materials that don't always line up. Our capstone pitch captured how fragmented it all felt; this project is the response. I built a <strong>context-aware</strong>, multi-agent RAG chatbot that pulls answers from official ISAT documents stored in <strong>PostgreSQL</strong>, so responses stay grounded in real program information instead of generic AI guesses. It also helps students work through 4-year plans when the course map gets confusing. Browse the embedded capstone deck below — one slide includes a live demo of the course planner in action.",
    Task:
      "Build a multi-agent RAG application that answers ISAT advising questions with relevant context from official JMU ISAT site documents, with everything backed by a PostgreSQL database.",
    Impact:
      "Centralized fragmented ISAT resources into one easy-to-use bot — friendly for students, professors, and anyone trying to understand the program. Instead of jumping between documents and piecing things together manually, people can ask questions and get clear, context-backed answers. It also makes scheduling feel less overwhelming, which matters when the course map is hard to read at a glance. Overall, it changes how people understand ISAT instead of letting the complexity of the major get in the way.",
    tools: ["LangGraph", "RAG", "Next.js", "PostgreSQL", "OpenAI API", "Python"],
    liveUrl: "https://isat-recruiter-2w1a-n2hnyxvr6-sophias-projects-5010dcb3.vercel.app/",
    githubUrl: "https://github.com/sophiafeld1/ISATRecruiter",
    image: "assets/isat-recruiter.png",
    presentationDownload: "assets/FINAL_CAPSTONE_PRESENTATION.pdf",
    presentationSlides: Array.from({ length: 15 }, (_, index) => {
      const slideNumber = String(index + 1).padStart(2, "0");
      if (index === 10) {
        return {
          type: "video",
          src: "assets/capstone-demo.mp4",
          poster: "assets/capstone-slides/slide-11.png",
          alt: "Course schedule planner demo",
        };
      }
      return {
        type: "image",
        src: `assets/capstone-slides/slide-${slideNumber}.png`,
        alt: `Capstone presentation slide ${index + 1}`,
      };
    }),
  },
];
