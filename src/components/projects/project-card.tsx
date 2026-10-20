"use client"

import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { BookmarkIcon } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";
import { ShineBorder } from "../ui/shine-border";

import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { DropDownElementsType, Project } from "@/types/project";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ProjectCard({ children, projectKey, project, tags, showedDropdownElements, setShowedDropdownElements }: { children: ReactNode; projectKey: string; project: Project; tags: DropDownElementsType[]; showedDropdownElements: string[]; setShowedDropdownElements: React.Dispatch<React.SetStateAction<string[]>>;}) {

  const handleTag = (id: string, category: string, setter: React.Dispatch<React.SetStateAction<string[]>>, value: string[]) => {
    if (!value.includes(id)) {
      setter((prev) => [...prev, id])
      if (!showedDropdownElements.includes(category)) {
        setShowedDropdownElements((prev) => [...prev, category])
      }
    }
  }

  const translations = useTranslations("Projects");
  const pathname = usePathname();
  return (
    <Card className="relative w-70 h-90 max-w-sm pt-0">
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} className="z-10" />
      <AspectRatio
        ratio={2 / 1}
      >
        {children}
      </AspectRatio>
      <CardHeader>
        <CardAction className="flex flex-col gap-1 justify-end items-end">
          {
            tags.map((tag) => ({ ...tag, selections: tag.selections.filter((selection) => (project.tags[tag.name as (keyof typeof project.tags)] as string[])?.includes(selection.id)) })).filter((tag) => Object.entries(tag.selections).length > 0).map((tag) => tag?.selections?.length > 0 ? tag?.selections?.map((selection) => (
              <Badge variant="outline" className="hover:cursor-pointer select-none" key={selection.id} onClick={() => handleTag(selection.id, tag.name, tag.setter, tag.value)}>
                {selection.icon}
                {selection.translation}
              </Badge>
            )) : <div key={tag.name}>test</div>)
          }
        </CardAction>
        <CardTitle className="h-11">{ translations(`${projectKey}.title`) }</CardTitle>
        <CardDescription className="h-20">
          <p className="line-clamp-4">
            { translations(`${projectKey}.description`) }
          </p>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={`${pathname}/${projectKey}`} className="w-full">
          <Button className="w-full">{translations("details")}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
