import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const CoreCompetencyShowcase = () => {
  const [data, setData] = useState([]);
  const [openIdx, setOpenIdx] = useState(0);
  const [q, setQ] = useState("");

  useEffect(() => {
    axios
      .get("/api/user/ideal-talent-profile/tree", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => (Array.isArray(res.data) ? setData(res.data) : setData([])))
      .catch(console.error);
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return data;
    const keyword = q.trim().toLowerCase();
    const hit = (s) => String(s || "").toLowerCase().includes(keyword);
    return data
      .map((it) => ({
        ...it,
        coreCompetencyCategories: (it.coreCompetencyCategories || [])
          .map((c) => ({
            ...c,
            subCompetencyCategories: (c.subCompetencyCategories || []).filter(
              (s) => hit(s.subName) || hit(s.subDefinition)
            ),
          }))
          .filter(
            (c) =>
              hit(c.coreName) ||
              hit(c.coreDefinition) ||
              (c.subCompetencyCategories || []).length > 0
          ),
      }))
      .filter(
        (it) => hit(it.idealTalent) || (it.coreCompetencyCategories || []).length > 0
      );
  }, [data, q]);

  return (
    <div className="space-y-6 w-full max-w-screen-xl mx-auto">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">💡 핵심역량 맵</h2>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="역량/정의/하위역량 검색"
          className="w-full sm:w-80 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-5">
        {filtered.map((item, idx) => {
          const opened = openIdx === idx;
          return (
            <section
              key={idx}
              className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(opened ? -1 : idx)}
                className={`flex w-full items-center justify-between rounded-2xl px-6 py-5 transition
                           ${opened ? "bg-gray-50" : "hover:bg-gray-50"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-block h-5 w-1.5 rounded-full bg-blue-500" />
                  <span className="text-xl font-semibold">{item.idealTalent}</span>
                </div>
                <span className={`text-gray-500 transition-transform ${opened ? "rotate-180" : ""}`}>▾</span>
              </button>

              {opened && (
                <div className="px-6 pb-6">
                  <div className="grid gap-6">
                    {(item.coreCompetencyCategories || []).map((core, j) => (
                      <article
                        key={j}
                        className="w-full h-full rounded-2xl border border-gray-200 p-6 shadow-sm transition hover:shadow-md flex flex-col"
                      >
                        <header className="mb-4">
                          <h3 className="text-lg font-bold">{core.coreName}</h3>
                          <p className="mt-2 text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                            {core.coreDefinition}
                          </p>
                        </header>

                        <div className="mt-auto space-y-2">
                          {(core.subCompetencyCategories || []).map((sub, k) => (
                            <details
                              key={k}
                              className="group w-full overflow-hidden rounded-xl border border-gray-200 open:border-blue-300 open:bg-blue-50/40"
                            >
                              <summary className="w-full flex items-center justify-between cursor-pointer list-none px-3 py-2 text-sm font-medium rounded-xl bg-white group-open:bg-blue-50/60">
                                <span className="truncate">{sub.subName}</span>
                                <span className="text-gray-500 transition-transform group-open:rotate-180">▾</span>
                              </summary>
                              <div className="px-3 pb-3 pt-1 text-sm text-gray-700 leading-relaxed">
                                {sub.subDefinition}
                              </div>
                            </details>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}

        {filtered.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-600">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default CoreCompetencyShowcase;
