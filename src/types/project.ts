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

export interface Project{
  public: boolean;
  situation: {
    type: string;
    name: string;
  };
  preview: string;
  github: {
    url: string;
    api_url: string;
  };
  tags: {
    languages: Language[];
    frameworks: Framework[];
    runtimes: Runtime[];
  };
}

export interface ProjectsConfig{
  projects: Record<string, Project>;
}
