"use client"

import { Project, ProjectsConfig } from "@/types/project";
import ProjectCardView from "./project-card-view";

import Filters from "./filters";
import { SiCapacitor, SiFlask, SiJavascript, SiNextdotjs, SiPython, SiReact, SiTypescript } from "react-icons/si"
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getProjects } from "@/utils/projects";

const frameworks = [
  { id: "reactjs", translation: "React.js", icon: <SiReact className="text-foreground" /> },
  { id: "nextjs", translation: "Next.js", icon: <SiNextdotjs className="text-foreground" />},
  { id: "flask", translation: "Flask", icon: <SiFlask className="text-foreground" /> },
];

const languages = [
  { id: "python", translation: "Python", icon: <SiPython className="text-foreground" /> },
  { id: "javascript", translation: "JavaScript", icon: <SiJavascript className="text-foreground" />},
  { id: "typescript", translation: "TypeScript", icon: <SiTypescript className="text-foreground" /> },
];

const runtimes = [
  { id: "capacitorjs", translation: "Capacitor.js", icon: <SiCapacitor className="text-foreground" /> },
];

export default function ProjectsView() {

  const [projects, setProjects] = useState<ProjectsConfig>();
  useEffect(() => {
    const getProjectsConfig = async () => {
      const proj = await getProjects()
      setProjects(proj)
    }
    getProjectsConfig()
  }, [])

  const translations = useTranslations("Projects.filters");

  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedRuntimes, setSelectedRuntimes] = useState<string[]>([]);

  const dropdownElements = [
    {
      name: "frameworks",
      translate: translations("frameworks"),
      selections: frameworks,
      value: selectedFrameworks,
      setter: setSelectedFrameworks,
    },
    {
      name: "languages",
      translate: translations("languages"),
      selections: languages,
      value: selectedLanguages,
      setter: setSelectedLanguages,
    },
    {
      name: "runtimes",
      translate: translations("runtimes"),
      selections: runtimes,
      value: selectedRuntimes,
      setter: setSelectedRuntimes,
    },
  ];

  return (
    <div className="flex flex-1 flex-col items-center gap-2 mx-auto">
      <Filters dropdownElements={dropdownElements} />
      <div className="flex flex-row flex-wrap justify-center mx-auto gap-4">
        {
          projects && Object.entries(projects.projects)
            .filter(([, value]) => (
              dropdownElements.every((element) =>
                element.value.length > 0 ?
                  Object.entries(value.tags).find(([key]) => key === element.name) !== undefined ?
                    Object.entries(value.tags).find(([key]) => key === element.name)?.[1]?.length ?? 0 > 0 ?
                      Object.entries(value.tags).find(([key]) => key === element.name)?.[1]?.some((value) => element.value.includes(value))
                      : true
                    :
                    false
                  :
                  true
            )))
            .map(([key, value]) => (
            <ProjectCardView key={key} projectKey={key} project={value as Project} />
          ))
        }
      </div>
    </div>
  )
}
