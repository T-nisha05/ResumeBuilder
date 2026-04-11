const ModernTemplate = ({ data, accentColor }) => {
  const formatDate = (d) => d || "";

  return (
    <div className="flex max-w-5xl mx-auto bg-white">

      {/* LEFT */}
      <div className="w-1/3 p-6 text-white" style={{ background: accentColor }}>
        <h1>{data.personal_info?.full_name}</h1>
        <p>{data.personal_info?.designation}</p>

        <p>{data.personal_info?.email}</p>
        <p>{data.personal_info?.phone}</p>
        <p>{data.personal_info?.linkedin}</p>

        <h3 className="mt-4">Skills</h3>
        {data.skills?.map((s, i) => <p key={i}>{s}</p>)}

        <h3 className="mt-4">Languages</h3>
        <p>{data.languages?.join(", ")}</p>

        <h3 className="mt-4">Interests</h3>
        <p>{data.interests?.join(", ")}</p>
      </div>

      {/* RIGHT */}
      <div className="w-2/3 p-6">

        <h2>Summary</h2>
        <p>{data.professional_summary}</p>

        <h2>Experience</h2>
        {data.experience?.map((e, i) => (
          <div key={i}>
            <b>{e.position}</b>
            <p>{e.company}</p>
            <small>{formatDate(e.start_date)} - {formatDate(e.end_date)}</small>
            <p>{e.description}</p>
          </div>
        ))}

        <h2>Projects</h2>
        {data.project?.map((p, i) => (
          <div key={i}>
            <b>{p.name}</b>
            <p>{p.description}</p>
          </div>
        ))}

        <h2>Education</h2>
        {data.education?.map((e, i) => (
          <p key={i}>{e.degree} - {e.institution}</p>
        ))}

        <h2>Certifications</h2>
        {data.certifications?.map((c, i) => (
          <p key={i}>{c.title} ({c.year})</p>
        ))}
      </div>
    </div>
  );
};

export default ModernTemplate;