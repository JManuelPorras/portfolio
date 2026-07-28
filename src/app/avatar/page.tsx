import type { Metadata } from "next";
import { AvatarExperience } from "@/components/avatar/AvatarExperience";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: "Talk to my AI avatar",
  description:
    "A 3D avatar that answers in my own cloned voice. Built with XTTS-v2 and faster-whisper on a 6 GB laptop GPU, with a custom Spanish lipsync engine. Answers are pre-generated.",
  alternates: { canonical: "/avatar" },
  openGraph: {
    title: `Talk to ${content.identity.shortName}'s AI avatar`,
    description:
      "A 3D avatar that answers in my own cloned voice — XTTS-v2 and a custom Spanish lipsync engine.",
    url: "/avatar",
  },
};

export default function AvatarPage() {
  return <AvatarExperience />;
}
