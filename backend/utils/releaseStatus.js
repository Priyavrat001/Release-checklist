const getReleaseStatus = (steps)=> {
  const total = steps.length;
  const completed = steps.filter(s => s.completed).length;

  if (completed === 0) return "planned";
  if (completed === total) return "done";
  return "ongoing";
};

export {
    getReleaseStatus,
}