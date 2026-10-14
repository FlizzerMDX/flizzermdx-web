"use client"

import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { BookmarkIcon } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";
import { ShineBorder } from "../ui/shine-border";

import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { Project } from "@/types/project";

export default function ProjectCard({ children, projectKey, project }: { children: ReactNode; projectKey: string; project: Project }) {
  const translations = useTranslations("Projects");
  return (
    <Card className="relative w-70 h-90 max-w-sm pt-0">
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} className="z-10" />
      <AspectRatio
        ratio={2 / 1}
      >
        {children}
      </AspectRatio>
      <CardHeader>
        <CardAction>
          <Badge variant="outline">
            <BookmarkIcon data-icon="inline-end" />
            Featured
          </Badge>
        </CardAction>
        <CardTitle className="h-11">{ translations(`${projectKey}.title`) }</CardTitle>
        <CardDescription className="h-20">
          <p className="line-clamp-4">
            { translations(`${projectKey}.description`) }
          </p>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  )
}
