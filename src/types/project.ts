export type Language = (
  "python"
  | "javascript"
  | "typescript"
)

export type Framework = (
  "reactjs"
  | "nextjs"
  | "flask"
)

export type Runtime = (
  "capacitorjs"
)

export type Situation = (
  "freetime"
  | "formation"
  | "internship"
)

export type Organization = (
  "ETML"
  | "EPFL"
  | "zeloria"
)

export interface Project{
  public: boolean;
  preview: string;
  github: {
    url: string;
    api_url: string;
  };
  tags: {
    languages: Language[];
    frameworks: Framework[];
    runtimes: Runtime[];
    organizations: Organization[];
    situations: Situation[];
  };
}

export interface ProjectsConfig{
  projects: Record<string, Project>;
}
