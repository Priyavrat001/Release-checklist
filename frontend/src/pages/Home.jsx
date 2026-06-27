import React, { useEffect, useState } from "react";
import ReleaseForm from "../components/ReleaseForm";
import ReleaseList from "../components/ReleaseList";
import { getReleases } from "../api.js";

export default function Home() {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadReleases = async () => {
    try {
      setLoading(true);
      const response = await getReleases();
      setReleases(response.data);
      setError(null);
    } catch (err) {
      setError("Unable to load releases. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReleases();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[40px] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="inline-flex rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
                Release checklist
              </div>
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  Build and track release progress in one clean workspace.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                  Create a release, update steps, and manage notes with a simple and responsive interface.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Releases</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{releases.length}</p>
                </article>
                <article className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Status</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{releases.some((release) => release.status === "ongoing") ? "Live" : "Idle"}</p>
                </article>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold text-slate-900">Quick start</p>
                <h2 className="mt-3 text-xl font-semibold text-slate-900">Add a release and start ticking steps.</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Your release steps are fixed for every release, and progress updates are computed automatically.
                </p>
              </div>
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Status guide</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  <li className="rounded-3xl bg-slate-50 p-3">No completed step → planned</li>
                  <li className="rounded-3xl bg-slate-50 p-3">Some completed steps → ongoing</li>
                  <li className="rounded-3xl bg-slate-50 p-3">All steps completed → done</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[0.75fr_1.25fr]">
          <ReleaseForm onCreated={(release) => setReleases((prev) => [release, ...prev])} />
          <div className="space-y-6">
            {error ? (
              <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>
            ) : null}
            <ReleaseList releases={releases} loading={loading} onRefresh={loadReleases} />
          </div>
        </div>
      </div>
    </div>
  );
}
