import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function SidebarMenuItem({ item, level = 0, filter = "", onNavigate }) {
    const { pathname } = useLocation();
    const hasChildren = Array.isArray(item.children) && item.children.length > 0;

    const indent = 16 + level * 18;
    const baseItem =
        "flex items-center rounded-md cursor-pointer transition-colors text-[#222E8D] hover:bg-[#e3e7ee] text-sm md:text-base";

    const hasActiveDescendant = useMemo(() => {
        if (!hasChildren) return false;
        const stack = [...item.children];
        while (stack.length) {
            const n = stack.pop();
            if (!n) continue;
            if (n.to && pathname.startsWith(n.to)) return true;
            if (n.children) stack.push(...n.children);
        }
        return false;
    }, [hasChildren, item.children, pathname]);

    const initialOpen = useMemo(() => (!!filter || hasActiveDescendant), [filter, hasActiveDescendant]);
    const [open, setOpen] = useState(initialOpen);

    useEffect(() => {
        setOpen(!!filter || hasActiveDescendant);
    }, [filter, hasActiveDescendant]);

    const toggleOpen = useCallback(() => setOpen((o) => !o), []);
    const onKeyToggle = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleOpen();
        }
    };

    if (hasChildren) {
        const sectionId = `sidebar-section-${item.label}-${level}`;
        return (
            <div>
                <div
                    className={baseItem}
                    style={{ paddingLeft: `${indent}px`, fontWeight: level === 0 ? 700 : 500 }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={open}
                    aria-controls={sectionId}
                    onClick={toggleOpen}
                    onKeyDown={onKeyToggle}
                >
                    <span className="mr-2 text-base">{open ? "▼" : "▶"}</span>
                    <span>{item.label}</span>
                </div>

                <div id={sectionId} className={`${open ? "block" : "hidden"}`}>
                    {item.children.map((child) => (
                        <SidebarMenuItem
                            key={child.label}
                            item={child}
                            level={level + 1}
                            filter={filter}
                            onNavigate={onNavigate}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <NavLink
            to={item.to || "#"}
            end={false}
            data-nav
            className={({ isActive }) =>
                `${baseItem} ${isActive ? "bg-grey-100 text-[#222E8D] font-semibold" : ""}`
            }
            style={{ paddingLeft: `${indent}px`, fontWeight: level === 0 ? 700 : 500 }}
            onClick={onNavigate}
        >
            {item.label}
        </NavLink>
    );
}