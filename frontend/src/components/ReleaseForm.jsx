import React, { useState } from "react";
import { createRelease } from "../api.js";

export default function ReleaseForm({ onCreated }) {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !dueDate) {
      setFeedback({ type: "error", message: "Name and due date are required." });
      return;
    }

    try {
      setSaving(true);
      const response = await createRelease({
        name: name.trim(),
        dueDate,
        additionalInfo: additionalInfo.trim() || null,
      });

      setName("");
      setDueDate("");
      setAdditionalInfo("");
      setFeedback({ type: "success", message: "Release created successfully." });
      onCreated?.(response.data);
    } catch (error) {
      setFeedback({ type: "error", message: "Unable to create release. Try again later." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600">New release</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900">Create release</h2>
        <p className="mt-2 text-sm text-slate-500">Add a release name, due date, and optional details.</p>
      </div>

      {feedback ? (
        <div
          className={`mb-5 rounded-3xl px-4 py-3 text-sm ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {feedback.message}
        </div>
      ) : null}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Release name</label>
          <input
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Version 1.0.0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Due date</label>
          <input
            type="datetime-local"
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Additional information</label>
          <textarea
            rows="5"
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="Release notes, tickets, or deployment details"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex w-full cursor-pointer items-center justify-center rounded-3xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
        >
          {saving ? "Creating release..." : "Create release"}
        </button>
      </form>
    </section>
  );
}
