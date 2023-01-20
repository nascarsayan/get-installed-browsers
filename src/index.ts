import { homedir } from "os";
import { resolve } from "path";
import { existsSync } from "fs";
import { exec } from "child_process";

interface Browser {
  name: string;
  type: "chrome" | "firefox" | "safari" | "other";
  path: Record<NodeJS.Platform, string[]>;
}

function exists(path: string): boolean {
  const platform = process.platform;

  if (platform === "linux") {
    let err: Error | null = null;
    exec("which " + path, (error) => {
      err = error;
    });

    return err === null;
  }

  return existsSync(path);
}

export function GetInstalledBrowsers() {
  const platform = process.platform;
  const installedBrowsers: {
    name: string;
    type: string;
    path: string;
  }[] = [];

  for (const browser of Browsers) {
    if (browser.path[platform]) {
      for (const path of browser.path[platform]) {
        if (exists(path)) {
          installedBrowsers.push({
            name: browser.name,
            type: browser.type,
            path,
          });
          break;
        }
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
      darwin: [
        resolve(homedir(), "/Applications/Arc.app/Contents/MacOS/Arc"),
        "/Applications/Arc.app/Contents/MacOS/Arc",
      ],
    },
  },
    {
    name: "Brave",
    type: "chrome",
    path: {
      ...emptyPlatform,
      win32: [
        resolve(
          homedir(),
          "\\Local Settings\\Application Data\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"
        ),
        resolve(
          homedir(),
          "\\AppData\\Local\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"
        ),
        "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\Brave.exe",
      ],
      darwin: [
        resolve(
          homedir(),
          "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"
        ),
        "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
      ],
      linux: ["brave-browser"],
    },
  },
  {
    name: "Chrome",
    type: "chrome",
    path: {
      ...emptyPlatform,
      win32: [
        resolve(
          homedir(),
          "\\Local Settings\\Application Data\\Google\\Chrome\\Application\\chrome.exe"
        ),
        resolve(
          homedir(),
          "\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe"
        ),
        "C:\\Program Files\\Google\\Chrome\\Application\\Chrome.exe",
      ],
      darwin: [
        resolve(
          homedir(),
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        ),
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      ],
      linux: ["google-chrome"],
    },
  },
  {
    name: "Chrome Beta",
    type: "chrome",
    path: {
      ...emptyPlatform,
      win32: [
        resolve(
          homedir(),
          "\\Local Settings\\Application Data\\Google\\Chrome Beta\\Application\\chrome.exe"
        ),
        resolve(
          homedir(),
          "\\AppData\\Local\\Google\\Chrome Beta\\Application\\chrome.exe"
        ),
        "C:\\Program Files\\Google\\Chrome Beta\\Application\\Chrome.exe",
      ],
      darwin: [
        resolve(
          homedir(),
          "/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta"
        ),
        "/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta",
      ],
      linux: ["google-chrome-beta"],
    },
  },
  {
    name: "Chrome Canary",
    type: "chrome",
    path: {
      ...emptyPlatform,
      win32: [
        resolve(
          homedir(),
          "\\Local Settings\\Application Data\\Google\\Chrome Canary\\Application\\chrome.exe"
        ),
        resolve(
          homedir(),
          "\\AppData\\Local\\Google\\Chrome Canary\\Application\\chrome.exe"
        ),
        "C:\\Program Files\\Google\\Chrome Canary\\Application\\Chrome.exe",
      ],
      darwin: [
        resolve(
          homedir(),
          "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary"
        ),
        "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
      ],
      linux: ["google-chrome-canary"],
    },
  },
  {
    name: "Sidekick",
    type: "chrome",
    path: {
      ...emptyPlatform,
      win32: [
        resolve(
          homedir(),
          "\\Local Settings\\Application Data\\Sidekick\\Application\\sidekick.exe"
        ),
        resolve(
          homedir(),
          "\\AppData\\Local\\Sidekick\\Application\\sidekick.exe"
        ),
        "C:\\Program Files\\Sidekick\\Application\\sidekick.exe",
      ],
      darwin: [
        resolve(homedir(), "/Applications/Sidekick.app/Contents/MacOS/Sidekick"),
        "/Applications/Sidekick.app/Contents/MacOS/Sidekick",
      ],
      linux: ["sidekick-browser-stable"],
    },
  },
  {
    name: "Vivaldi",
    type: "chrome",
    path: {
      ...emptyPlatform,
      win32: [
        resolve(
          homedir(),
          "\\Local Settings\\Application Data\\Vivaldi\\Application\\vivaldi.exe"
        ),
        resolve(
          homedir(),
          "\\AppData\\Local\\Vivaldi\\Application\\vivaldi.exe"
        ),
        "C:\\Program Files\\Vivaldi\\Application\\vivaldi.exe",
      ],
      darwin: [
        resolve(homedir(), "/Applications/Vivaldi.app/Contents/MacOS/Vivaldi"),
        "/Applications/Vivaldi.app/Contents/MacOS/Vivaldi",
      ],
      linux: ["vivaldi-stable"],
    },
  },
  {
    name: "Firefox",
    type: "firefox",
    path: {
      ...emptyPlatform,
      win32: ["C:\\Program Files\\Mozilla Firefox\\firefox.exe"],
      darwin: [
        resolve(homedir(), "/Applications/Firefox.app/Contents/MacOS/firefox"),
        "/Applications/Firefox.app/Contents/MacOS/firefox",
      ],
      linux: ["firefox"],
    },
  },
  {
    name: "Firefox Nightly",
    type: "firefox",
    path: {
      ...emptyPlatform,
      win32: ["C:\\Program Files\\Firefox Nightly\\firefox.exe"],
      darwin: [
        resolve(
          homedir(),
          "/Applications/Firefox Nightly.app/Contents/MacOS/firefox"
        ),
        "/Applications/Firefox Nightly.app/Contents/MacOS/firefox",
      ],
      linux: ["firefox-nightly"],
    },
  },
  {
    name: "Firefox Developer Edition",
    type: "firefox",
    path: {
      ...emptyPlatform,
      win32: ["C:\\Program Files\\Firefox Developer Edition\\firefox.exe"],
      darwin: [
        resolve(
          homedir(),
          "/Applications/Firefox Developer Edition.app/Contents/MacOS/firefox"
        ),
        "/Applications/Firefox Developer Edition.app/Contents/MacOS/firefox",
      ],
      linux: ["firefox-dev"],
    },
  },
  {
    name: "Safari",
    type: "safari",
    path: {
      ...emptyPlatform,
      darwin: [
        resolve(homedir(), "/Applications/Safari.app/Contents/MacOS/Safari"),
        "/Applications/Safari.app/Contents/MacOS/Safari",
      ],
    },
  },
  {
    name: "Orion",
    type: "safari",
    path: {
      ...emptyPlatform,
      darwin: [
        resolve(homedir(), "/Applications/Orion.app/Contents/MacOS/Orion"),
        "/Applications/Orion.app/Contents/MacOS/Orion",
      ],
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
      win32: ["C:\\Program Files\\Opera\\opera.exe"],
      darwin: [
        resolve(homedir(), "/Applications/Opera.app/Contents/MacOS/Opera"),
        "/Applications/Opera.app/Contents/MacOS/Opera",
      ],
      linux: ["opera"],
    },
  },
  {
    name: "IE",
    type: "other",
    path: {
      ...emptyPlatform,
      win32: ["C:\\Program Files\\Internet Explorer\\iexplore.exe"],
    },
  },
];
