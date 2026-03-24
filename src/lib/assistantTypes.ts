export type AssistantLink = {
  title: string;
  href: string;
  label: "Page" | "Folder" | "Module" | "Lesson" | "Video" | "Action";
  description: string;
  external?: boolean;
};

export type AssistantReply = {
  message: string;
  links: AssistantLink[];
  suggestions: string[];
};
