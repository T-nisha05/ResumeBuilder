const MinimalTemplate = ({ data }) => {
  const formatDate = (d) => d || "";

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white text-sm">

      <h1 className="text-2xl font-bold">{data.personal_info?.full_name}</h1>
      <p className="text-gray-500">{data.personal_info?.designation}</p>

      <p className="text-xs mb-4">
        {data.personal_info?.email} | {data.personal_info?.phone} | {data.personal_info?.linkedin}
      </p>

      <p>{data.professional_summary}</p>

      <h2 className="mt-4 font-semibold">Experience</h2>
      {data.experience?.map((e, i) => (
        <div key={i}>
          {e.position} - {e.company}
          <div className="text-xs">{formatDate(e.start_date)} - {formatDate(e.end_date)}</div>
          <p>{e.description}</p>
        </div>
      ))}

      <h2 className="mt-4 font-semibold">Projects</h2>
      {data.project?.map((p, i) => (
        <div key={i}>
          {p.name}
          <p>{p.description}</p>
        </div>
      ))}

      <h2 className="mt-4 font-semibold">Skills</h2>
      <p>{data.skills?.join(", ")}</p>

      <h2 className="mt-4 font-semibold">Education</h2>
      {data.education?.map((e, i) => (
        <p key={i}>{e.degree} - {e.institution}</p>
      ))}

      <h2 className="mt-4 font-semibold">Certifications</h2>
      {data.certifications?.map((c, i) => (
        <p key={i}>{c.title} ({c.year})</p>
      ))}

      <h2 className="mt-4 font-semibold">Languages</h2>
      <p>{data.languages?.join(", ")}</p>

      <h2 className="mt-4 font-semibold">Interests</h2>
      <p>{data.interests?.join(", ")}</p>

    </div>
  );
};

export default MinimalTemplate;