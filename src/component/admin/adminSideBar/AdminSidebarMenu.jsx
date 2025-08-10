import SidebarMenuItem from "./AdminSidebarMenuItem";

const normalize = (s = "") => s.toLowerCase().trim();

export default function AdminSidebarMenu({
  menuList = [],
  filter = "",
  onNavigate,
  wipStrategy = "heading", // 'heading' | 'hide' (기본: heading = 비활성 표시)
}) {
  const q = normalize(filter);

  // children도 to도 없으면 WIP 처리
  const mapWip = (item) => {
    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
    if (item.to || hasChildren) return item;

    if (wipStrategy === "hide") return null;
    // heading: 클릭 불가, 중립 색상(청록 X)
    return { ...item, __wip: "heading" };
  };

  const resolved = menuList.map(mapWip).filter(Boolean);

  const filtered = q
    ? resolved
      .map((it) => {
        const selfMatch = normalize(it.label).includes(q);
        const children = it.children
          ? it.children.filter((c) => normalize(c.label).includes(q))
          : undefined;
        const anyChild = children && children.length > 0;
        if (selfMatch || anyChild) return { ...it, children };
        return null;
      })
      .filter(Boolean)
    : resolved;

  return (
    <nav role="navigation" aria-label="사이드바 항목">
      {filtered.map((item) => (
        <SidebarMenuItem
          key={item.label}
          item={item}
          level={0}
          filter={q}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}