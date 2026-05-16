import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  GitBranch,
  Mail,
  Moon,
  PanelsTopLeft,
  Printer,
  Radar,
  Sparkles,
  SquareStack,
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

const contactIcons = {
  Website: SquareStack,
  GitHub: GitBranch,
  Email: Mail
};

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
          <a className="flex items-center gap-3 font-semibold text-foreground" href="https://zohbot.net">
            <ZohbotAvatar compact />
            <span className="hidden sm:inline">{resume.name}</span>
          </a>
          <nav className="hidden items-center gap-1 rounded-md border border-border bg-card p-1 md:flex">
            {["Overview", "Systems", "Projects", "Skills"].map((item) => (
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
      <div className="relative mx-auto grid min-h-[680px] w-full max-w-7xl content-end gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:px-8 lg:py-10">
        <div className="max-w-3xl pb-2">
          <Badge variant="success" className="mb-5 max-w-full rounded-md px-3 py-1 text-left whitespace-normal">
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

        <Card className="self-end border-border/80 bg-card/82 backdrop-blur-xl">
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
                <Button key={contact.label} asChild variant="subtle" className="h-auto justify-start px-3 py-3">
                  <a href={contact.href}>
                    <Icon className="size-4 text-primary" />
                    <span className="grid text-left">
                      <span className="text-xs uppercase text-muted-foreground">{contact.label}</span>
                      <span>{contact.value}</span>
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
            <a className="flex items-start justify-between gap-3" href={project.url}>
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
          <ResumeTabs />
        </div>
      </main>
    </>
  );
}

export { App };
