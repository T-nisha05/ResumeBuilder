import { Mail, Phone, Linkedin, Github, ExternalLink } from "lucide-react";
import LeetCodeIcon from "../icons/LeetcodeIcon";
import PortfolioIcon from "../icons/PortfolioIcon";

const ClassicTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };
  
console.log("TECH STACK DATA:", data.techStack);
console.log("Card Data:", data);


  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800">
      {/* HEADER */}
      <header className="text-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold" style={{ color: accentColor }}>
          {data.personal_info?.full_name}
        </h1>

        {data.personal_info?.designation && (
          <p className="text-md font-medium text-gray-700 mb-2">
            {data.personal_info.designation}
          </p>
        )}

        <div className="flex flex-col items-center gap-2 text-sm text-gray-600">
          {/* ROW 1 → EMAIL + PHONE */}
          <div className="flex flex-wrap justify-center gap-4">
            {data.personal_info?.email && (
              <a
                href={`mailto:${data.personal_info.email}`}
                className="flex items-center gap-1 hover:underline"
              >
                <Mail className="size-4" />
                {data.personal_info.email}
              </a>
            )}

            {data.personal_info?.phone && (
              <div className="flex items-center gap-1">
                <Phone className="size-4" />
                {data.personal_info.phone}
              </div>
            )}
          </div>

          {/* ROW 2 → ICONS ONLY  */}
          <div className="flex items-center justify-center gap-4 mt-1">
            {data.personal_info?.linkedin && (
              <a
                href={data.personal_info.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-black"
              >
                <Linkedin className="size-5" />
              </a>
            )}

            {data.personal_info?.github && (
              <a
                href={data.personal_info.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-black"
              >
                <Github className="size-5" />
              </a>
            )}

            {/* LEETCODE */}
            {data.personal_info?.leetcode && (
              <a
                href={data.personal_info.leetcode}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <LeetCodeIcon className="w-5 h-5 fill-gray-500 hover:fill-black" />
              </a>
            )}

            {/* PORTFOLIO */}
            {data.personal_info?.website && (
              <a
                href={data.personal_info.website}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <PortfolioIcon className="w-5 h-5 fill-gray-500 group-hover:fill-black transition" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* SUMMARY */}
      {data.professional_summary && (
        <section className="mb-4">
          <h2 className="font-semibold mb-2">Summary</h2>
          <p>{data.professional_summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      <section className="mb-4">
        <h2 className="font-semibold mb-2">Experience</h2>
        {data.experience?.map((exp, i) => (
          <div key={i} className="mb-3">
            <h3 className="font-medium">{exp.position}</h3>
            <p>{exp.company}</p>
            <p className="text-xs text-gray-500">
              {formatDate(exp.start_date)} -{" "}
              {exp.is_current ? "Present" : formatDate(exp.end_date)}
            </p>
            <p className="whitespace-pre-line">{exp.description}</p>
          </div>
        ))}
      </section>

      {/* PROJECTS */}
      <section className="mb-4">
        <h2 className="font-semibold mb-2">Projects</h2>

        {data.project?.map((p, i) => (
          <div key={i} className="mb-3">
            <div className="flex items-center gap-3">
              <h3 className="font-medium">{p.name}</h3>

              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer">
                  <Github className="size-4 text-gray-700 hover:text-black" />
                </a>
              )}

              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4 text-gray-700 hover:text-black" />
                </a>
              )}
            </div>

            {p.description && (
              <p className="text-sm text-gray-600">{p.description}</p>
            )}
          </div>
        ))}
      </section>

      {/* EDUCATION */}
      <section className="mb-4">
        <h2 className="font-semibold mb-2">Education</h2>
        {data.education?.map((edu, i) => (
          <div key={i}>
            {edu.degree} - {edu.institution}
            <div className="text-xs">{formatDate(edu.graduation_date)}</div>
          </div>
        ))}
      </section>



    {/* TECH STACK - SKILLS */}
{data?.techStack &&
 Object.values(data.techStack).some(
   (arr) => Array.isArray(arr) && arr.length > 0
 ) && (
  <section className="mb-4">
    <h2 className="font-semibold mb-2">Tech Stack</h2>

    <div className="space-y-1 text-sm text-gray-800">
      
      {data.techStack.frontend?.length > 0 && (
        <p>
          <span className="font-medium">Frontend:</span>{" "}
          {data.techStack.frontend.join(", ")}
        </p>
      )}

      {data.techStack.backend?.length > 0 && (
        <p>
          <span className="font-medium">Backend:</span>{" "}
          {data.techStack.backend.join(", ")}
        </p>
      )}

      {data.techStack.database?.length > 0 && (
        <p>
          <span className="font-medium">Database:</span>{" "}
          {data.techStack.database.join(", ")}
        </p>
      )}

      {data.techStack.tools?.length > 0 && (
        <p>
          <span className="font-medium">Tools:</span>{" "}
          {data.techStack.tools.join(", ")}
        </p>
      )}

    </div>
  </section>
)}

      {/* CERTIFICATIONS */}
      {data.certifications?.length > 0 && (
        <section className="mb-4">
          <h2 className="font-semibold mb-2">Certifications</h2>
          {data.certifications.map((c, i) => (
            <p key={i}>
              {c.title} ({c.year})
            </p>
          ))}
        </section>
      )}

      {/* ACHIEVEMENTS */}
      {data.achievements?.length > 0 && (
        <section className="mb-4">
          <h2 className="font-semibold mb-2">Achievements</h2>

          <ul className="list-disc pl-5 space-y-1">
            {data.achievements.map((a, idx) => (
              <li key={idx} className="text-gray-700">
                <span className="font-medium">{a.title}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
