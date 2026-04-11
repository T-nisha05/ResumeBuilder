const CompactTemplate = ({ data }) => {
  return (
    <div className="max-w-3xl mx-auto p-4 text-xs">

      <h1 className="font-bold">{data.personal_info?.full_name}</h1>
      <p>{data.personal_info?.designation}</p>

      <p>
        {data.personal_info?.email} | {data.personal_info?.phone}
      </p>

      <p>{data.professional_summary}</p>

      <div className="grid grid-cols-2 gap-3">

        <div>
          <h3>Skills</h3>
          {data.skills?.map((s, i) => <p key={i}>{s}</p>)}

          <h3>Education</h3>
          {data.education?.map((e, i) => (
            <p key={i}>{e.degree}</p>
          ))}

          <h3>Languages</h3>
          <p>{data.languages?.join(", ")}</p>
        </div>

        <div>
          <h3>Experience</h3>
          {data.experience?.map((e, i) => (
            <p key={i}>{e.position}</p>
          ))}

          <h3>Projects</h3>
          {data.project?.map((p, i) => (
            <p key={i}>{p.name}</p>
          ))}

          <h3>Certifications</h3>
          {data.certifications?.map((c, i) => (
            <p key={i}>{c.title}</p>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CompactTemplate;