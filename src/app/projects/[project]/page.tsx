"use client"

import { Project } from "@/types/project";
import { getProjects } from "@/lib/projects";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { ChevronRight, Eye, GitFork, Star } from "lucide-react";
import { cn } from "cn";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { SiGithub } from "react-icons/si";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import TechText from '@/components/react-bits/TechText';
import dynamic from "next/dynamic";
import { getProject } from "@/lib/github";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Loader = dynamic(() => import('@/components/global/loader'))

export default function ProjectView() {
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [githubProject, setGithubProject] = useState<null | { subscribers_count: number; stargazers_count: number; forks_count: number; owner: { login: string; avatar_url: string };}>(null);
  const params = useParams<{ project: string }>();
  const [loading, setLoading] = useState(true);
  const translations = useTranslations(`Projects.${params.project}`);

  useEffect(() => {
    const getProjectsConfig = async () => {
      const projs = await getProjects();
      const proj = Object.entries(projs?.projects as Record<string, Project>).find(([key]) => key === params.project)?.[1]
      setProject(proj);
      if (proj && proj?.github?.owner && proj?.github?.repo) {
        const data = await getProject(proj?.github?.owner, proj?.github?.repo);
        setGithubProject(data);
      }
      setLoading(false);
    }
    getProjectsConfig();
  }, [])

  if (loading) {
    return (
      <Loader/>
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
      // "value": githubProject?.watchers_count,
      "value": githubProject?.subscribers_count,
    },
    {
      "id": "stargazers",
      "icon": <Star strokeWidth={1.5} />,
      "value": githubProject?.stargazers_count,
    },
    {
      "id": "forks",
      "icon": <GitFork strokeWidth={1.5} />,
      "value": githubProject?.forks_count,
    },
  ]
  return (
    project && (
      <div className="flex-1 flex flex-col">
        <div>
          <TechText
            style={{height: '150px'}}
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
        <div className="flex flex-row  justify-center items-center gap-2 border-y border-border p-4 text-muted-foreground">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              {
                project.public && (
                  <>
                    <div className="flex flex-row gap-2 items-center">
                      <Avatar>
                        <AvatarImage
                          src={githubProject ? githubProject.owner.avatar_url : ""}
                          alt="owern_pp"
                        />
                        <AvatarFallback>PP</AvatarFallback>
                      </Avatar>
                      <span>{githubProject && githubProject.owner.login}</span>
                    </div>

                    <div className="text-2xl">•</div>
                  </>
                )
              }

              <div>
                {project.public ? "public": "private"}
              </div>
            </div>
            <div>
              {
                project?.github?.owner && project?.github?.repo && (
                <Link href={`https://github.com/${project?.github?.owner}/${project?.github?.repo}`} target="_blank">
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
          </div>
          <div className="border-l border-border pl-2">
            {
              statsElements.map((element) => (
                project?.github?.owner && project?.github?.repo && (
                  <Link key={element.id} href={`https://github.com/${project?.github?.owner}/${project?.github?.repo}/${element.id}`} target="_blank" className="flex flex-row items-center gap-2 hover:text-purple-500">
                    {element.icon}
                    <span>
                      {element.value}
                    </span>
                  </Link>
                )
              ))
            }
          </div>
        </div>
        <div className="flex-1 w-full">
          <Tabs defaultValue="description" className="w-full flex flex-row justify-center items-center">
            <TabsList variant="line">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="readme">README.md</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              description
            </TabsContent>
            <TabsContent value="readme">
              readme
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  )
}
