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
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
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
          <>
            {/*{!imageLoaded && <Skeleton className="absolute inset-0 rounded-md transition-none! duration-0!" />}*/}
            <Image
              src={imgSrc}
              alt={projectKey}
              fill
              className={cn("rounded-lg object-cover transition-opacity duration-500", project?.preview ?? "", !imageLoaded ? "opacity-0" : "opacity-100")}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          </>
        )
      }
    </ProjectCard>

  )
}
