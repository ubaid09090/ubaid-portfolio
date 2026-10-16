import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";
import educationData from "../src/data/educationData.js";
import experienceData from "../src/data/experienceData.js";
import projectsData from "../src/data/projectsData.js";
import servicesData from "../src/data/servicesData.js";
import skillsData from "../src/data/skillsData.js";
import testimonialsData from "../src/data/testimonialsData.js";

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(rootDirectory, "src", "assets", "docs", "resume.pdf");
const pageWidth = 595.28;
const pageHeight = 841.89;
const margin = 44;
const contentWidth = pageWidth - margin * 2;
const colors = {
  navy: "#14213d",
  blue: "#2563eb",
  lightBlue: "#dbeafe",
  ink: "#172033",
  muted: "#586579",
  faint: "#e5eaf1",
  paper: "#ffffff",
};

const profile = {
  name: "Ubaid Ullah",
  title: "Front-End Developer",
  location: "Islamabad, Pakistan",
  email: "uk2011768@gmail.com",
  phone: "0319-7900803",
  summary:
    "Front-End Developer with 2+ years of experience building responsive, user-friendly web applications. Focused on React.js, reusable UI components, API integration, and clear, maintainable code.",
};

const portfolioStats = [
  ["2+", "Years experience"],
  ["10+", "Projects completed"],
  ["5+", "Happy clients"],
  ["4", "Live websites"],
];

const achievements = [
  {
    title: "Best Intern Performance",
    description:
      "Recognized for outstanding performance during internship at University Internship Program.",
  },
  {
    title: "Bachelor's Degree in Software Engineering",
    description: "Completed BS Software Engineering from Hazara University, Mansehra.",
  },
  {
    title: "Front-End Developer Certification",
    description: "Completed professional certification in Front-End Development.",
  },
  {
    title: "5+ Successful Projects",
    description: "Successfully delivered more than 5 projects for clients with high satisfaction.",
  },
  {
    title: "Experience Letter",
    description: "Expected experience letter from QMH Technologies for outstanding contribution.",
  },
  {
    title: "4 Live Websites Launched",
    description: "Successfully launched and maintained 4 live websites for clients.",
  },
];

const hobbies = [
  ["Playing Cricket", "Enjoys playing cricket with friends on weekends."],
  ["PC Gaming", "Passionate about gaming and exploring new game worlds."],
  ["Coding Projects", "Love building side projects and learning new technologies."],
  ["Reading Books", "Enjoy reading tech blogs, articles, and self-improvement books."],
  ["Listening to Music", "Love listening to music while coding and relaxing."],
  ["Photography", "Enjoy capturing moments and beautiful scenery."],
];

const faqs = [
  [
    "What services do you offer?",
    "I offer front-end development services including React.js development, responsive web design, UI/UX implementation, API integration, and website optimization. I can build anything from simple landing pages to complex web applications.",
  ],
  [
    "What is your availability for projects?",
    "I am currently available for full-time, freelance, and remote opportunities. I can start immediately on most projects. For larger projects, I can adjust my schedule to meet your timeline requirements.",
  ],
  [
    "What is your development process?",
    "My process typically includes: 1) Requirement gathering and planning, 2) UI/UX design and prototyping, 3) Development and implementation, 4) Testing and quality assurance, 5) Deployment and launch, 6) Maintenance and support.",
  ],
  [
    "What technologies do you specialize in?",
    "I specialize in React.js, Redux, Tailwind CSS, JavaScript, HTML5, CSS3, Next.js, API integration, Firebase, Git, and responsive web design. I also have experience with TypeScript and various front-end tools.",
  ],
  [
    "How much do you charge for projects?",
    "Pricing depends on the project scope, complexity, and timeline. I offer competitive rates and can provide a detailed quote after discussing your specific requirements. Contact me for a free consultation and estimate.",
  ],
  [
    "Do you provide maintenance and support?",
    "Yes, I offer ongoing maintenance and support services for websites and applications. This includes bug fixes, updates, performance optimization, and feature enhancements. Custom maintenance packages are available based on your needs.",
  ],
  [
    "How do I get started with a project?",
    "Simply fill out the contact form with your project details, or reach out via email or phone. We'll schedule a consultation to discuss your requirements, timeline, and budget. From there, I'll prepare a proposal and we can get started.",
  ],
];

const doc = new PDFDocument({
  size: "A4",
  margins: { top: margin, bottom: margin, left: margin, right: margin },
  bufferPages: true,
  info: {
    Title: `${profile.name} - Complete Portfolio`,
    Author: profile.name,
    Subject: "Complete portfolio profile, projects, services, and resume",
    Creator: "Portfolio Information PDF Generator",
  },
});

function addSectionTitle(title) {
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(13).fillColor(colors.navy).text(title.toUpperCase(), margin, y);
  doc
    .moveTo(margin, y + 20)
    .lineTo(pageWidth - margin, y + 20)
    .lineWidth(0.8)
    .strokeColor(colors.faint)
    .stroke();
  doc.y = y + 29;
}

function addParagraph(text, { x = margin, width = contentWidth, size = 9, color = colors.ink, gap = 4 } = {}) {
  const startY = doc.y;
  doc.font("Helvetica").fontSize(size).fillColor(color);
  const height = doc.heightOfString(text, { width, lineGap: 2 });
  doc.text(text, x, startY, { width, lineGap: 2 });
  doc.y = startY + height + gap;
}

function drawFittedText(text, {
  x,
  y,
  width,
  height,
  size = 8,
  minSize = 6,
  font = "Helvetica",
  color = colors.ink,
  lineGap = 1,
  align = "left",
} = {}) {
  let fontSize = size;
  doc.font(font);
  while (fontSize > minSize && doc.heightOfString(text, { width, lineGap, fontSize }) > height) {
    fontSize -= 0.25;
  }
  doc.font(font).fontSize(fontSize).fillColor(color).text(text, x, y, {
    width,
    height,
    lineGap,
    align,
  });
}

function addBullet(text, { x = margin, width = contentWidth, size = 9, gap = 3 } = {}) {
  const startY = doc.y;
  doc.font("Helvetica").fontSize(size);
  const textX = x + 12;
  const textWidth = width - 12;
  const height = doc.heightOfString(text, { width: textWidth, lineGap: 1.5 });
  doc.circle(x + 3, startY + 5, 2).fillColor(colors.blue).fill();
  doc.fillColor(colors.ink).text(text, textX, startY, { width: textWidth, lineGap: 1.5 });
  doc.y = startY + height + gap;
}

function addRoleHeading(title, company, period, location) {
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor(colors.ink).text(title, margin, y, { width: 310 });
  doc.font("Helvetica-Bold").fontSize(9).fillColor(colors.blue).text(period, pageWidth - margin - 145, y, {
    width: 145,
    align: "right",
  });
  doc.font("Helvetica").fontSize(9).fillColor(colors.muted).text(`${company} | ${location}`, margin, y + 15, {
    width: contentWidth,
  });
  doc.y = y + 31;
}

function formatMonthYear(date) {
  if (!date) return "Present";
  const [year, month] = date.split("-").map(Number);
  const monthName = new Date(Date.UTC(year, month - 1, 1)).toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  return `${monthName} ${year}`;
}

function addEducationEntry(entry) {
  const startYear = entry.startDate?.slice(0, 4);
  const endYear = entry.endDate?.slice(0, 4) || "Present";
  const period = startYear === endYear ? startYear : `${startYear} - ${endYear}`;
  const y = doc.y;

  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(colors.ink).text(entry.degree, margin, y, {
    width: contentWidth - 105,
  });
  doc.font("Helvetica-Bold").fontSize(8.8).fillColor(colors.blue).text(period, pageWidth - margin - 100, y, {
    width: 100,
    align: "right",
  });
  doc.font("Helvetica").fontSize(8.8).fillColor(colors.muted).text(
    `${entry.institution} | ${entry.location}${entry.grade ? ` | ${entry.grade}` : ""}`,
    margin,
    y + 13,
    { width: contentWidth }
  );
  doc.y = y + 28;
}

function addSkillGrid() {
  const columns = 2;
  const gap = 10;
  const cellWidth = (contentWidth - gap * (columns - 1)) / columns;
  const cellHeight = 42;
  const startY = doc.y;

  skillsData.forEach((skill, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const x = margin + column * (cellWidth + gap);
    const y = startY + row * (cellHeight + 8);
    const label = skill.name.length > 27 ? `${skill.name.slice(0, 25)}...` : skill.name;

    doc.roundedRect(x, y, cellWidth, cellHeight, 7).fillColor("#f3f6fb").fill();
    doc.font("Helvetica-Bold").fontSize(9.2).fillColor(colors.ink).text(label, x + 10, y + 7, {
      width: cellWidth - 48,
      lineBreak: false,
      ellipsis: true,
    });
    doc.font("Helvetica-Bold").fontSize(8.8).fillColor(colors.blue).text(`${skill.level}%`, x + cellWidth - 40, y + 7, {
      width: 29,
      align: "right",
      lineBreak: false,
    });
    drawFittedText(skill.description || skill.category, {
      x: x + 10,
      y: y + 23,
      width: cellWidth - 20,
      height: 13,
      size: 8,
      minSize: 7,
      color: colors.muted,
    });
  });

  doc.y = startY + Math.ceil(skillsData.length / columns) * (cellHeight + 8) + 2;
}

function drawProjectCard(project, x, y, width, height) {
  doc.roundedRect(x, y, width, height, 9).fillColor(colors.paper).fill();
  doc.roundedRect(x, y, width, height, 9).lineWidth(0.8).strokeColor(colors.faint).stroke();
  doc.roundedRect(x, y, width, 22, 8).fillColor(colors.navy).fill();
  doc.rect(x, y + 14, width, 8).fillColor(colors.navy).fill();

  const host = project.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  doc.font("Helvetica").fontSize(8).fillColor("#dbeafe").text(host || project.category, x + 13, y + 6, {
    width: width - 24,
    lineBreak: false,
    ellipsis: true,
    link: project.liveUrl?.startsWith("https://") ? project.liveUrl : undefined,
  });

  drawFittedText(project.title, {
    x: x + 13,
    y: y + 29,
    width: width - 24,
    height: 20,
    size: 10.5,
    minSize: 9,
    font: "Helvetica-Bold",
  });
  drawFittedText(project.description || project.shortDescription, {
    x: x + 13,
    y: y + 51,
    width: width - 24,
    height: 25,
    size: 9,
    minSize: 8,
    color: colors.muted,
  });
  drawFittedText(`Key features: ${(project.features || []).join(", ")}`, {
    x: x + 13,
    y: y + 79,
    width: width - 24,
    height: 24,
    size: 8.2,
    minSize: 7.4,
    color: colors.ink,
  });
  doc.font("Helvetica-Bold").fontSize(8).fillColor(colors.blue).text(
    (project.technologies || []).join("  |  "),
    x + 13,
    y + height - 24,
    { width: width - 150, height: 14, lineGap: 1, ellipsis: true, lineBreak: false }
  );
  doc.font("Helvetica").fontSize(8).fillColor(colors.muted).text(
    `${project.date || ""}${project.duration ? `  |  ${project.duration}` : ""}`,
    x + width - 135,
    y + height - 24,
    { width: 122, align: "right", lineBreak: false }
  );
}

function addPageBanner(title, subtitle) {
  doc.addPage();
  doc.rect(0, 0, pageWidth, 86).fillColor(colors.navy).fill();
  doc.rect(0, 0, 8, 86).fillColor(colors.blue).fill();
  doc.font("Helvetica-Bold").fontSize(22).fillColor("#ffffff").text(title, margin, 18, {
    width: contentWidth,
  });
  drawFittedText(subtitle, {
    x: margin,
    y: 52,
    width: contentWidth,
    height: 22,
    size: 10,
    minSize: 8.5,
    color: "#bfdbfe",
  });
}

function drawCard(x, y, width, height, title, body, options = {}) {
  doc.roundedRect(x, y, width, height, 9).fillColor(options.background || colors.paper).fill();
  doc.roundedRect(x, y, width, height, 9).lineWidth(0.8).strokeColor(colors.faint).stroke();
  if (options.accent) {
    doc.roundedRect(x, y, 4, height, 2).fillColor(options.accent).fill();
  }
  drawFittedText(title, {
    x: x + 12,
    y: y + 11,
    width: width - 24,
    height: options.titleHeight || 29,
    size: options.titleSize || 10.5,
    minSize: 8.5,
    font: "Helvetica-Bold",
    color: colors.navy,
  });
  drawFittedText(body, {
    x: x + 12,
    y: y + (options.bodyY || 43),
    width: width - 24,
    height: height - (options.bodyY || 43) - (options.bottomSpace || 10),
    size: options.bodySize || 8.6,
    minSize: options.minBodySize || 7.5,
    color: colors.muted,
    lineGap: 1,
  });
}

function addFooter() {
  const range = doc.bufferedPageRange();
  for (let page = range.start; page < range.start + range.count; page += 1) {
    doc.switchToPage(page);
    doc
      .moveTo(margin, pageHeight - 64)
      .lineTo(pageWidth - margin, pageHeight - 64)
      .lineWidth(0.6)
      .strokeColor(colors.faint)
      .stroke();
    doc.font("Helvetica").fontSize(8).fillColor(colors.muted).text(
      `${profile.name}  |  Front-End Developer`,
      margin,
      pageHeight - 56,
      { width: contentWidth - 60, lineBreak: false }
    );
    doc.font("Helvetica").fontSize(8).fillColor(colors.muted).text(
      `${page + 1} / ${range.count}`,
      pageWidth - margin - 50,
      pageHeight - 56,
      { width: 50, align: "right", lineBreak: false }
    );
  }
}

async function generateResume() {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const output = fs.createWriteStream(outputPath);
  const completed = new Promise((resolve, reject) => {
    output.on("finish", resolve);
    output.on("error", reject);
    doc.on("error", reject);
  });
  doc.pipe(output);

  doc.rect(0, 0, pageWidth, 116).fillColor(colors.navy).fill();
  doc.rect(0, 0, 8, 116).fillColor(colors.blue).fill();
  doc.font("Helvetica-Bold").fontSize(26).fillColor("#ffffff").text(profile.name, margin, 31, {
    width: contentWidth,
  });
  doc.font("Helvetica").fontSize(11).fillColor("#bfdbfe").text(`${profile.title}  |  Available for Work`, margin, 65, {
    width: contentWidth,
  });
  doc.font("Helvetica").fontSize(8).fillColor("#e2e8f0").text(profile.location, margin, 91, {
    continued: true,
    width: 135,
  });
  doc.fillColor("#94a3b8").text("  |  ", { continued: true });
  doc.fillColor("#e2e8f0").text(profile.phone, { continued: true, link: `tel:${profile.phone}` });
  doc.fillColor("#94a3b8").text("  |  ", { continued: true });
  doc.fillColor("#bfdbfe").text(profile.email, { link: `mailto:${profile.email}` });
  doc.y = 136;

  addSectionTitle("Professional Summary");
  addParagraph(profile.summary, { size: 10, color: colors.muted, gap: 6 });

  addSectionTitle("About Me");
  addParagraph(
    "A passionate Front-End Developer with 2+ years of experience in building modern web applications. I specialize in creating responsive, user-friendly interfaces using React.js, Redux, and Tailwind CSS.",
    { size: 9.5, color: colors.muted, gap: 5 }
  );
  addParagraph(
    "Currently working at QMH Technologies, I develop enterprise-level applications with a focus on clean code, performance optimization, and exceptional user experiences.",
    { size: 9.5, color: colors.muted, gap: 6 }
  );

  addSectionTitle("Portfolio at a Glance");
  const statGap = 8;
  const statWidth = (contentWidth - statGap * (portfolioStats.length - 1)) / portfolioStats.length;
  const statY = doc.y;
  portfolioStats.forEach(([value, label], index) => {
    const x = margin + index * (statWidth + statGap);
    doc.roundedRect(x, statY, statWidth, 50, 7).fillColor("#f3f6fb").fill();
    doc.font("Helvetica-Bold").fontSize(14).fillColor(colors.blue).text(value, x + 8, statY + 7, {
      width: statWidth - 16,
      align: "center",
    });
    drawFittedText(label, {
      x: x + 4,
      y: statY + 29,
      width: statWidth - 8,
      height: 15,
      size: 8,
      minSize: 7,
      color: colors.muted,
      align: "center",
    });
  });
  doc.y = statY + 59;

  addSectionTitle("Technical Skills");
  addSkillGrid();

  addPageBanner("Experience & Education", "Employment history, responsibilities, education, and coursework.");
  doc.y = 106;
  addSectionTitle("Professional Experience");
  experienceData.forEach((experience) => {
    addRoleHeading(
      experience.position,
      experience.company,
      experience.period || `${formatMonthYear(experience.startDate)} - ${formatMonthYear(experience.endDate)}`,
      experience.location
    );
    (experience.description || []).forEach((item) => addBullet(item, { size: 9, gap: 2 }));
    if (experience.technologies?.length) {
      addParagraph(`Technologies: ${experience.technologies.join(", ")}`, {
        size: 8.5,
        color: colors.blue,
        gap: 5,
      });
    }
  });

  addSectionTitle("Education");
  educationData.forEach((education) => {
    addEducationEntry(education);
    if (education.description) {
      addParagraph(education.description, { size: 8.7, color: colors.muted, gap: 3 });
    }
    if (education.courses?.length) {
      addParagraph(`Courses: ${education.courses.join(", ")}`, {
        size: 8.2,
        color: colors.blue,
        gap: 5,
      });
    }
  });

  addPageBanner("Selected Projects", "Project descriptions, technologies, key features, and live websites.");
  const projectColumns = 1;
  const projectGap = 0;
  const cardWidth = contentWidth;
  const cardHeight = 124;
  const projectRowGap = 8;
  const projectStartY = 103;

  projectsData.forEach((project, index) => {
    const column = index % projectColumns;
    const row = Math.floor(index / projectColumns);
    const x = margin + column * (cardWidth + projectGap);
    const y = projectStartY + row * (cardHeight + projectRowGap);
    drawProjectCard(project, x, y, cardWidth, cardHeight);
  });

  addPageBanner("Services", "Services, scope, typical delivery times, and pricing approach.");
  const serviceGap = 0;
  const serviceColumns = 1;
  const serviceWidth = contentWidth;
  const serviceHeight = 74;
  const serviceRowGap = 8;
  servicesData.forEach((service, index) => {
    const column = index % serviceColumns;
    const row = Math.floor(index / serviceColumns);
    const x = margin + column * (serviceWidth + serviceGap);
    const y = 104 + row * (serviceHeight + serviceRowGap);
    drawCard(
      x,
      y,
      serviceWidth,
      serviceHeight,
      service.title,
      `${service.description}  Features: ${(service.features || []).join(", ")}.  Pricing: ${service.price}  |  Delivery: ${service.delivery}`,
      { accent: colors.blue, titleHeight: 20, bodyY: 31, bodySize: 8.6, minBodySize: 7.8 }
    );
  });

  addPageBanner("Achievements & Interests", "Portfolio-listed milestones and personal hobbies.");
  doc.y = 104;
  addSectionTitle("Achievements");
  const smallGap = 12;
  const smallColumns = 2;
  const smallWidth = (contentWidth - smallGap * (smallColumns - 1)) / smallColumns;
  const achievementHeight = 90;
  const achievementStartY = doc.y;
  achievements.forEach((achievement, index) => {
    const column = index % smallColumns;
    const row = Math.floor(index / smallColumns);
    drawCard(
      margin + column * (smallWidth + smallGap),
      achievementStartY + row * (achievementHeight + 8),
      smallWidth,
      achievementHeight,
      achievement.title,
      achievement.description,
      { accent: colors.blue, titleHeight: 30, bodyY: 43, bodySize: 9 }
    );
  });

  doc.y = achievementStartY + 3 * (achievementHeight + 8) + 5;
  addSectionTitle("Interests & Hobbies");
  const hobbyHeight = 72;
  const hobbyStartY = doc.y;
  hobbies.forEach(([title, description], index) => {
    const column = index % smallColumns;
    const row = Math.floor(index / smallColumns);
    drawCard(
      margin + column * (smallWidth + smallGap),
      hobbyStartY + row * (hobbyHeight + 8),
      smallWidth,
      hobbyHeight,
      title,
      description,
      { accent: colors.blue, titleHeight: 22, bodyY: 36, bodySize: 8.8 }
    );
  });

  addPageBanner("Testimonials", "All client testimonials currently displayed in the portfolio.");
  const testimonialColumns = 1;
  const testimonialGap = 0;
  const testimonialWidth = contentWidth;
  const testimonialHeight = 120;
  const testimonialRowGap = 8;
  testimonialsData.forEach((testimonial, index) => {
    const column = index % testimonialColumns;
    const row = Math.floor(index / testimonialColumns);
    const x = margin + column * (testimonialWidth + testimonialGap);
    const y = 101 + row * (testimonialHeight + testimonialRowGap);
    drawCard(
      x,
      y,
      testimonialWidth,
      testimonialHeight,
      testimonial.name,
      `${testimonial.position}  |  ${testimonial.date}  |  Rating: ${testimonial.rating}/5\n\n"${testimonial.text}"`,
      {
        accent: colors.blue,
        titleHeight: 20,
        bodyY: 34,
        bodySize: 9.3,
        minBodySize: 8.5,
      }
    );
  });

  addPageBanner("Frequently Asked Questions", "Answers to common questions about services and projects.");
  const faqColumns = 2;
  const faqGap = 12;
  const faqWidth = (contentWidth - faqGap) / faqColumns;
  const faqHeight = 151;
  const faqRowGap = 12;
  faqs.forEach(([question, answer], index) => {
    const column = index % faqColumns;
    const row = Math.floor(index / faqColumns);
    drawCard(
      margin + column * (faqWidth + faqGap),
      104 + row * (faqHeight + faqRowGap),
      faqWidth,
      faqHeight,
      question,
      answer,
      {
        accent: colors.blue,
        titleHeight: 37,
        bodyY: 52,
        bodySize: 8.8,
        minBodySize: 8,
      }
    );
  });

  addPageBanner("Contact & Availability", "Ways to get in touch and start a project.");
  doc.y = 112;
  addSectionTitle("Contact Details");
  const contactCards = [
    ["Email", profile.email],
    ["Phone", profile.phone],
    ["Location", profile.location],
    ["Availability", "Available for work"],
  ];
  const contactGap = 12;
  const contactWidth = (contentWidth - contactGap) / 2;
  contactCards.forEach(([title, body], index) => {
    const x = margin + (index % 2) * (contactWidth + contactGap);
    const y = 142 + Math.floor(index / 2) * 76;
    drawCard(x, y, contactWidth, 62, title, body, {
      accent: colors.blue,
      titleHeight: 17,
      bodyY: 32,
      bodySize: 9,
    });
  });
  doc.y = 292;
  addSectionTitle("Contact Form");
  addParagraph(
    "The portfolio contact form collects your name, email address, subject, and message so you can describe your project or inquiry.",
    { size: 8.7, color: colors.muted, gap: 10 }
  );
  addSectionTitle("Getting Started");
  addParagraph(
    "Share your project requirements by email, phone, or the website contact form. We can discuss your goals, timeline, and budget, then prepare a proposal and plan the work.",
    { size: 8.7, color: colors.muted, gap: 10 }
  );
  doc.roundedRect(margin, doc.y + 2, contentWidth, 67, 9).fillColor("#f3f6fb").fill();
  drawFittedText("Portfolio summary", {
    x: margin + 13,
    y: doc.y + 12,
    width: contentWidth - 26,
    height: 18,
    size: 9,
    font: "Helvetica-Bold",
    color: colors.navy,
  });
  drawFittedText(
    "Front-end development | React.js | Responsive interfaces | API integration | UI/UX implementation",
    {
      x: margin + 13,
      y: doc.y + 33,
      width: contentWidth - 26,
      height: 24,
      size: 8,
      color: colors.muted,
    }
  );
  doc.y += 77;
  addSectionTitle("Project Workflow");
  const workflowCards = [
    ["1. Share the brief", "Send your project details through the contact form, email, or phone."],
    ["2. Discuss requirements", "Review goals, scope, timeline, and budget in a consultation."],
    ["3. Plan the work", "Receive a proposal and agree on the project plan before development."],
    ["4. Build and support", "Development, testing, launch, and ongoing maintenance as needed."],
  ];
  const workflowGap = 12;
  const workflowWidth = (contentWidth - workflowGap) / 2;
  const workflowHeight = 78;
  const workflowStartY = doc.y;
  workflowCards.forEach(([title, description], index) => {
    const x = margin + (index % 2) * (workflowWidth + workflowGap);
    const y = workflowStartY + Math.floor(index / 2) * (workflowHeight + 10);
    drawCard(x, y, workflowWidth, workflowHeight, title, description, {
      accent: colors.blue,
      titleHeight: 22,
      bodyY: 36,
      bodySize: 8.8,
    });
  });

  addFooter();
  doc.end();
  await completed;

  const pdf = fs.readFileSync(outputPath);
  const pdfText = pdf.toString("latin1");
  const pageCount = (pdfText.match(/\/Type\s*\/Page\b/g) || []).length;
  const expectedPageCount = 8;
  if (!pdfText.startsWith("%PDF-") || !pdfText.includes("%%EOF") || pageCount !== expectedPageCount) {
    throw new Error(`Generated portfolio PDF failed validation (pages found: ${pageCount}, expected: ${expectedPageCount}).`);
  }

  console.log(`Generated and validated ${path.relative(rootDirectory, outputPath)} (${pageCount} pages).`);
}

generateResume().catch((error) => {
  console.error("Failed to generate portfolio PDF:", error);
  process.exitCode = 1;
});
