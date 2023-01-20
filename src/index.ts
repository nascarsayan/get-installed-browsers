import { homedir } from "os";
import { resolve } from "path";
import { existsSync } from "fs";
import { promisify } from "util";
import { exec } from "child_process";
const execp = promisify(exec);

const getWinPaths = (subdir: string) => {
  const sysDrive = process.env["SystemDrive"] || "C:";
  const programFiles = process.env["ProgramFiles"] || resolve(sysDrive, "Program Files");
  const programFilesX86 = process.env["ProgramFiles(x86)"] || resolve(sysDrive, "Program Files (x86)");
  const localAppData = process.env["LocalAppData"] || resolve(homedir(), "AppData\\Local");
  const appData = process.env["AppData"] || resolve(homedir(), "AppData\\Roaming");

  const knownPaths = [
    resolve(localAppData, subdir),
    resolve(appData, subdir),
    resolve(programFiles, subdir),
    resolve(programFilesX86, subdir),
    resolve(appData, subdir),
    resolve(homedir(), "Local Settings\\Application Data", subdir),
  ];

  return knownPaths;
}

const getDarwinPaths = (subdir: string) => {
  const home = homedir();

  const knownPaths = [
    resolve(home, "Applications", subdir),
    resolve("/Applications", subdir),
  ];

  return knownPaths;
};

export interface Browser {
  name: string;
  type: "chrome" | "firefox" | "safari" | "other";
  path: Record<NodeJS.Platform, string[]>;
}

async function exists(path: string): Promise<boolean> {
  const platform = process.platform;

  if (platform === "linux") {
    let exists = true;
    try {
      await execp("which " + path);
    } catch (e) {
      exists = false;
    }
    return exists;
  }

  return existsSync(path);
}

export async function GetInstalledBrowsers() {
  const platform = process.platform;
  const installedBrowsers: {
    name: string;
    type: string;
    path: string;
  }[] = [];

  for (const browser of Browsers) {
    if (!browser.path[platform]) {
      continue;
    }
    for (const path of browser.path[platform]) {
      const ok = await exists(path);
      if (ok) {
        installedBrowsers.push({
          name: browser.name,
          type: browser.type,
          path,
        });
        break;
      }
    }
  }

  return installedBrowsers;
}

const emptyPlatform = {
  aix: [],
  android: [],
  darwin: [],
  cygwin: [],
  freebsd: [],
  linux: [],
  openbsd: [],
  sunos: [],
  win32: [],
  haiku: [],
  netbsd: [],
};

export const Browsers: Browser[] = [
  {
    name: "Arc",
    type: "chrome",
    path: {
      ...emptyPlatform,
      darwin: getDarwinPaths("Arc.app/Contents/MacOS/Arc"),
    },
  },
  {
    name: "Brave",
    type: "chrome",
    path: {
      ...emptyPlatform,
      win32: getWinPaths("BraveSoftware\\Brave-Browser\\Application\\brave.exe"),
      darwin: getDarwinPaths("Brave Browser.app/Contents/MacOS/Brave Browser"),
      linux: ["brave-browser"],
    },
  },
  {
    name: "Chrome",
    type: "chrome",
    path: {
      ...emptyPlatform,
      win32: getWinPaths("Google\\Chrome\\Application\\chrome.exe"),
      darwin: getDarwinPaths("Google Chrome.app/Contents/MacOS/Google Chrome"),
      linux: ["google-chrome"],
    },
  },
  {
    name: "Chrome Beta",
    type: "chrome",
    path: {
      ...emptyPlatform,
      win32: getWinPaths("Google\\Chrome Beta\\Application\\chrome.exe"),
      darwin: getDarwinPaths("Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta"),
      linux: ["google-chrome-beta"],
    },
  },
  {
    name: "Chrome Canary",
    type: "chrome",
    path: {
      ...emptyPlatform,
      win32: getWinPaths("Google\\Chrome Canary\\Application\\chrome.exe"),
      darwin: getDarwinPaths("Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary"),
      linux: ["google-chrome-canary"],
    },
  },
  {
    name: "Sidekick",
    type: "chrome",
    path: {
      ...emptyPlatform,
      win32: getWinPaths("Sidekick\\Application\\sidekick.exe"),
      darwin: getDarwinPaths("Sidekick.app/Contents/MacOS/Sidekick"),
      linux: ["sidekick-browser-stable"],
    },
  },
  {
    name: "Vivaldi",
    type: "chrome",
    path: {
      ...emptyPlatform,
      win32: getWinPaths("Vivaldi\\Application\\vivaldi.exe"),
      darwin: getDarwinPaths("Vivaldi.app/Contents/MacOS/Vivaldi"),
      linux: ["vivaldi-stable"],
    },
  },
  {
    name: "Firefox",
    type: "firefox",
    path: {
      ...emptyPlatform,
      win32: getWinPaths("Mozilla Firefox\\firefox.exe"),
      darwin: getDarwinPaths("Firefox.app/Contents/MacOS/Firefox"),
      linux: ["firefox"],
    },
  },
  {
    name: "Firefox Nightly",
    type: "firefox",
    path: {
      ...emptyPlatform,
      win32: getWinPaths("Firefox Nightly\\firefox.exe"),
      darwin: getDarwinPaths("Firefox Nightly.app/Contents/MacOS/Firefox"),
      linux: ["firefox-nightly"],
    },
  },
  {
    name: "Firefox Developer Edition",
    type: "firefox",
    path: {
      ...emptyPlatform,
      win32: getWinPaths("Firefox Developer Edition\\firefox.exe"),
      darwin: getDarwinPaths("Firefox Developer Edition.app/Contents/MacOS/Firefox"),
      linux: ["firefox-dev"],
    },
  },
  {
    name: "Safari",
    type: "safari",
    path: {
      ...emptyPlatform,
      darwin: getDarwinPaths("Safari.app/Contents/MacOS/Safari"),
    },
  },
  {
    name: "Safari Technical Preview",
    type: "safari",
    path: {
      ...emptyPlatform,
      darwin: getDarwinPaths("Safari Technical Preview.app/Contents/MacOS/Safari Technical Preview"),
    },
  },
  {
    name: "Safari beta",
    type: "safari",
    path: {
      ...emptyPlatform,
      darwin: getDarwinPaths("Safari beta.app/Contents/MacOS/Safari beta"),
    },
  },
  {
    name: "Orion",
    type: "safari",
    path: {
      ...emptyPlatform,
      darwin: getDarwinPaths("Orion.app/Contents/MacOS/Orion"),
    },
  },
  {
    name: "Epiphany",
    type: "safari",
    path: {
      ...emptyPlatform,
      linux: ["epiphany-browser"],
    },
  },
  {
    name: "Opera",
    type: "chrome",
    path: {
      ...emptyPlatform,
      win32: getWinPaths("Opera\\opera.exe"),
      darwin: getDarwinPaths("Opera.app/Contents/MacOS/Opera"),
      linux: ["opera"],
    },
  },
  {
    name: "IE",
    type: "other",
    path: {
      ...emptyPlatform,
      win32: getWinPaths("Internet Explorer\\iexplore.exe"),
    },
  },
];
