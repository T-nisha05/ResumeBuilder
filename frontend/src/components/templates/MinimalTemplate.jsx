import { Mail, Phone, Linkedin, Github, ExternalLink } from "lucide-react";
import LeetCodeIcon from "../icons/LeetcodeIcon";
import PortfolioIcon from "../icons/PortfolioIcon";

const MinimalTemplate = ({ data }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
      {/* HEADER */}
      <header className="text-center mb-6 pb-4">
        <h1 className="text-3xl font-bold">{data.personal_info?.full_name}</h1>

        <p className="text-gray-600 mb-2">{data.personal_info?.designation}</p>

        {/* CONTACT ROW */}
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
          {data.personal_info?.phone && (
            <span className="flex items-center gap-1">
              <Phone size={12} />
              {data.personal_info.phone}
            </span>
          )}

          {data.personal_info?.email && (
            <a
              href={`mailto:${data.personal_info.email}`}
              className="flex items-center gap-1 hover:underline"
            >
              <Mail size={12} />
              {data.personal_info.email}
            </a>
          )}
        </div>

        {/* LINKS */}
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-xs text-gray-600">
          {data.personal_info?.linkedin && (
            <a
              href={data.personal_info.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              <Linkedin size={12} />
              LinkedIn
            </a>
          )}

          {data.personal_info?.github && (
            <a
              href={data.personal_info.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              <Github size={12} />
              GitHub
            </a>
          )}

          {data.personal_info?.leetcode && (
            <a
              href={data.personal_info.leetcode}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              <LeetCodeIcon className="w-3 h-3 fill-gray-600" />
              LeetCode
            </a>
          )}

          {data.personal_info?.website && (
            <a
              href={data.personal_info.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              <PortfolioIcon className="w-3 h-3 fill-gray-600" />
              Portfolio
            </a>
          )}
        </div>
      </header>

      {/* SUMMARY */}
      {data.professional_summary && (
        <section className="mb-5">
          <h2 className="font-bold uppercase border-b pb-1 mb-2">Objective</h2>
          <p>{data.professional_summary}</p>
        </section>
      )}

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <section className="mb-5">
          <h2 className="font-bold uppercase border-b pb-1 mb-2">Skills</h2>

          <div className="grid grid-cols-2 gap-x-8">
            {data.skills.map((skill, i) => (
              <div key={i} className="flex items-start gap-2">
                <span>•</span>
                <span>{typeof skill === "string" ? skill : skill.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <section className="mb-5">
          <h2 className="font-bold uppercase border-b pb-1 mb-2">Experience</h2>

          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              {/* TOP ROW */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{exp.position}</p>
                  <p className="italic text-gray-600">{exp.company}</p>
                </div>

                <div className="text-right text-xs text-gray-500">
                  <p>
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </p>
                  {exp.location && <p>{exp.location}</p>}
                </div>
              </div>

              {/* BULLETS */}
              <ul className="list-disc pl-5 mt-1 space-y-1">
                {(exp.description || "")
                  .split(/•|\n/)
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .map((line, idx) => (
                    <li key={idx} className="text-sm text-gray-800">
                      {line}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <section className="mb-5">
          <h2 className="font-bold uppercase border-b pb-1 mb-2">Education</h2>

          {data.education.map((edu, i) => (
            <div key={i} className="flex justify-between mb-2">
              <div>
                <p className="font-semibold">
                  {(edu.type || "").toLowerCase().includes("graduation")
                    ? edu.degree
                    : `${edu.type}${edu.degree ? ` (${edu.degree})` : ""}`}
                </p>

                <p>{edu.institution}</p>

                {edu.score && (
                  <p className="text-xs text-gray-600">
                    {edu.type === "graduation"
                      ? `CGPA: ${edu.score}`
                      : `Percentage: ${edu.score}`}
                  </p>
                )}
              </div>

              <div className="text-xs text-gray-500">{edu.year}</div>
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {data.project?.length > 0 && (
        <section className="mb-5">
          <h2 className="font-bold uppercase border-b pb-1 mb-2">Projects</h2>

          {data.project.map((p, i) => (
            <div key={i} className="mb-3">
              <div className="flex items-center gap-2">
                <p className="font-semibold">{p.name}</p>

                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer">
                    <Github size={12} />
                  </a>
                )}

                {p.liveDemo && (
                  <a href={p.liveDemo} target="_blank" rel="noreferrer">
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>

              <ul className="list-disc pl-5 mt-1 space-y-1">
                {(p.description || "")
                  .split(/•|\n/) // 🔥 split by bullet OR newline
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .map((line, idx) => (
                    <li key={idx} className="text-sm text-gray-800">
                      {line}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* CERTIFICATIONS */}
      {data.certifications?.length > 0 && (
        <section className="mb-5">
          <h2 className="font-bold uppercase border-b pb-1 mb-2">
            Certifications
          </h2>

          <ul className="list-disc pl-5 space-y-1">
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
          <h2 className="font-bold uppercase border-b pb-1 mb-2">
            Achievements
          </h2>

          <ul className="list-disc pl-5 space-y-1">
            {data.achievements.map((a, i) => (
              <li key={i}>{a.title}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
