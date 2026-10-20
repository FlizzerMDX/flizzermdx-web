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
    owner: string;
    repo: string;
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

interface ElementsSelectionsType{
  id: string;
  translation: string;
  icon: React.JSX.Element;
}

export interface DropDownElementsType{
  name: string;
  translate: string;
  selections: ElementsSelectionsType[];
  value: string[];
  setter: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface FiltersElementsType{
  placeholder: string;
  selections: ElementsSelectionsType[];
  selectedSelections: string[];
  setSelectedSelections: React.Dispatch<React.SetStateAction<string[]>>;
}
