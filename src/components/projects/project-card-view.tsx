"use server"

import { Project } from "@/types/project";
import Image from "next/image";

import { readdir } from 'node:fs/promises';
import path from 'node:path';
import ProjectCard from "./project-card";
import { cn } from "cn";

export default async function ProjectCardView({ projectKey, project }: { projectKey: string; project: Project }) {
  const defaultImgSrc = `/projects/default_preview.png`;
  let imgSrc = defaultImgSrc;
  try {
    const dirPath = path.join(process.cwd(), 'public', 'projects', projectKey);
    const files = await readdir(dirPath);
    const previewFileName = files.filter((file) => file.startsWith("preview."))[0]
    imgSrc = previewFileName ? `/projects/${projectKey}/${previewFileName}` : defaultImgSrc;
  }
  catch {
    console.log("error")
  }
  return (
    <ProjectCard projectKey={projectKey} project={project}>
      <Image src={imgSrc || defaultImgSrc} alt={projectKey} fill className={cn("rounded-lg object-cover", project?.preview ?? "")} />
    </ProjectCard>

  )
}
