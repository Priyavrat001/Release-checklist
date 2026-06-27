import React from "react";
import ReleaseItem from "./ReleaseItem";
import { Link } from "react-router-dom";

export default function ReleaseList({ releases, loading, onRefresh }) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">All releases</h2>
          <p className="mt-1 text-sm text-slate-500">Browse releases and open a checklist to update progress.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onRefresh}
            className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:bg-violet-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
          <Link
            to="/"
            className="rounded-3xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Home
          </Link>
        </div>
      </div>

      <div className="p-6">
        {releases.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
            No release found. Create a new release to get started.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="hidden md:block">
              <table className="min-w-full table-auto text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Release</th>
                    <th className="px-4 py-3">Due date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  {releases.map((release) => (
                    <ReleaseItem key={release.id} release={release} />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 md:hidden">
              {releases.map((release) => (
                <div key={release.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-semibold text-slate-900">{release.name}</p>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          release.status === "done"
                            ? "bg-emerald-100 text-emerald-700"
                            : release.status === "ongoing"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {release.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{new Date(release.dueDate).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</p>
                    <Link
                      to={`/release/${release.id}`}
                      className="inline-flex w-full items-center justify-center rounded-3xl bg-violet-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
                    >
                      Open checklist
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
