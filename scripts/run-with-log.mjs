#!/usr/bin/env node
import { spawn } from "node:child_process";
import { mkdirSync, createWriteStream } from "node:fs";
import { join, resolve } from "node:path";

const [, , targetScript, ...restArgs] = process.argv;

if (!targetScript) {
  process.stderr.write(
    "Usage: run-with-log.mjs <npm-script> [-- extra args]\n"
  );
  process.exit(1);
}

const separatorIndex = restArgs.indexOf("--");
const passthroughArgs =
  separatorIndex !== -1 ? restArgs.slice(separatorIndex + 1) : [];

const logsDir = resolve(process.cwd(), "logs");
mkdirSync(logsDir, { recursive: true });

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const safeName = targetScript.replace(/[^a-z0-9-]/gi, "_");
const logFile = join(logsDir, `${safeName}-${timestamp}.log`);

process.stdout.write(`Logging output of "${targetScript}" to ${logFile}\n`);

const logStream = createWriteStream(logFile, { flags: "a" });

const child = spawn(
  "npm",
  ["run", targetScript, ...(passthroughArgs.length ? ["--", ...passthroughArgs] : [])],
  {
    stdio: ["inherit", "pipe", "pipe"],
    env: process.env,
  }
);

const forward = chunk => {
  process.stdout.write(chunk);
  logStream.write(chunk);
};
const forwardErr = chunk => {
  process.stderr.write(chunk);
  logStream.write(chunk);
};

child.stdout.on("data", forward);
child.stderr.on("data", forwardErr);

const close = code => {
  logStream.end(() => {
    process.exit(code ?? 0);
  });
};

child.on("close", close);

const handleSignal = signal => {
  child.kill(signal);
};

process.on("SIGINT", handleSignal);
process.on("SIGTERM", handleSignal);
