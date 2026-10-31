"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileText,
  Flag,
  Pause,
  Play,
  RotateCcw,
  Timer as TimerIcon,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  formatTime,
  parseDurationMs,
  remainingMs,
  timerActions,
  usedMs,
  useTimer,
} from "@/lib/progress/timer";
import { actions as progressActions } from "@/lib/progress/store";
import { onStrong, strong } from "@/lib/color";
import type { Paper } from "@/lib/types";

const ANNOUNCE_AT_MIN = [30, 10, 5, 1];

function beep(ctx: AudioContext) {
  try {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    o.type = "sine";
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    o.start();
    o.stop(ctx.currentTime + 0.65);
  } catch {
    /* audio unavailable — the visual state still fires */
  }
}

function announce(msg: string) {
  const el = document.getElementById("sr-status");
  if (el) el.textContent = msg;
}

export function PaperTimer({
  paper,
  open,
  onOpenChange,
  slug,
  colorVar,
}: {
  paper: Paper | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  slug: string;
  colorVar: string;
}) {
  const timer = useTimer();
  const defaultMs = paper ? parseDurationMs(paper.format.duration) : null;

  const [minutes, setMinutes] = useState<number>(0);
  const [soundOn, setSoundOn] = useState(true);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState("");
  const audioRef = useRef<AudioContext | null>(null);
  const announcedRef = useRef<Set<number>>(new Set());
  const [, force] = useState(0);

  const activeHere = !!timer && !!paper && timer.paperId === paper.id && timer.status !== "finished";
  const activeElsewhere =
    !!timer && !!paper && timer.paperId !== paper.id && timer.status !== "finished";

  const marks = paper?.format.marks ?? null;

  useEffect(() => {
    if (defaultMs) setMinutes(Math.round(defaultMs / 60000));
    setShowScore(false);
    setScore("");
    announcedRef.current = new Set();
  }, [paper?.id, defaultMs]);

  // re-render once a second while running
  useEffect(() => {
    if (!timer || timer.status !== "running") return;
    const id = setInterval(() => force((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, [timer?.status, timer?.paperId]);

  // time-up + minute announcements
  useEffect(() => {
    if (!timer || timer.status !== "running") return;
    const rem = remainingMs(timer);
    if (rem <= 0) {
      timerActions.timeup();
      if (timer.sound && audioRef.current) beep(audioRef.current);
      announce("Time is up.");
      return;
    }
    const mins = Math.floor(rem / 60000);
    for (const th of ANNOUNCE_AT_MIN) {
      if (mins === th && !announcedRef.current.has(th)) {
        announcedRef.current.add(th);
        announce(`${th} minute${th === 1 ? "" : "s"} remaining.`);
      }
    }
  });

  const questionsFile = paper?.files.find((f) => f.kind === "questions") ?? paper?.files[0];
  const answerSheetFile = paper?.files.find((f) => f.kind === "answer-sheet");
  const rem = timer ? remainingMs(timer) : 0;

  function handleStart() {
    if (!paper) return;
    const ms = Math.max(1, minutes) * 60000;
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioRef.current = audioRef.current ?? new Ctx();
    } catch {
      /* audio unavailable */
    }
    timerActions.start(paper.id, slug, paper.title, ms, soundOn);
  }

  function handleFinishClick() {
    if (!timer) return;
    if (timer.status === "running") timerActions.pause();
    setShowScore(true);
  }

  function handleSaveAttempt() {
    if (!timer) return;
    const parsed = score.trim() === "" ? undefined : Math.max(0, Number(score));
    progressActions.attempt(timer.slug, timer.paperId, {
      at: timer.startedAt,
      usedMs: usedMs(timer),
      score: Number.isFinite(parsed) ? parsed : undefined,
    });
    timerActions.clear();
    setShowScore(false);
    announce("Attempt saved. Solutions are now available.");
    onOpenChange(false);
  }

  const primaryBtn =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all hover:brightness-110";
  const ghostBtn =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TimerIcon className="h-5 w-5" style={{ color: strong(colorVar) }} />
            Timed attempt
          </DialogTitle>
          {paper && <DialogDescription className="line-clamp-2">{paper.title}</DialogDescription>}
        </DialogHeader>

        {/* A different paper's timer is already running */}
        {activeElsewhere && timer && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              A timer is already running for <b className="text-foreground">{timer.title}</b>.
            </p>
            <div className="flex flex-col gap-2">
              <button className={ghostBtn} onClick={() => onOpenChange(false)}>
                Keep the current timer
              </button>
              <button className={ghostBtn} onClick={() => timerActions.clear()}>
                Discard it and time this paper instead
              </button>
            </div>
          </div>
        )}

        {/* Setup (no active timer for this paper) */}
        {!activeHere && !activeElsewhere && paper && (
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-foreground">Duration (minutes)</span>
              <input
                type="number"
                min={1}
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              />
            </label>
            {defaultMs == null && (
              <p className="text-xs text-muted-foreground">
                No official duration listed — set your own.
              </p>
            )}
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={soundOn}
                onChange={(e) => setSoundOn(e.target.checked)}
                className="h-4 w-4"
              />
              Sound when time runs out
            </label>
            <button
              className={primaryBtn + " w-full"}
              style={{ background: strong(colorVar), color: onStrong }}
              onClick={handleStart}
            >
              <Play className="h-4 w-4" /> Start timer
            </button>
            {questionsFile && (
              <a
                href={questionsFile.url}
                target="_blank"
                rel="noopener noreferrer"
                className={ghostBtn + " w-full"}
              >
                <FileText className="h-4 w-4" /> Open paper in new tab
              </a>
            )}
          </div>
        )}

        {/* Active timer for this paper */}
        {activeHere && timer && (
          <div className="space-y-4">
            <div
              aria-live="off"
              className="rounded-2xl border border-border bg-secondary/30 px-4 py-6 text-center"
            >
              <div
                className="font-heading text-5xl font-bold tabular-nums tracking-tight"
                style={{
                  color:
                    timer.status === "timeup"
                      ? "hsl(var(--destructive, 0 84% 60%))"
                      : strong(colorVar),
                }}
              >
                {timer.status === "timeup" ? "00:00" : formatTime(rem)}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {timer.status === "paused"
                  ? "Paused"
                  : timer.status === "timeup"
                    ? "Time's up"
                    : "Remaining"}
              </div>
            </div>

            {timer.status === "timeup" && (
              <p className="text-center text-sm font-medium text-foreground">
                Time&apos;s up — finish your attempt to unlock the solutions.
              </p>
            )}

            {!showScore ? (
              <>
                <div className="grid grid-cols-2 gap-2">
                  {timer.status === "running" ? (
                    <button className={ghostBtn} onClick={() => timerActions.pause()}>
                      <Pause className="h-4 w-4" /> Pause
                    </button>
                  ) : timer.status === "paused" ? (
                    <button className={ghostBtn} onClick={() => timerActions.resume()}>
                      <Play className="h-4 w-4" /> Resume
                    </button>
                  ) : (
                    <span />
                  )}
                  <button className={ghostBtn} onClick={() => timerActions.reset()}>
                    <RotateCcw className="h-4 w-4" /> Reset
                  </button>
                </div>
                <button
                  className={primaryBtn + " w-full"}
                  style={{ background: strong(colorVar), color: onStrong }}
                  onClick={handleFinishClick}
                >
                  <Flag className="h-4 w-4" /> Finished
                </button>
                <div className="grid grid-cols-1 gap-2">
                  {questionsFile && (
                    <a
                      href={questionsFile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={ghostBtn}
                    >
                      <FileText className="h-4 w-4" /> Open paper in new tab
                    </a>
                  )}
                  {answerSheetFile && (
                    <a
                      href={answerSheetFile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={ghostBtn}
                    >
                      <FileText className="h-4 w-4" /> Open answer sheet
                    </a>
                  )}
                </div>
                <button
                  className="mx-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    const next = !timer.sound;
                    setSoundOn(next);
                    timerActions.setSound(next);
                  }}
                >
                  {timer.sound ? (
                    <Volume2 className="h-3.5 w-3.5" />
                  ) : (
                    <VolumeX className="h-3.5 w-3.5" />
                  )}
                  Sound {timer.sound ? "on" : "off"}
                </button>
              </>
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">How did it go?</p>
                <label className="block">
                  <span className="text-xs text-muted-foreground">
                    Score (optional){marks != null ? ` — out of ${marks}` : ""}
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={marks ?? undefined}
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="Leave blank if unsure"
                    className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
                  />
                </label>
                <button
                  className={primaryBtn + " w-full"}
                  style={{ background: strong(colorVar), color: onStrong }}
                  onClick={handleSaveAttempt}
                >
                  Save attempt &amp; reveal solutions
                </button>
                <button className={ghostBtn + " w-full"} onClick={() => setShowScore(false)}>
                  Back
                </button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
