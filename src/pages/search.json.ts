import { getCollection } from "astro:content";
import { withBase } from "../config";

export async function GET() {
  const projects = await getCollection("projects", ({ data }) => !data.draft);
  const writing = await getCollection("writing", ({ data }) => !data.draft);

  const index = [
    ...projects.map((project) => ({
      kind: "Project",
      title: project.data.title,
      description: project.data.summary,
      href: withBase(`/work/${project.id}/`),
      terms: [project.data.category, ...project.data.stack].join(" "),
    })),
    ...writing.map((post) => ({
      kind: "Writing",
      title: post.data.title,
      description: post.data.description,
      href: withBase(`/writing/${post.id}/`),
      terms: post.data.tags.join(" "),
    })),
  ];

  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json" },
  });
}
