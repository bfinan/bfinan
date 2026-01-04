"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

type Mode = "CLASSIC" | "PACE";

const DEFAULT_READ = "";
const DEFAULT_MEASUREMENT = "page";
const DEFAULT_START = "1";
const DEFAULT_MODE: Mode = "CLASSIC";
const DEFAULT_PACE = 1;

type WindowWithWebkitAudioContext = Window & {
  webkitAudioContext?: typeof AudioContext;
};

export default function PacerPage() {
  const [book, setBook] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [mode, setMode] = useState<Mode>("CLASSIC");
  const [pageStart, setPageStart] = useState("");
  const [pageEnd, setPageEnd] = useState("");
  const [minutes, setMinutes] = useState("");
  const [pace, setPace] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [currentMinute, setCurrentMinute] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(0);
  const [calculatedPace, setCalculatedPace] = useState(0);
  const [calculatedPageEnd, setCalculatedPageEnd] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const displayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const SETTINGS_STORAGE_KEY = "pacer_settings_v1";
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [cueSoundEnabled, setCueSoundEnabled] = useState(true);
  const [flashCueEnabled, setFlashCueEnabled] = useState(false);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const flashTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to format measurement unit for display in active reading mode
  const getDisplayUnit = () => {
    return measurement === "percent" ? "%" : measurement;
  };

  // Load cached values from localStorage on mount
  useEffect(() => {
    const cachedRead = localStorage.getItem("pacer_read") || DEFAULT_READ;
    const cachedMeasurement = localStorage.getItem("pacer_measurement") || DEFAULT_MEASUREMENT;
    const cachedStart = localStorage.getItem("pacer_start") || DEFAULT_START;
    const cachedMode = (localStorage.getItem("pacer_mode") || DEFAULT_MODE) as Mode;
    const cachedPace = localStorage.getItem("pacer_pace") || DEFAULT_PACE.toString();

    setBook(cachedRead);
    setMeasurement(cachedMeasurement);
    setPageStart(cachedStart);
    setMode(cachedMode);
    setPace(cachedPace);

    // Load settings (no cookies; browser storage only)
    try {
      const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<{
          cueSoundEnabled: boolean;
          flashCueEnabled: boolean;
        }>;
        if (typeof parsed.cueSoundEnabled === "boolean") setCueSoundEnabled(parsed.cueSoundEnabled);
        if (typeof parsed.flashCueEnabled === "boolean") setFlashCueEnabled(parsed.flashCueEnabled);
      }
    } catch (error) {
      console.warn("Failed to load pacer settings:", error);
    }
  }, []);

  const saveSettings = (next: { cueSoundEnabled: boolean; flashCueEnabled: boolean }) => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(next));
    } catch (error) {
      console.warn("Failed to save pacer settings:", error);
    }
  };

  // Cue sound function using Web Audio API (enabled by default)
  const playCueSound = () => {
    try {
      if (!audioContextRef.current) {
        const AudioContextCtor =
          window.AudioContext ||
          (window as WindowWithWebkitAudioContext).webkitAudioContext;
        if (!AudioContextCtor) return;
        audioContextRef.current = new AudioContextCtor();
      }
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = 800;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.5);
    } catch (error) {
      console.error("Error playing cue sound:", error);
    }
  };

  const getFlashColor = () => {
    // Dark theme flash: pure white; Light theme flash: grass green (bright, slightly darker than RGB green)
    const prefersDark =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "#ffffff" : "#32CD32";
  };

  const triggerFlashCue = () => {
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    setIsFlashActive(true);
    flashTimeoutRef.current = setTimeout(() => {
      setIsFlashActive(false);
    }, 500);
  };

  const triggerCue = (pattern: "single" | "double" = "single") => {
    if (cueSoundEnabled) playCueSound();
    if (flashCueEnabled) triggerFlashCue();

    if (pattern === "double") {
      setTimeout(() => {
        if (cueSoundEnabled) playCueSound();
        if (flashCueEnabled) triggerFlashCue();
      }, 300);
    }
  };

  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    };
  }, []);

  // Display update timer (updates every second)
  useEffect(() => {
    if (isRunning && startTime !== null) {
      displayIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000; // elapsed seconds
        const totalSeconds = parseInt(minutes) * 60;
        
        if (elapsed >= totalSeconds) {
          setIsRunning(false);
          setIsComplete(true);
          setCurrentMinute(parseInt(minutes));
          setCurrentSeconds(0);
          triggerCue("double");
          return;
        }

        const mins = Math.floor(elapsed / 60);
        const secs = Math.floor(elapsed % 60);
        setCurrentMinute(mins);
        setCurrentSeconds(secs);

        // Update location based on elapsed time
        const start = parseFloat(pageStart);
        const newLocation = start + calculatedPace * (elapsed / 60);
        setCurrentLocation(newLocation);
      }, 1000); // Update every second

      return () => {
        if (displayIntervalRef.current) {
          clearInterval(displayIntervalRef.current);
        }
      };
    }
  }, [isRunning, startTime, minutes, pageStart, calculatedPace, cueSoundEnabled, flashCueEnabled]);

  // Cue timer (cues every minute, but not at the start)
  useEffect(() => {
    if (isRunning && currentMinute > 0 && currentSeconds === 0 && currentMinute < parseInt(minutes)) {
      triggerCue("single");
    }
  }, [currentMinute, isRunning, minutes]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();

    const start = parseFloat(pageStart);
    
    // Validate percent values
    if (measurement === "percent") {
      if (start < 0 || start > 100) {
        alert("Starting percent must be between 0 and 100");
        return;
      }
    }
    
    let calculatedPaceValue = 0;
    let calculatedEnd = 0;

    if (mode === "CLASSIC") {
      const end = parseFloat(pageEnd);
      
      // Validate percent values
      if (measurement === "percent") {
        if (end < 0 || end > 100) {
          alert("Ending percent must be between 0 and 100");
          return;
        }
        if (end < start) {
          alert("Ending percent must be greater than or equal to starting percent");
          return;
        }
      }
      
      // For discrete units (pages, locations, units), add 1 to include both start and end
      // For continuous units (percent), don't add 1
      const totalPages = measurement === "percent" ? end - start : end - start + 1;
      const mins = parseInt(minutes);
      calculatedPaceValue = totalPages / mins;
      calculatedEnd = end;
    } else if (mode === "PACE") {
      const paceValue = parseFloat(pace);
      
      // Validate percent values
      if (measurement === "percent") {
        // Pace represents percent per minute, so it can be > 100 if duration is short enough
        // Only validate that the calculated end doesn't exceed 100%
        const calculatedEndValue = start + paceValue * parseInt(minutes);
        if (calculatedEndValue > 100) {
          alert("The calculated ending percent would exceed 100. Please adjust your pace or duration.");
          return;
        }
        if (paceValue < 0) {
          alert("Pace must be greater than or equal to 0");
          return;
        }
      }
      
      const mins = parseInt(minutes);
      calculatedPaceValue = paceValue;
      calculatedEnd = start + paceValue * mins;
    }

    setCalculatedPace(calculatedPaceValue);
    setCalculatedPageEnd(calculatedEnd);
    setCurrentLocation(start);
    setCurrentMinute(0);
    setCurrentSeconds(0);
    setIsComplete(false);
    setStartTime(Date.now());
    setIsRunning(true);

    // Cache values
    localStorage.setItem("pacer_read", book);
    localStorage.setItem("pacer_measurement", measurement);
    localStorage.setItem("pacer_start", pageStart);
    localStorage.setItem("pacer_mode", mode);
    if (mode === "PACE") {
      localStorage.setItem("pacer_pace", pace);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (displayIntervalRef.current) {
      clearInterval(displayIntervalRef.current);
    }
    setStartTime(null);
  };

  const handleReset = () => {
    handleStop();
    setCurrentMinute(0);
    setCurrentSeconds(0);
    setCurrentLocation(0);
    setIsComplete(false);
    setStartTime(null);
    // Update cached start to the end point
    if (isComplete && calculatedPageEnd > 0) {
      localStorage.setItem("pacer_start", calculatedPageEnd.toString());
      setPageStart(calculatedPageEnd.toString());
    }
  };

  const handleRestart = () => {
    handleReset();
    // Reset form to cached/default values without reloading the page (works offline)
    const cachedRead = localStorage.getItem("pacer_read") || DEFAULT_READ;
    const cachedMeasurement = localStorage.getItem("pacer_measurement") || DEFAULT_MEASUREMENT;
    const cachedStart = localStorage.getItem("pacer_start") || DEFAULT_START;
    const cachedMode = (localStorage.getItem("pacer_mode") || DEFAULT_MODE) as Mode;
    const cachedPace = localStorage.getItem("pacer_pace") || DEFAULT_PACE.toString();

    setBook(cachedRead);
    setMeasurement(cachedMeasurement);
    setPageStart(cachedStart);
    setMode(cachedMode);
    setPace(cachedPace);
    setPageEnd("");
    setMinutes("");
    setCalculatedPace(0);
    setCalculatedPageEnd(0);
  };

  if (isRunning || isComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        {/* Flash cue overlay (background only) */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 transition-opacity duration-300"
          style={{
            backgroundColor: getFlashColor(),
            opacity: isFlashActive ? 1 : 0,
          }}
        />

        <div className="max-w-2xl w-full text-center relative">
          {/* Settings button (active reading only) */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            aria-label="Open pacer settings"
            className="absolute right-0 top-0 inline-flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M19.4 15a8.2 8.2 0 0 0 .1-1l2-1.6-2-3.4-2.5 1a7.3 7.3 0 0 0-1.7-1l-.4-2.7h-4l-.4 2.7a7.3 7.3 0 0 0-1.7 1l-2.5-1-2 3.4 2 1.6a8.2 8.2 0 0 0 .1 1 8.2 8.2 0 0 0-.1 1L2.4 17.6l2 3.4 2.5-1a7.3 7.3 0 0 0 1.7 1l.4 2.7h4l.4-2.7a7.3 7.3 0 0 0 1.7-1l2.5 1 2-3.4-2-1.6c.1-.3.1-.7.1-1Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <h1 className="text-3xl sm:text-4xl mb-6">Reading {book}</h1>
          
          <div className="mb-8">
            <p className="text-xl mb-2">
              {measurement === "percent" ? `${pageStart}% - ${Math.round(calculatedPageEnd)}%` : `${pageStart} - ${Math.round(calculatedPageEnd)} ${getDisplayUnit()}s`}
            </p>
            <p className="text-2xl font-bold mb-4">
              {measurement === "percent" ? `Now reading ${Math.round(currentLocation)}%` : `Now reading ${getDisplayUnit()} ${Math.round(currentLocation)}`}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {currentMinute}:{currentSeconds.toString().padStart(2, "0")} / {minutes}:00
            </p>
          </div>

          {isRunning && (
            <div className="mb-6">
              <button
                onClick={handleStop}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
              >
                Stop
              </button>
            </div>
          )}

          {isComplete && (
            <div className="space-y-4">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg mb-4">
                <p className="text-lg font-semibold mb-2">Reading Complete!</p>
                <p>
                  {measurement === "percent" 
                    ? `Read ${book} from ${pageStart}% to ${Math.round(calculatedPageEnd)}% in ${minutes} minutes`
                    : `Read ${book} from ${getDisplayUnit()} ${pageStart} to ${getDisplayUnit()} ${Math.round(calculatedPageEnd)} in ${minutes} minutes`}
                </p>
                <p className="mt-2">
                  Your pace was {Math.round(calculatedPace)}{measurement === "percent" ? "%" : ` ${getDisplayUnit()}s`} per minute
                </p>
              </div>
              <div className="space-x-4">
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Start New Session
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Settings modal (does not pause timer/pacer) */}
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50">
            <button
              type="button"
              aria-label="Close settings"
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsSettingsOpen(false)}
            />
            <div className="absolute left-1/2 top-1/2 w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-semibold">Settings</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Preferences are saved on this device.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="h-9 w-9 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  aria-label="Close settings"
                >
                  ×
                </button>
              </div>

              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold">Cue sound</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Placeholder description: Enable an audio cue on each pace interval.
                    </div>
                  </div>
                  <label className="inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={cueSoundEnabled}
                      onChange={(e) => {
                        const next = { cueSoundEnabled: e.target.checked, flashCueEnabled };
                        setCueSoundEnabled(next.cueSoundEnabled);
                        saveSettings(next);
                      }}
                    />
                    <span
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        cueSoundEnabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          cueSoundEnabled ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </span>
                  </label>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold">Flash cue</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Placeholder description: Flash the background when a cue happens.
                    </div>
                  </div>
                  <label className="inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={flashCueEnabled}
                      onChange={(e) => {
                        const next = { cueSoundEnabled, flashCueEnabled: e.target.checked };
                        setFlashCueEnabled(next.flashCueEnabled);
                        saveSettings(next);
                      }}
                    />
                    <span
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        flashCueEnabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          flashCueEnabled ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl sm:text-4xl mb-8 text-center">Reading Pacer</h1>
        
        <form onSubmit={handleStart} className="space-y-6">
          <div>
            <label htmlFor="book" className="block text-sm font-medium mb-2">
              What are you reading?
            </label>
            <input
              type="text"
              id="book"
              value={book}
              onChange={(e) => setBook(e.target.value)}
              placeholder={DEFAULT_READ}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label htmlFor="measurement" className="block text-sm font-medium mb-2">
              What unit of measurement are you using?
            </label>
            <select
              id="measurement"
              value={measurement}
              onChange={(e) => setMeasurement(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            >
              <option value="page">page</option>
              <option value="location">location</option>
              <option value="percent">percent (%)</option>
              <option value="unit">unit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Select mode
            </label>
            <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-1.5">
              <button
                type="button"
                onClick={() => setMode("CLASSIC")}
                className={`px-6 py-3 rounded-md text-base font-semibold transition-colors ${
                  mode === "CLASSIC"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                CLASSIC
              </button>
              <button
                type="button"
                onClick={() => setMode("PACE")}
                className={`px-6 py-3 rounded-md text-base font-semibold transition-colors ${
                  mode === "PACE"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                PACE
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {mode === "CLASSIC"
                ? `Enter starting ${measurement || "unit"}, ending ${measurement || "unit"}, and how long you want to read. The pace will be provided for you`
                : "Enter a pace and read for a set amount of time"}
            </p>
          </div>

          <div>
            <label htmlFor="pageStart" className="block text-sm font-medium mb-2">
              What {measurement || "unit"} are you starting at?
            </label>
            <input
              type="number"
              id="pageStart"
              value={pageStart}
              onChange={(e) => setPageStart(e.target.value)}
              placeholder={DEFAULT_START}
              step="0.01"
              min={measurement === "percent" ? "0" : undefined}
              max={measurement === "percent" ? "100" : undefined}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          {mode === "CLASSIC" && (
            <>
              <div>
                <label htmlFor="pageEnd" className="block text-sm font-medium mb-2">
                  What {measurement || "unit"} are you ending at?
                </label>
                <input
                  type="number"
                  id="pageEnd"
                  value={pageEnd}
                  onChange={(e) => setPageEnd(e.target.value)}
                  step="0.01"
                  min={measurement === "percent" ? "0" : undefined}
                  max={measurement === "percent" ? "100" : undefined}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label htmlFor="minutes" className="block text-sm font-medium mb-2">
                  How many minutes do you have to read?
                </label>
                <input
                  type="number"
                  id="minutes"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
            </>
          )}

          {mode === "PACE" && (
            <>
              <div>
                <label htmlFor="pace" className="block text-sm font-medium mb-2">
                  How many {measurement || "units"}s per minute?
                </label>
                <input
                  type="number"
                  id="pace"
                  value={pace}
                  onChange={(e) => setPace(e.target.value)}
                  placeholder={DEFAULT_PACE.toString()}
                  step="0.1"
                  min={measurement === "percent" ? "0" : undefined}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label htmlFor="minutes" className="block text-sm font-medium mb-2">
                  How long are you going to read? (minutes)
                </label>
                <input
                  type="number"
                  id="minutes"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
            </>
          )}

          {mode === "CLASSIC" && pageEnd && pageStart && minutes && (
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <p className="text-sm">
                Pace: {((parseFloat(pageEnd) - parseFloat(pageStart) + 1) / parseFloat(minutes)).toFixed(2)}{" "}
                {measurement || "units"} per minute
              </p>
            </div>
          )}

          {mode === "PACE" && pace && minutes && (
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <p className="text-sm">
                You will read {Math.round(parseFloat(pace) * parseFloat(minutes))} {measurement || "units"}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg"
          >
            Start Reading
          </button>
        </form>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link href="/" className="text-blue-600 dark:text-blue-400 underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

