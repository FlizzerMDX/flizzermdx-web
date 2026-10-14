"use server"

import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { readdir } from 'node:fs/promises';

export const getProjects = async() => {
  const file = fs.readFileSync(path.join(process.cwd(), "src", "projects.yaml"), 'utf8')
  const projects = YAML.parse(file)
  return projects;
}

export const getPreviewImageLink = async (projectKey: string, defaultImgSrc: string) => {
  try {
    const dirPath = path.join(process.cwd(), 'public', 'projects', projectKey);
    const files = await readdir(dirPath);
    const previewFileName = files.filter((file) => file.startsWith("preview."))[0]
    return previewFileName && previewFileName !== '' ? `/projects/${projectKey}/${previewFileName}` : defaultImgSrc;
  }
  catch (error){
    console.error(error);
    return defaultImgSrc;
  }
}
