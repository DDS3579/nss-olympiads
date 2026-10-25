"use client";

import {
  Atom,
  BrainCircuit,
  Code2,
  FlaskConical,
  Leaf,
  Sigma,
  Telescope,
} from "lucide-react";
import type { ComponentProps } from "react";
import type { IconKey } from "@/lib/types";

export const SUBJECT_ICONS = {
  sigma: Sigma,
  atom: Atom,
  flask: FlaskConical,
  telescope: Telescope,
  brain: BrainCircuit,
  code: Code2,
  leaf: Leaf,
} as const;

type IconProps = ComponentProps<typeof Sigma>;

export function SubjectIcon({
  iconKey,
  ...props
}: { iconKey: IconKey } & IconProps) {
  const Icon = SUBJECT_ICONS[iconKey] ?? Sigma;
  return <Icon {...props} />;
}