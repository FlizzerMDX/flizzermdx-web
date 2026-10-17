"use client"

import { Project, ProjectsConfig } from "@/types/project";
import { getProjects } from "@/lib/projects";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { DotWave } from 'ldrs/react'
import 'ldrs/react/DotWave.css'
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { ChevronRight, Eye, GitFork, Star } from "lucide-react";
import { cn } from "cn";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { SiGithub } from "react-icons/si";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import TechText from '@/components/react-bits/TechText';

export default function ProjectView() {
  const [projects, setProjects] = useState<ProjectsConfig | undefined>(undefined);
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [githubProject, setGithubProject] = useState<null | { watchers_count: number; stargazers_count: number; forks_count: number; owner: { login: string; avatar_url: string };}>(null);
  const params = useParams<{ project: string }>();
  const [loading, setLoading] = useState(true);
  const translations = useTranslations(`Projects.${params.project}`)
  useEffect(() => {
    const fetchProjectDataInfo = async (proj: Project) => {
      const res = await fetch(proj.github.api_url);
      const data = await res.json();
      setGithubProject(data);
      console.log(data);
    };
    const getProjectsConfig = async () => {
      const projs = await getProjects();
      const proj = Object.entries(projs?.projects as Record<string, Project>).find(([key]) => key === params.project)?.[1]
      setProjects(projs);
      setProject(proj);
      setLoading(false);
      // if (proj && proj?.github?.api_url) {
      //   fetchProjectDataInfo(proj);
      // }
    }
    getProjectsConfig();
  }, [])

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <DotWave
          size="47"
          speed="1"
          color="pink"
        />
      </div>
    )
  }

  if (project === undefined) {
    return (
      <div>Aucun projet au nom de {params.project}</div>
    )
  }

  const statsElements = [
    {
      "id": "watchers",
      "icon": <Eye strokeWidth={1.5} />,
      "value": githubProject?.watchers_count,
      get translation() {
          return `watching${this.value && this.value > 1 ? "s": ""}`;
      }
    },
    {
      "id": "stargazers",
      "icon": <Star strokeWidth={1.5} />,
      "value": githubProject?.stargazers_count,
      get translation() {
          return `star${this.value && this.value > 1 ? "s": ""}`;
      }
    },
    {
      "id": "forks",
      "icon": <GitFork strokeWidth={1.5} />,
      "value": githubProject?.forks_count,
      get translation() {
          return `fork${this.value && this.value > 1 ? "s": ""}`;
      }
    },
  ]
  return (
    project && (
      <div className="flex-1 grid grid-cols-[80%_20%] gap-2">
        <div>
          <div>
            <TechText
              style={{height: '100px'}}
              text={translations("title")}
              fontWeight={300}
              fontSize={75}
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={15}
              intro="none"
              introDuration={2}
              clickKick
              guides={false}
              fontFamily=""
              letterSpacing={-0.05}
              accentColor="currentColor"
              reach={200}
              softness={0.7}
              lineStyle="dashed"
              strokeWidth={1.5}
              speed={1}
              bounce={0.4}
              selection
              labels
              color="currentColor"
              align="center"
              draggable={false}
              sweep
          />
          </div>
          <div>
            {githubProject && JSON.stringify(githubProject, null, 2)}
          </div>
        </div>
        <div className="flex flex-col gap-2 border border-border rounded-xl p-4 h-full text-muted-foreground">
          <div className="flex flex-row gap-2 items-center">
            {/*<img src={githubProject ? githubProject.owner.avatar_url : ""} />*/}
            <Avatar>
              <AvatarImage
                src={githubProject ? githubProject.owner.avatar_url : ""}
                alt="owern_pp"
              />
              <AvatarFallback>PP</AvatarFallback>
            </Avatar>
            <span>{githubProject && githubProject.owner.login}</span>
          </div>
          <div>
            Visibility : {project.public ? "public": "private"}
          </div>
          {
            statsElements.map((element) => (
              project?.github?.url && (
                <Link key={element.id} href={`${project?.github?.url}/${element.id}`} target="_blank" className="flex flex-row items-center gap-2 hover:text-purple-500">
                  {element.icon}
                  <span className="flex flex-row gap-0.5">
                    <span>
                      {element.value}
                    </span>
                    <span>
                      {element.translation}
                    </span>
                  </span>
                </Link>
              )
            ))
          }
          <div>
            {
              project?.github?.url && (
              <Link href={project?.github.url} target="_blank">
                <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
                  <span
                    className={cn(
                      "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
                    )}
                    style={{
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "destination-out",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "subtract",
                      WebkitClipPath: "padding-box",
                    }}
                  />
                  <SiGithub/>
                  <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
                  <AnimatedGradientText className="text-sm font-medium">
                    GitHub Link
                  </AnimatedGradientText>
                  <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </div>
              </Link>
              )
            }
          </div>
          <div>
            Languages
            <div>

            </div>
          </div>
        </div>
      </div>
    )
  )
}
