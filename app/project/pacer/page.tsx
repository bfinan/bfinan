"use client";

import React, { useState, useEffect, useRef } from "react";

type Mode = "CLASSIC" | "PACE";

const DEFAULT_READ = "";
const DEFAULT_MEASUREMENT = "page";
const DEFAULT_START = "13";
const DEFAULT_MODE: Mode = "CLASSIC";
const DEFAULT_PACE = 1.5;

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
  }, []);

  // Beep function using Web Audio API
  const beep = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
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
      console.error("Error playing beep:", error);
    }
  };

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
          beep();
          setTimeout(() => beep(), 300);
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
  }, [isRunning, startTime, minutes, pageStart, calculatedPace]);

  // Beep timer (beeps every minute, but not at the start)
  useEffect(() => {
    if (isRunning && currentMinute > 0 && currentSeconds === 0 && currentMinute < parseInt(minutes)) {
      beep();
    }
  }, [currentMinute, isRunning, minutes]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();

    const start = parseFloat(pageStart);
    let calculatedPaceValue = 0;
    let calculatedEnd = 0;

    if (mode === "CLASSIC") {
      const end = parseFloat(pageEnd);
      const totalPages = end - start + 1;
      const mins = parseInt(minutes);
      calculatedPaceValue = totalPages / mins;
      calculatedEnd = end;
    } else if (mode === "PACE") {
      const paceValue = parseFloat(pace);
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
    // Restart the form
    window.location.reload();
  };

  if (isRunning || isComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-3xl sm:text-4xl mb-6">Reading {book}</h1>
          
          <div className="mb-8">
            <p className="text-xl mb-2">
              {pageStart} - {Math.round(calculatedPageEnd)} {measurement}s
            </p>
            <p className="text-2xl font-bold mb-4">
              Now reading {measurement} {Math.round(currentLocation)}
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
                  Read {book} from {measurement} {pageStart} to {measurement} {Math.round(calculatedPageEnd)} in {minutes} minutes
                </p>
                <p className="mt-2">
                  Your pace was {Math.round(calculatedPace)} {measurement}s per minute
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
              <option value="unit">unit</option>
            </select>
          </div>

          <div>
            <label htmlFor="mode" className="block text-sm font-medium mb-2">
              Select mode
            </label>
            <select
              id="mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as Mode)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="CLASSIC">CLASSIC</option>
              <option value="PACE">PACE</option>
            </select>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {mode === "CLASSIC"
                ? `Enter starting ${measurement || "unit"}, ending ${measurement || "unit"}, and how long you want to read. The pace will be calculated`
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
      </div>
    </div>
  );
}

