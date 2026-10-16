// src/components/sections/about/SkillsSection.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills } from "../../../redux/slices/skillSlice";
import LoadingSpinner from "../../common/LoadingSpinner";

const SkillsSection = () => {
  const dispatch = useDispatch();
  const { skills, loading } = useSelector((state) => state.skills);
  const [activeCategory, setActiveCategory] = useState("All");

  // ✅ Load skills from Redux
  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const categories = ["All", ...new Set(skills.map((s) => s.category).filter(Boolean))];
  const filteredSkills = activeCategory === "All"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-slate-50 py-14 transition-colors dark:bg-slate-950 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-2xl shadow-slate-900/5 transition-colors dark:border-white/10 dark:bg-[#101a35] dark:shadow-slate-950/20 sm:px-10 sm:py-14 lg:px-14">
          <div className="pointer-events-none absolute -left-28 -top-32 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/15" />
          <div className="pointer-events-none absolute -bottom-40 right-1/4 h-80 w-80 rounded-full bg-fuchsia-400/10 blur-3xl dark:bg-fuchsia-500/10" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#64748b_0.7px,transparent_0.7px)] [background-size:18px_18px] dark:opacity-[0.08] dark:[background-image:radial-gradient(#cbd5e1_0.7px,transparent_0.7px)]" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[0.72fr_1.5fr] lg:gap-8">
            <header className="text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-300">
                A little about what I do
              </span>
              <h2 className="mt-5 text-5xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Skills
                <span className="mt-2 block text-blue-600 dark:text-blue-300">for</span>
                <span className="mt-2 block text-slate-900 dark:text-white">Web</span>
                <span className="mt-2 block text-slate-900 dark:text-white">Developers</span>
              </h2>
              <p className="mx-auto mt-6 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300 lg:mx-0">
                The tools and technologies I use to build engaging, responsive web experiences.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
                {categories.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      aria-pressed={isActive}
                      className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${
                        isActive
                          ? "border-blue-300 bg-blue-300 text-[#101a35]"
                          : "border-slate-200 bg-white/80 text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/40 dark:hover:bg-white/10"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </header>

            {filteredSkills.length === 0 ? (
              <div className="py-12 text-center text-slate-300">
                No skills to show yet. Add skills in the admin panel.
              </div>
            ) : (
              <div className="relative">
                <div className="relative mx-auto flex min-h-[250px] max-w-3xl flex-col items-center justify-center gap-8 sm:min-h-[320px] lg:min-h-[400px]">
                  <svg
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    {filteredSkills.map((skill, index) => {
                      const rowY = ((index + 0.5) / filteredSkills.length) * 100;
                      const accent = skill.color || "#60a5fa";
                      return (
                        <g key={skill.id}>
                          <path
                            d={`M 21 50 Q 27 50 32 ${rowY} L 38 ${rowY}`}
                            fill="none"
                            stroke={accent}
                            strokeOpacity="0.48"
                            strokeWidth="0.45"
                            vectorEffect="non-scaling-stroke"
                          />
                          <circle
                            cx="32"
                            cy={rowY}
                            r="0.75"
                            fill={accent}
                            vectorEffect="non-scaling-stroke"
                          />
                        </g>
                      );
                    })}
                  </svg>

                  <div className="absolute left-0 top-1/2 z-10 flex h-28 w-28 -translate-y-1/2 items-center justify-center rounded-full border border-blue-200 bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-1 shadow-[0_0_55px_rgba(96,165,250,0.20)] transition-colors dark:border-white/20 dark:from-white dark:via-slate-100 dark:to-blue-100 dark:shadow-[0_0_55px_rgba(96,165,250,0.26)] sm:left-2 sm:h-36 sm:w-36 lg:left-5 lg:h-40 lg:w-40">
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-slate-300/80 bg-[#f8fafc] px-2 text-center dark:border-slate-700 dark:bg-slate-800">
                      <span className="mb-1 h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
                      <span className="text-xs font-extrabold leading-tight text-[#14203b] dark:text-white sm:text-sm">
                        Web
                        <br />
                        Developer
                      </span>
                      <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 sm:text-[9px]">
                        Creative · Code
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 ml-[34%] flex w-[66%] flex-col gap-3 sm:gap-4">
                    {filteredSkills.map((skill, index) => {
                      const colors = [
                        ["#facc15", "#f97316"],
                        ["#fb7185", "#d946ef"],
                        ["#2dd4bf", "#0ea5e9"],
                        ["#a3e635", "#22c55e"],
                        ["#60a5fa", "#6366f1"],
                      ];
                      const colorPair = colors[index % colors.length];
                      const level = Math.min(100, Math.max(0, Number(skill.level) || 0));

                      return (
                        <article
                          key={skill.id}
                          className="group relative flex min-h-[52px] items-center gap-2 overflow-hidden border border-white/15 px-2.5 py-2 shadow-lg transition duration-300 hover:translate-x-1 hover:shadow-xl sm:min-h-[58px] sm:gap-4 sm:px-4"
                          style={{
                            background: `linear-gradient(105deg, ${colorPair[0]}, ${colorPair[1]})`,
                            clipPath: "polygon(0 0, 94% 0, 100% 50%, 94% 100%, 0 100%, 4% 50%)",
                          }}
                        >
                          <span
                            className="ml-1 flex h-8 w-8 shrink-0 rotate-45 items-center justify-center border border-white/70 bg-slate-950/15 shadow-sm sm:ml-2 sm:h-9 sm:w-9"
                            aria-hidden="true"
                          >
                            <span className="-rotate-45 text-[10px] font-black text-white drop-shadow sm:text-xs">
                              {level}%
                            </span>
                          </span>
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-[11px] font-black uppercase tracking-wide text-white drop-shadow-sm sm:text-sm sm:tracking-wider">
                              {skill.name}
                            </h3>
                            <p className="mt-0.5 truncate text-[9px] font-semibold text-white/80 sm:text-[10px]">
                              {skill.category || "Frontend"}
                            </p>
                          </div>
                          <span className="mr-2 hidden rounded-full bg-slate-950/15 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white/90 sm:inline">
                            Skill {String(index + 1).padStart(2, "0")}
                          </span>
                        </article>
                      );
                    })}
                  </div>
                </div>
                <p className="mt-5 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {filteredSkills.length} technologies in my toolkit
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;