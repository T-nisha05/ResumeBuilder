import { Mail, Phone, Linkedin, Github, ExternalLink } from "lucide-react";
import LeetCodeIcon from "../icons/LeetcodeIcon";
import PortfolioIcon from "../icons/PortfolioIcon";

const CompactTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 text-sm leading-relaxed">
      {/* HEADER */}
      <header className="mb-5 border-b pb-3">
        <div className="flex justify-between items-start">
          {/* LEFT */}
          <div>
            <h1 className="text-2xl font-bold">
              {data.personal_info?.full_name}
            </h1>
            <p className="text-gray-700">{data.personal_info?.designation}</p>
          </div>

          {/* RIGHT */}
          <div className="text-right text-xs text-gray-600 space-y-1">
            {data.personal_info?.email && (
              <a
                href={`mailto:${data.personal_info.email}`}
                className="flex items-center justify-end gap-1 hover:underline"
              >
                <Mail size={12} />
                {data.personal_info.email}
              </a>
            )}

            {data.personal_info?.phone && (
              <div className="flex items-center justify-end gap-1">
                <Phone size={12} />
                {data.personal_info.phone}
              </div>
            )}

            {/* SOCIAL ICONS */}
            <div className="flex justify-end gap-3 mt-1">
              {data.personal_info?.linkedin && (
                <a
                  href={data.personal_info.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin className="w-4 h-4 text-gray-600 hover:text-black transition" />
                </a>
              )}

              {data.personal_info?.github && (
                <a
                  href={data.personal_info.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="w-4 h-4 text-gray-600 hover:text-black transition" />
                </a>
              )}

              {data.personal_info?.leetcode && (
                <a
                  href={data.personal_info.leetcode}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LeetCodeIcon className="w-4 h-4 fill-gray-600 hover:fill-black" />
                </a>
              )}

              {data.personal_info?.website && (
                <a
                  href={data.personal_info.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  <PortfolioIcon className="w-4 h-4 fill-gray-600 hover:fill-black" />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* SUMMARY */}
      {data?.professional_summary && (
        <section className="mb-4">
          <h2 className="font-semibold mb-1">Summary</h2>
          <p>{data.professional_summary}</p>
        </section>
      )}

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <section className="mb-4">
          <h2 className="font-semibold mb-1">Education</h2>

          {data.education.map((edu, i) => (
            <div key={i} className="mb-2 flex justify-between">
              <div>
                <p className="font-semibold">{edu.institution}</p>
                <p>{edu.degree}</p>

                {/* ✅ CGPA / Percentage FIX */}
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

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <section className="mb-4">
          <h2 className="font-semibold mb-1">Experience</h2>

          {data.experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{exp.company}</p>
                  <p>{exp.position}</p>
                </div>

                <div className="text-xs text-gray-500 text-right">
                  <p>
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </p>
                </div>
              </div>

              <ul className="list-disc pl-5 mt-1 space-y-1">
                {(exp.description || "")
                  .split("\n")
                  .filter(Boolean)
                  .map((line, idx) => (
                    <li key={idx}>{line.replace("• ", "")}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <section className="mb-4">
          <h2 className="font-semibold mb-1">Skills</h2>

          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-1 border rounded text-xs bg-gray-100"
              >
                {typeof skill === "string" ? skill : skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {data.project?.length > 0 && (
        <section className="mb-4">
          <h2 className="font-semibold mb-1">Projects</h2>

          {data.project.map((p, i) => (
            <div key={i} className="mb-3">
              <div className="flex items-center gap-2">
                <p className="font-semibold">{p.name}</p>

                {/* ✅ ICONS FIX */}
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

              <ul className="list-disc pl-5 text-xs mt-1">
                {(p.description || "")
                  .split("\n")
                  .filter(Boolean)
                  .map((line, idx) => (
                    <li key={idx}>{line.replace("• ", "")}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* CERTIFICATIONS */}
      {data.certifications?.length > 0 && (
        <section className="mb-4">
          <h2 className="font-semibold mb-1">Certifications</h2>

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
          <h2 className="font-semibold mb-1">Achievements</h2>

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

export default CompactTemplate;
