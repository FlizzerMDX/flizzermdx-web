"use server"

import { Project } from "@/types/project";
import ProjectCardView from "./project-card-view";

import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

export default async function ProjectsView() {
  const file = fs.readFileSync(path.join(process.cwd(), "src", "projects.yaml"), 'utf8')
  const projects = YAML.parse(file)
  return (
    <div className="flex flex-row flex-wrap gap-4">
      {
        Object.entries(projects.projects).map(([key, value]) => (
          <ProjectCardView key={key} projectKey={key} project={value as Project} />
        ))
      }
    </div>
  )
}
