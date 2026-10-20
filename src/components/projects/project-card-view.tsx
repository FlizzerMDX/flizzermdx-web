"use client"

import { DropDownElementsType, Project } from "@/types/project";
import Image from "next/image";

import ProjectCard from "./project-card";
import { cn } from "cn";
import { useEffect, useState } from "react";
import { getPreviewImageLink } from "@/lib/projects";

const defaultImgSrc = `/projects/default_preview.png`;

export default function ProjectCardView({ projectKey, project, tags, showedDropdownElements, setShowedDropdownElements }: { projectKey: string; project: Project; tags: DropDownElementsType[]; showedDropdownElements: string[]; setShowedDropdownElements: React.Dispatch<React.SetStateAction<string[]>>; }) {
  const [imgSrc, setImgSrc] = useState("");
  useEffect(() => {
    const getImgSrc = async () => {
      try {
        const src = await getPreviewImageLink(projectKey, defaultImgSrc);
        setImgSrc(src);
      }
      catch {
        console.log("error")
      }
    }
    getImgSrc();
  },[])

  return (
    <ProjectCard projectKey={projectKey} project={project} tags={tags} showedDropdownElements={showedDropdownElements} setShowedDropdownElements={setShowedDropdownElements}>
      {
        imgSrc && (
          <Image src={imgSrc} alt={projectKey} fill className={cn("rounded-lg object-cover", project?.preview ?? "")} />
        )
      }
    </ProjectCard>

  )
}
