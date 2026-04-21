import { Mail, Phone, Linkedin, Github, ExternalLink } from "lucide-react";
import LeetCodeIcon from "../icons/LeetcodeIcon";
import PortfolioIcon from "../icons/PortfolioIcon";

const ModernTemplate = ({ data }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const getShortLink = (url) => {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("linkedin")) {
      return "linkedin.com" + parsed.pathname;
    }

    if (parsed.hostname.includes("github")) {
      return "github.com" + parsed.pathname;
    }

    if (parsed.hostname.includes("leetcode")) {
      return "leetcode.com" + parsed.pathname;
    }

    return parsed.hostname.replace("www.", "");
  } catch {
    return url;
  }
};

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 text-gray-800">

      {/* HEADER */}
      <header className="mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold">
          {data.personal_info?.full_name}
        </h1>

        <p className="text-blue-600 font-semibold">
          {data.personal_info?.designation}
        </p>

        {/* SUMMARY */}
        {data.professional_summary && (
          <p className="mt-2 text-sm text-gray-600">
            {data.professional_summary}
          </p>
        )}

        {/* CONTACT ROW */}
        <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600 items-center">

  {data.personal_info?.phone && (
    <span className="flex items-center gap-1">
      <Phone size={14} />
      {data.personal_info.phone}
    </span>
  )}

  {data.personal_info?.email && (
    <a
      href={`mailto:${data.personal_info.email}`}
      className="flex items-center gap-1 hover:text-blue-600"
    >
      <Mail size={14} />
      {data.personal_info.email}
    </a>
  )}

  {/* LINKEDIN */}
  {data.personal_info?.linkedin && (
    <a
      href={data.personal_info.linkedin}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1 hover:text-blue-600"
    >
      <Linkedin size={16} />
      <span>{getShortLink(data.personal_info.linkedin)}</span>
    </a>
  )}

  {/* GITHUB */}
  {data.personal_info?.github && (
    <a
      href={data.personal_info.github}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1 hover:text-blue-600"
    >
      <Github size={16} />
      <span>{getShortLink(data.personal_info.github)}</span>
    </a>
  )}

  {/* LEETCODE */}
  {data.personal_info?.leetcode && (
    <a
      href={data.personal_info.leetcode}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1 hover:text-blue-600"
    >
      <LeetCodeIcon className="w-4 h-4 fill-gray-600" />
      <span>{getShortLink(data.personal_info.leetcode)}</span>
    </a>
  )}

  {/* PORTFOLIO */}
  {data.personal_info?.website && (
    <a
      href={data.personal_info.website}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1 hover:text-blue-600"
    >
      <PortfolioIcon className="w-4 h-4 fill-gray-600" />
      <span>{getShortLink(data.personal_info.website)}</span>
    </a>
  )}

</div>
      </header>

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="flex items-center gap-2 font-bold text-blue-700 border-b pb-1 mb-2">
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
              >
                {typeof skill === "string" ? skill : skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold text-blue-700 border-b pb-1 mb-3">
            Experience
          </h2>

          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4">

              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{exp.position}</p>
                  <p className="text-blue-600">{exp.company}</p>
                </div>

                <div className="text-xs text-gray-500 text-right">
                  <p>
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </p>
                  {exp.location && <p>{exp.location}</p>}
                </div>
              </div>

              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                {(exp.description || "")
                  .split(/•|\n/)
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {data.project?.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold text-blue-700 border-b pb-1 mb-3">
            Projects
          </h2>

          {data.project.map((p, i) => (
            <div key={i} className="mb-4">

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{p.name}</p>
                  {p.tech && (
                    <p className="text-xs text-gray-500 italic">{p.tech}</p>
                  )}
                </div>

               <div className="flex flex-wrap gap-2 text-xs text-gray-600">
  {p.github && (
    <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-600">
      <Github size={14} />
      <span>{getShortLink(p.github)}</span>
    </a>
  )}

  {p.liveDemo && (
    <a href={p.liveDemo} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-600">
      <ExternalLink size={14} />
      <span>{getShortLink(p.liveDemo)}</span>
    </a>
  )}
</div>
              </div>

              <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                {(p.description || "")
                  .split(/•|\n/)
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold text-blue-700 border-b pb-1 mb-3">
            Education
          </h2>

          {data.education.map((edu, i) => (
            <div key={i} className="flex justify-between mb-2">

              <div>
                <p className="font-semibold">{edu.degree}</p>
                <p className="text-sm text-gray-600">{edu.institution}</p>

                {edu.score && (
                  <p className="text-xs text-gray-500">
                    {edu.type === "graduation"
                      ? `CGPA: ${edu.score}`
                      : `Percentage: ${edu.score}`}
                  </p>
                )}
              </div>

              <div className="text-xs text-gray-500">
                {edu.year}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* CERTIFICATIONS */}
      {data.certifications?.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold text-blue-700 border-b pb-1 mb-2">
            Certifications
          </h2>

          <ul className="list-disc pl-5 text-sm">
            {data.certifications.map((c, i) => (
              <li key={i}>
                {c.title} — {c.issuer} ({c.year})
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ACHIEVEMENTS */}
      {data.achievements?.length > 0 && (
        <section>
          <h2 className="font-bold text-blue-700 border-b pb-1 mb-2">
            Achievements
          </h2>

          <ul className="list-disc pl-5 text-sm">
            {data.achievements.map((a, i) => (
              <li key={i}>{a.title}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;