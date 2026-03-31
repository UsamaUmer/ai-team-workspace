import { useAppStore } from "../../../app/store";

import "../../../components/ui/Table/Table.css";

function ProjectsOverview() {
  const projects = useAppStore((state) => state.projects);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Status</th>
            <th>Visibility</th>
            <th>Members</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 500,
                    backgroundColor:
                      project.status === "ACTIVE" ? "#dcfce7" : "#fee2e2",
                    color: project.status === "ACTIVE" ? "#166534" : "#991b1b",
                  }}
                >
                  {project.status}
                </span>
              </td>
              <td>{project.visibility}</td>
              <td>{project.members?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ProjectsOverview;
