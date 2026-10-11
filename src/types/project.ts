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
  languages: string[];
  tags: string[];
}
