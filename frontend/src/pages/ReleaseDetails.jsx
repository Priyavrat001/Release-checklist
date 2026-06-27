import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReleaseById, toggleStep, updateReleaseInfo, deleteRelease } from "../api.js";
import StepChecklist from "../components/StepChecklist";

export default function ReleaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [release, setRelease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const loadRelease = async () => {
    try {
      setLoading(true);
      const response = await getReleaseById(id);
      setRelease(response.data);
      setAdditionalInfo(response.data.additionalInfo || "");
      setMessage(null);
    } catch (err) {
      setMessage({ type: "error", text: "Unable to load release. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRelease();
  }, [id]);

  const handleToggle = async (stepIndex) => {
    if (!release) return;
    try {
      const response = await toggleStep({ id, stepIndex });
      setRelease(response.data);
    } catch (err) {
      setMessage({ type: "error", text: "Unable to update step state." });
    }
  };

  const handleSaveInfo = async () => {
    try {
      setSaving(true);
      const response = await updateReleaseInfo(id, additionalInfo);
      setRelease((prev) => ({ ...prev, additionalInfo: response.data.additionalInfo }));
      setMessage({ type: "success", text: "Additional info saved." });
    } catch (err) {
      setMessage({ type: "error", text: "Unable to save additional info." });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRelease = async (releaseId) => {
    if (!window.confirm("Are you sure you want to delete this release? This action cannot be undone.")) {
      return;
    }
    try {
      await deleteRelease(releaseId);
      navigate("/");
    } catch (err) {
      setMessage({ type: "error", text: "Unable to delete release." });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center text-slate-600">Loading release details...</div>
      </div>
    );
  }

  if (!release) {
    return (
      <div className="min-h-screen bg-slate-100 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center text-slate-600">Unable to find this release.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600">Release details</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">{release.name}</h1>
            <p className="mt-2 text-sm text-slate-500">Due {new Date(release.dueDate).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</p>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
          >
            Back to releases
          </button>
          <button
            type="button"
            onClick={() => handleDeleteRelease(release.id)}
            className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
          >
            Delete release
          </button>
        </div>

        {message ? (
          <div className={`mb-6 rounded-3xl px-4 py-3 text-sm ${message.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
            {message.text}
          </div>
        ) : null}

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <p className="text-sm font-medium text-slate-500">Status</p>
                <p className="mt-2 text-xl font-semibold capitalize text-slate-900">{release.status}</p>
              </div>
              <div className="rounded-full bg-slate-50 px-4 py-2 text-sm text-slate-600">{release.steps.filter((step) => step.completed).length}/{release.steps.length} completed</div>
            </div>

            <div className="mt-8 space-y-4">
              <StepChecklist steps={release.steps} onToggle={handleToggle} />
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-xl font-semibold text-slate-900">Release information</h2>
              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="font-medium text-slate-800">Release name</p>
                  <p className="mt-2 text-slate-500">{release.name}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="font-medium text-slate-800">Due date</p>
                  <p className="mt-2 text-slate-500">{new Date(release.dueDate).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</p>
                </div>
              </div>
            </section>

            <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Additional info</h2>
                  <p className="mt-2 text-sm text-slate-500">Save notes and release context here.</p>
                </div>
              </div>
              <textarea
                rows="8"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="mt-6 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                placeholder="Enter release notes or deployment reminders"
              />
              <button
                type="button"
                onClick={handleSaveInfo}
                disabled={saving}
                className="mt-5 inline-flex w-full items-center justify-center rounded-3xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
              >
                {saving ? "Saving..." : "Save additional info"}
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
