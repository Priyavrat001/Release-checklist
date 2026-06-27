import React from "react";
import { Link } from "react-router-dom";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });

export default function ReleaseItem({ release }) {
  return (
    <tr className="border-b last:border-b-0 hover:bg-slate-50 transition-colors">
      <td className="px-4 py-4 text-sm font-medium text-slate-900">{release.name}</td>
      <td className="px-4 py-4 text-sm text-slate-500">{formatDate(release.dueDate)}</td>
      <td className="px-4 py-4 text-sm">
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
      </td>
      <td className="px-4 py-4 text-right">
        <Link
          to={`/release/${release.id}`}
          className="text-violet-600 font-semibold transition hover:text-violet-700"
        >
          View
        </Link>
      </td>
    </tr>
  );
}
