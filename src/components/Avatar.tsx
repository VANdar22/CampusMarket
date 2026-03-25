// src/components/Avatar.tsx
import React from "react";
import { createAvatar } from "@dicebear/core";
import * as Adventurer from "@dicebear/adventurer";

interface AvatarProps {
  seed: string;
  size?: number;
}

export default function Avatar({ seed, size = 64 }: AvatarProps) {
  const svg = createAvatar(Adventurer, {
    seed,
    size,
    backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
  }).toDataUri();

  return <img src={svg} alt="avatar" width={size} height={size} className="rounded-full" />;
}