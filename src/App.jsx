import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  Cpu,
  Gamepad2,
  GitBranch,
  Gauge,
  Mail,
  Moon,
  PanelsTopLeft,
  Printer,
  Rocket,
  RotateCcw,
  Send,
  ShieldCheck,
  Radar,
  Sparkles,
  SquareStack,
  Terminal,
  Trophy,
  WandSparkles,
  Workflow
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { resume } from "@/data/resume";

const metrics = [
  { label: "Workflows", value: "24/7", detail: "automation mindset" },
  { label: "Interface", value: "98%", detail: "ship-ready polish" },
  { label: "Signal", value: "3x", detail: "prototype velocity" }
];

const operations = [
  { icon: Workflow, label: "Systems", value: "Automation loops, data flows, clean handoffs" },
  { icon: PanelsTopLeft, label: "Interfaces", value: "Dense dashboards, fast forms, responsive UI" },
  { icon: Radar, label: "Delivery", value: "Debug, refine, deploy, document" }
];

const quickCommands = ["help", "whoami", "projects", "skills", "contact", "motd"];
const maxTerminalHistory = 8;

const missionCards = [
  {
    id: "prototype",
    icon: Rocket,
    title: "Launch prototype",
    detail: "Turn a raw idea into a clickable browser experience.",
    reward: "+30 signal"
  },
  {
    id: "automate",
    icon: Workflow,
    title: "Automate the loop",
    detail: "Find repeated work, wire the workflow, and leave notes for humans.",
    reward: "+24 focus"
  },
  {
    id: "polish",
    icon: WandSparkles,
    title: "Polish the interface",
    detail: "Tighten spacing, states, copy, and responsive behavior.",
    reward: "+18 style"
  }
];

const buildModes = [
  {
    id: "interface",
    icon: PanelsTopLeft,
    label: "Interface",
    score: 34,
    output: "Responsive layout, readable hierarchy, crisp interaction states."
  },
  {
    id: "automation",
    icon: Cpu,
    label: "Automation",
    score: 29,
    output: "Repeatable workflows, API glue, and fewer manual handoffs."
  },
  {
    id: "delivery",
    icon: ShieldCheck,
    label: "Delivery",
    score: 25,
    output: "Debug pass, deployment path, docs, and a clean handoff."
  }
];

const contactIcons = {
  Website: SquareStack,
  GitHub: GitBranch,
  Email: Mail
};

function getCommandLines(command) {
  switch (command) {
    case "help":
      return [
        "Try: whoami, projects, skills, contact, motd, clear.",
        "Click a command chip or type into the input below."
      ];
    case "whoami":
      return [resume.name, resume.role, resume.summary];
    case "projects":
      return resume.projects.map((project) => `${project.name}: ${project.stack}`);
    case "skills":
      return resume.skills.map((skillSet) => `${skillSet.group}: ${skillSet.items.join(", ")}`);
    case "contact":
      return resume.contacts.map((contact) => `${contact.label}: ${contact.value}`);
    case "motd":
      return [
        "The quieter you become, the more you can hear.",
        "Build the system, then make it feel effortless."
      ];
    default:
      return [`Command not found: ${command}`, "Run help for the command list."];
  }
}

function getSafeLinkProps(href) {
  return href.startsWith("http") ? { rel: "noreferrer" } : {};
}

function IconButton({ label, children, onClick }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button type="button" variant="subtle" size="icon" aria-label={label} onClick={onClick}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function SectionHeading({ icon: Icon, eyebrow, title, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-md border border-primary/20 bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">{eyebrow}</p>
          <h2 className="text-lg font-semibold tracking-normal text-foreground">{title}</h2>
        </div>
      </div>
      {action}
    </div>
  );
}

function ZohbotAvatar({ compact = false }) {
  return (
    <div
      className={
        compact
          ? "zohbot-avatar zohbot-avatar-compact"
          : "zohbot-avatar rounded-md border border-primary/25 bg-primary/10"
      }
      aria-hidden="true"
    />
  );
}

function Header() {
  return (
    <TooltipProvider delayDuration={250}>
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/82 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            className="flex items-center gap-3 font-semibold text-foreground"
            href="https://zohbot.net"
            {...getSafeLinkProps("https://zohbot.net")}
          >
            <ZohbotAvatar compact />
            <span className="hidden sm:inline">{resume.name}</span>
          </a>
          <nav className="hidden items-center gap-1 rounded-md border border-border bg-card p-1 md:flex">
            {["Overview", "Systems", "Playground", "Projects", "Skills"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-sm px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <IconButton label="Toggle appearance">
              <Moon className="size-4" />
            </IconButton>
            <IconButton label="Print resume" onClick={() => window.print()}>
              <Printer className="size-4" />
            </IconButton>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}

function Hero() {
  return (
    <section id="overview" className="relative overflow-hidden border-b border-border bg-card">
      <div className="hero-media absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-[680px] w-full min-w-0 max-w-7xl content-end gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:px-8 lg:py-10">
        <div className="min-w-0 max-w-3xl pb-2">
          <Badge
            variant="success"
            className="wrap-inline mb-5 w-full max-w-full justify-start rounded-md px-3 py-1 text-left sm:w-fit"
          >
            <Sparkles className="size-3" />
            {resume.availability}
          </Badge>
          <h1 className="max-w-[9ch] text-6xl font-semibold leading-[0.86] tracking-normal text-foreground sm:text-7xl lg:text-8xl">
            {resume.name}
          </h1>
          <p className="mt-4 text-2xl font-semibold leading-tight text-primary sm:text-3xl">{resume.role}</p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{resume.summary}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {metrics.map((metric) => (
              <Card key={metric.label} className="border-border/80 bg-card/78 backdrop-blur-xl">
                <CardContent className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">{metric.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">{metric.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{metric.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="min-w-0 overflow-hidden self-end border-border/80 bg-card/82 backdrop-blur-xl">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4">
              <ZohbotAvatar />
              <Badge variant="warning" className="rounded-md">
                Active
              </Badge>
            </div>
            <CardTitle className="mt-4 text-xl">{resume.location}</CardTitle>
            <CardDescription>Profile endpoints and quick contact routes</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            {resume.contacts.map((contact) => {
              const Icon = contactIcons[contact.label] || ArrowUpRight;

              return (
                <Button
                  key={contact.label}
                  asChild
                  variant="subtle"
                  className="wrap-inline h-auto min-w-0 justify-start px-3 py-3"
                >
                  <a href={contact.href} {...getSafeLinkProps(contact.href)}>
                    <Icon className="size-4 text-primary" />
                    <span className="grid min-w-0 text-left">
                      <span className="text-xs uppercase text-muted-foreground">{contact.label}</span>
                      <span className="break-all">{contact.value}</span>
                    </span>
                  </a>
                </Button>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function OperationsPanel() {
  return (
    <section id="systems" className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
      <Card className="overflow-hidden bg-card">
        <div className="core-graphic min-h-[320px]" aria-hidden="true" />
      </Card>
      <Card>
        <CardHeader>
          <SectionHeading icon={Bot} eyebrow="Operating model" title="Polished systems, not loose pages" />
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-3">
            {operations.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-lg border border-border bg-muted/35 p-4">
                <Icon className="mb-3 size-5 text-primary" />
                <h3 className="font-semibold text-foreground">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{value}</p>
              </div>
            ))}
          </div>
          <Separator />
          <ul className="grid gap-3">
            {resume.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}

function TerminalPanel() {
  const [history, setHistory] = useState([
    {
      command: "boot",
      lines: ["Zohbot interactive shell online.", "Run help to explore the resume."]
    }
  ]);
  const [command, setCommand] = useState("");

  const runCommand = (rawCommand) => {
    const nextCommand = rawCommand.trim().toLowerCase();

    if (!nextCommand) {
      return;
    }

    if (nextCommand === "clear") {
      setHistory([]);
      setCommand("");
      return;
    }

    setHistory((current) =>
      [
        ...current,
        {
          command: nextCommand,
          lines: getCommandLines(nextCommand)
        }
      ].slice(-maxTerminalHistory)
    );
    setCommand("");
  };

  return (
    <Card className="terminal-surface overflow-hidden">
      <CardHeader className="relative z-10 flex-row items-center justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="size-4 text-primary" />
            Visitor terminal
          </CardTitle>
          <CardDescription>Type a command or use the chips to inspect the profile.</CardDescription>
        </div>
        <Badge variant="success" className="rounded-md">
          Live
        </Badge>
      </CardHeader>
      <CardContent className="relative z-10 grid gap-4">
        <div
          className="min-h-[15rem] rounded-md border border-primary/15 bg-background/72 p-4 font-mono text-sm"
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
        >
          {history.length === 0 ? (
            <p className="text-muted-foreground">Console cleared. Try help.</p>
          ) : (
            <div className="grid gap-4">
              {history.map((entry, index) => (
                <div key={`${entry.command}-${index}`} className="grid gap-1">
                  <p className="text-primary">zohbot@site:~$ {entry.command}</p>
                  {entry.lines.map((line, lineIndex) => (
                    <p key={`${line}-${lineIndex}`} className="break-words text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          )}
          <p className="mt-4 text-primary">
            zohbot@site:~$ <span className="terminal-caret" aria-hidden="true" />
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickCommands.map((quickCommand) => (
            <Button key={quickCommand} type="button" variant="subtle" size="sm" onClick={() => runCommand(quickCommand)}>
              {quickCommand}
            </Button>
          ))}
        </div>

        <form
          className="flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            runCommand(command);
          }}
        >
          <label className="sr-only" htmlFor="terminal-command">
            Terminal command
          </label>
          <input
            id="terminal-command"
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            placeholder="type help, projects, skills..."
            maxLength={40}
            autoComplete="off"
            autoCorrect="off"
            inputMode="text"
            spellCheck="false"
            className="min-w-0 flex-1 rounded-md border border-border bg-background/76 px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
          <Button type="submit" aria-label="Run command">
            <Send className="size-4" />
            Run
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function MissionBoard() {
  const [activeMission, setActiveMission] = useState(missionCards[0].id);
  const [completedMissions, setCompletedMissions] = useState(["prototype"]);

  const selectedMission = missionCards.find((mission) => mission.id === activeMission) || missionCards[0];
  const progress = Math.round((completedMissions.length / missionCards.length) * 100);

  const toggleMission = (missionId) => {
    setCompletedMissions((current) =>
      current.includes(missionId) ? current.filter((id) => id !== missionId) : [...current, missionId]
    );
  };

  return (
    <Card className="bg-card/82">
      <CardHeader>
        <SectionHeading icon={Trophy} eyebrow="Quest board" title="Pick a build mission" />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="rounded-md border border-border bg-muted/35 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-foreground">Visitor progress</p>
            <Badge variant="warning" className="rounded-md">
              {progress}%
            </Badge>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-background">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="grid gap-2">
          {missionCards.map((mission) => {
            const Icon = mission.icon;
            const isActive = mission.id === activeMission;
            const isComplete = completedMissions.includes(mission.id);

            return (
              <button
                key={mission.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveMission(mission.id)}
                className={`rounded-md border p-3 text-left transition-all ${
                  isActive
                    ? "border-primary/60 bg-primary/10 shadow-[0_0_28px_rgb(72_240_219_/_0.12)]"
                    : "border-border bg-muted/20 hover:border-primary/35"
                }`}
              >
                <span className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-md border border-primary/20 bg-background text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2 font-semibold text-foreground">
                      {mission.title}
                      {isComplete ? (
                        <Badge variant="success" className="rounded-md">
                          Complete
                        </Badge>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-muted-foreground">{mission.detail}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-md border border-border bg-background/55 p-4">
          <p className="text-sm font-semibold text-foreground">{selectedMission.reward}</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{selectedMission.detail}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" size="sm" onClick={() => toggleMission(selectedMission.id)}>
              <CheckCircle2 className="size-4" />
              Toggle complete
            </Button>
            <Button type="button" variant="subtle" size="sm" onClick={() => setCompletedMissions([])}>
              <RotateCcw className="size-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SignalLab() {
  const [enabledModes, setEnabledModes] = useState(["interface", "automation"]);

  const activeModes = useMemo(
    () => buildModes.filter((mode) => enabledModes.includes(mode.id)),
    [enabledModes]
  );
  const signalScore = activeModes.reduce((total, mode) => total + mode.score, 12);
  const output = activeModes.length
    ? activeModes.map((mode) => mode.output).join(" ")
    : "Select a mode to generate a build profile.";

  const toggleMode = (modeId) => {
    setEnabledModes((current) =>
      current.includes(modeId) ? current.filter((id) => id !== modeId) : [...current, modeId]
    );
  };

  return (
    <Card className="signal-lab overflow-hidden bg-card/82">
      <CardHeader className="relative z-10">
        <SectionHeading icon={Gauge} eyebrow="Signal lab" title="Mix the Zohbot build mode" />
      </CardHeader>
      <CardContent className="relative z-10 grid gap-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {buildModes.map((mode) => {
            const Icon = mode.icon;
            const isEnabled = enabledModes.includes(mode.id);

            return (
              <Button
                key={mode.id}
                type="button"
                aria-pressed={isEnabled}
                variant={isEnabled ? "default" : "subtle"}
                className="h-auto justify-start px-3 py-3"
                onClick={() => toggleMode(mode.id)}
              >
                <Icon className="size-4" />
                {mode.label}
              </Button>
            );
          })}
        </div>

        <div className="grid gap-3 rounded-md border border-border bg-background/62 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-foreground">Signal strength</p>
            <p className="text-2xl font-semibold text-primary">{Math.min(signalScore, 100)}</p>
          </div>
          <div className="grid grid-cols-12 gap-1">
            {Array.from({ length: 12 }, (_, index) => (
              <span
                key={index}
                className={`h-8 rounded-sm border ${
                  index < Math.ceil(Math.min(signalScore, 100) / 9)
                    ? "border-primary/45 bg-primary/35"
                    : "border-border bg-muted/25"
                }`}
              />
            ))}
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{output}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function InteractivePlayground() {
  return (
    <section id="playground" className="grid gap-5">
      <SectionHeading
        icon={Gamepad2}
        eyebrow="Interactive profile"
        title="A web resume visitors can play with"
        action={
          <Badge variant="outline" className="rounded-md">
            React powered
          </Badge>
        }
      />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <TerminalPanel />
        <div className="grid gap-5">
          <MissionBoard />
          <SignalLab />
        </div>
      </div>
    </section>
  );
}

function ExperienceList() {
  return (
    <div className="grid gap-3">
      {resume.experience.map((job) => (
        <Card key={`${job.company}-${job.period}`} className="bg-card/70">
          <CardHeader className="flex-row items-start justify-between gap-4 space-y-0 pb-3">
            <div>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>
                {job.company} / {job.location}
              </CardDescription>
            </div>
            <Badge variant="outline" className="rounded-md text-primary">
              {job.period}
            </Badge>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ProjectGrid() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {resume.projects.map((project) => (
        <Card key={project.name} className="group bg-card/70 transition-colors hover:border-primary/40">
          <CardHeader>
            <a className="flex items-start justify-between gap-3" href={project.url} {...getSafeLinkProps(project.url)}>
              <CardTitle className="leading-tight">{project.name}</CardTitle>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="warning" className="rounded-md">
              {project.stack}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function SkillMatrix() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {resume.skills.map((skillSet) => (
        <Card key={skillSet.group} className="bg-card/70">
          <CardHeader>
            <CardTitle>{skillSet.group}</CardTitle>
            <CardDescription>{skillSet.items.length} capabilities</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {skillSet.items.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ResumeTabs() {
  return (
    <section id="projects" className="grid gap-5">
      <SectionHeading icon={BriefcaseBusiness} eyebrow="Resume console" title="Experience, projects, and capabilities" />
      <Tabs defaultValue="experience" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto md:w-fit">
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>
        <TabsContent value="experience">
          <ExperienceList />
        </TabsContent>
        <TabsContent value="projects">
          <ProjectGrid />
        </TabsContent>
        <TabsContent value="skills" id="skills">
          <SkillMatrix />
        </TabsContent>
        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>{resume.education[0].school}</CardTitle>
              <CardDescription>{resume.education[0].credential}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="warning" className="rounded-md">
                {resume.education[0].period}
              </Badge>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function App() {
  return (
    <>
      <Header />
      <main id="resume">
        <Hero />
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
          <OperationsPanel />
          <InteractivePlayground />
          <ResumeTabs />
        </div>
      </main>
      <footer className="site-footer">
        <div>
          <strong>Zohbot Web Resume</strong>
          <p>
            Design, frontend implementation, and project presentation by{" "}
            <a href="https://syhtek.com" {...getSafeLinkProps("https://syhtek.com")}>
              SYHTEK
            </a>.
          </p>
        </div>
        <a href="https://syhtek.com" {...getSafeLinkProps("https://syhtek.com")}>
          Inquiries
        </a>
      </footer>
    </>
  );
}

export { App };
