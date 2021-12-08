// src/index.ts

import { Checker } from "@htmlacademy/checker";
import { join } from "path";

const checks = [
  { type: "has-title" },
];

const fn = async () => {
  const checker = new Checker({
    checksBasePath: join(__dirname, "./checks"),
    tmpDir: "/tmp"
  });

  const result = await checker.check({
    projectPath: join(__dirname, "./project"),
    checks,
    filesPath: "",
    imageMagickCompareBinPath: ""
  });

  console.log(result);
} // TODO: where to get them?

fn();

