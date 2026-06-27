import React from "react";

export default function StepChecklist({ steps, onToggle }) {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <button
          key={step.name}
          type="button"
          onClick={() => onToggle(index)}
          className="flex w-full items-center rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-left transition hover:border-violet-300"
        >
          <span
            className={`mr-4 flex h-10 w-10 items-center justify-center rounded-2xl ${
              step.completed ? "bg-violet-600 text-white" : "bg-slate-200 text-slate-600"
            }`}
          >
            {step.completed ? "✓" : "○"}
          </span>
          <div>
            <p className={`font-medium ${step.completed ? "text-slate-900" : "text-slate-700"}`}>{step.name}</p>
            <p className="text-xs text-slate-500">{step.completed ? "Completed" : "Pending"}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
