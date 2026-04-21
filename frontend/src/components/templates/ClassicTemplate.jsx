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
          <div className="flex flex-wrap items-center justify-center gap-4 mt-1 text-xs text-gray-700">

  {data.personal_info?.linkedin && (
    <a
      href={data.personal_info.linkedin}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1 hover:underline"
    >
      <Linkedin className="size-5" />
      <span>{getShortLink(data.personal_info.linkedin)}</span>
    </a>
  )}

  {data.personal_info?.github && (
    <a
      href={data.personal_info.github}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1 hover:underline"
    >
      <Github className="size-5" />
      <span>{getShortLink(data.personal_info.github)}</span>
    </a>
  )}

  {data.personal_info?.leetcode && (
    <a
      href={data.personal_info.leetcode}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1 hover:underline"
    >
      <LeetCodeIcon className="w-5 h-5 fill-gray-500 hover:fill-black" />
      <span>{getShortLink(data.personal_info.leetcode)}</span>
    </a>
  )}

  {data.personal_info?.website && (
    <a
      href={data.personal_info.website}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1 hover:underline"
    >
      <PortfolioIcon className="w-5 h-5 fill-gray-500 group-hover:fill-black transition" />
      <span>{getShortLink(data.personal_info.website)}</span>
    </a>
  )}

</div>
          {/* <div className="flex items-center justify-center gap-4 mt-1">
            {data.personal_info?.linkedin && (
              <a
                href={data.personal_info.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-black"
              >
                <Linkedin className="size-5" />
              </a>
            )} */}

            {/* {data.personal_info?.github && (
              <a
                href={data.personal_info.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-black"
              >
                <Github className="size-5" />
              </a>
            )} */}

            {/* LEETCODE */}
            {/* {data.personal_info?.leetcode && (
              <a
                href={data.personal_info.leetcode}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <LeetCodeIcon className="w-5 h-5 fill-gray-500 hover:fill-black" />
              </a>
            )} */}

            {/* PORTFOLIO */}
            {/* {data.personal_info?.website && (
              <a
                href={data.personal_info.website}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <PortfolioIcon className="w-5 h-5 fill-gray-500 group-hover:fill-black transition" />
              </a>
            )}
          </div> */}
        </div> 
      </header>

      {/* OBJECTIVE */}
      {data?.professional_summary?.trim() && (
        <section className="mb-4">
          <h2 className="font-semibold mb-2">Objective</h2>

          <p className="whitespace-pre-line">{data.professional_summary}</p>
        </section>
      )}

      {/* EDUCATION */}
{data.education?.length > 0 && (
  <section className="mb-4">
    <h2 className="font-semibold mb-2">Education</h2>

    {(() => {
      const sortedEducation = [...data.education].sort((a, b) => {
        const order = { graduation: 1, class12: 2, class10: 3 };
        return order[a.type] - order[b.type];
      });

      return sortedEducation.map((edu, index) => (
        <div key={index} className="mb-2">

          {/* GRADUATION */}
          {edu.type === "graduation" && (
            <>
              <p className="font-bold">{edu.degree}</p>
              <div className="flex justify-between items-start text-sm text-gray-700 gap-2">
  <span className="font-medium min-w-0 break-words">
  {edu.institution}
</span>
  <span className="text-gray-600 whitespace-nowrap"></span>
   <span className="whitespace-nowrap ml-2">— {edu.year || "Present"}</span>
</div>
              <p>CGPA: {edu.score}</p>
            </>
          )}

          {/* CLASS 12 */}
{edu.type === "Class XII" && (
  <>
    <p className="font-bold">
      Class XII {edu.degree && `(${edu.degree})`}
    </p>
    <div className="flex justify-between items-start text-sm text-gray-700 gap-2">
      <span className="font-medium min-w-0 break-words">
  {edu.institution}
</span>
       <span className="whitespace-nowrap ml-2">— {edu.year}</span>
    </div>
    <p>Percentage: {edu.score}</p>
  </>
)}

{/* CLASS 10 */}
{edu.type === "Class X" && (
  <>
    <p className="font-bold">
      Class X {edu.degree && `(${edu.degree})`}
    </p>
   <div className="flex justify-between items-start text-sm text-gray-700 gap-2">
      <span className="font-medium min-w-0 break-words">
  {edu.institution}
</span>
       <span className="whitespace-nowrap ml-2">— {edu.year}</span>
    </div>
    <p>Percentage: {edu.score}</p>
  </>
)}

        </div>
      ));
    })()}
  </section>
)}

      {/* EXPERIENCE */}
      {data.experience?.some(
        (exp) =>
          exp.position?.trim() ||
          exp.company?.trim() ||
          exp.description?.trim(),
      ) && (
        <section className="mb-4">
          <h2 className="font-semibold mb-2">Experience</h2>

          {data.experience
            .filter(
              (exp) =>
                exp.position?.trim() ||
                exp.company?.trim() ||
                exp.description?.trim(),
            )
            .map((exp, i) => (
              <div key={i} className="mb-3">
                {exp.position && (
                  <h3 className="font-medium">{exp.position}</h3>
                )}

                {(exp.company || exp.start_date || exp.end_date) && (
                  <div className="flex justify-between items-start text-sm text-gray-600">
                    {/* LEFT SIDE → Company */}
                    {exp.company && (
                      <span className="font-medium text-gray-800">
                        {exp.company}
                      </span>
                    )}

                    {/* RIGHT SIDE → Dates */}
                    {(exp.start_date || exp.end_date) && (
                      <span>
                        {exp.start_date && formatDate(exp.start_date)} -{" "}
                        {exp.is_current
                          ? "Present"
                          : exp.end_date && formatDate(exp.end_date)}
                      </span>
                    )}
                  </div>
                )}
                {exp.description && (
                  <p className="text-sm text-gray-800 whitespace-pre-line">
                    {String(exp.description)
                      .replace(/(\n)?•\s*/g, "\n• ")
                      .trim()}
                  </p>
                )}
              </div>
            ))}
        </section>
      )}

      {/* PROJECTS */}
      <section className="mb-4">
        <h2 className="font-semibold mb-2">Projects</h2>

        {data.project?.map((p, i) => (
          <div key={i} className="mb-3">
            <div className="flex items-center gap-3">
              <h3 className="font-medium">{p.name}</h3>

              {p.github && (
      <div className="flex items-center gap-1">
        <Github className="size-4" />
        <span>{getShortLink(p.github)}</span>
      </div>
    )}

    {p.liveDemo && (
      <div className="flex items-center gap-1">
        <ExternalLink className="size-4" />
        <span>{getShortLink(p.liveDemo)}</span>
      </div>
              )}
            </div>

            {/* {p.description && (
              <p className="text-sm text-gray-600">{p.description}</p>
            )} */}
            <p className="text-sm text-gray-800 whitespace-pre-line">
              {(p.description || "").replace(/(\n)?•\s*/g, "\n• ").trim()}
            </p>
          </div>
        ))}
      </section>

      {/* TECH STACK */}
      {data?.techStack && (
        <section className="mb-4">
          <h2 className="font-semibold mb-2">Tech Stack</h2>

          <div className="space-y-1 text-sm text-gray-900">
            {data.techStack.language?.length > 0 && (
              <p>
                <span className="font-medium">Languages:</span>{" "}
                {data.techStack.language.join(", ")}
              </p>
            )}

            {data.techStack.it_constructs?.length > 0 && (
              <p>
                <span className="font-medium">IT Constructs:</span>{" "}
                {data.techStack.it_constructs.join(", ")}
              </p>
            )}

            {data.techStack.web_development?.length > 0 && (
              <p>
                <span className="font-medium">Web Development:</span>{" "}
                {data.techStack.web_development.join(", ")}
              </p>
            )}

            {data.techStack.databases?.length > 0 && (
              <p>
                <span className="font-medium">Databases:</span>{" "}
                {data.techStack.databases.join(", ")}
              </p>
            )}

            {data.techStack.tools?.length > 0 && (
              <p>
                <span className="font-medium">Tools & Technologies:</span>{" "}
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

    <ul className="list-disc pl-5 text-base text-gray-700 space-y-1">
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
  <section className="mb-4">
    <h2 className="font-semibold mb-2">Achievements</h2>

    <ul className="list-disc pl-5 text-base text-gray-700 space-y-1">
      {data.achievements.map((a, idx) => (
        <li key={idx} className="font-normal">
          {a.title}
        </li>
      ))}
    </ul>
  </section>
)}
    </div>
  );
};

export default ClassicTemplate;
