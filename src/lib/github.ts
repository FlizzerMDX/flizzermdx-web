"use server"

const token = process.env.GITHUB_TOKEN;

export const getStars = async (owner: string, repo: string) => {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  const stars = await fetchGithubAPI(url);
  return stars?.stargazers_count || 0;
}

export const getProject = async (owner: string, repo: string) => {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  const project = await fetchGithubAPI(url);
  return project || {};
}

export const getProjectTree = async (owner: string, repo: string, branch: string="master") => {
  const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
  const projectTree = await fetchGithubAPI(url);
  return projectTree.tree || [];
}

const fetchGithubAPI = async (url: string) => {
  const res = await fetch(url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error(
      `GitHub API error: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}
