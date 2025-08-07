import { useState } from "react";
import { Link } from "react-router-dom";

export default function SidebarMenuItem({ item, level = 0 }) {
    const [open, setOpen] = useState(false);
    const hasChildren = !!item.children;

    const padding = 16 + level * 18;

    const style = {
        paddingLeft: `${padding}px`,
        fontWeight: level === 0 ? 700 : 400,
    };

    const className = `
        flex items-center rounded-lg cursor-pointer
        transition-colors
        text-[#222E8D]
        font-medium
        hover:bg-[#e3e7ee]
    `;

    if (hasChildren) {
        return (
            <div>
                <div
                    className={`${className} ${open ? "bg-white" : ""}`}
                    style={style}
                    onClick={() => setOpen(o => !o)}
                >
                    <span className="mr-2 text-base">{open ? "▼" : "▶"}</span>
                    {item.label}
                </div>
                {open && (
                    <div>
                        {item.children.map(child => (
                            <SidebarMenuItem
                                key={child.label}
                                item={child}
                                level={level + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link to={item.to || "#"}>
            <div className={className} style={style}>
                {item.label}
            </div>
        </Link>
    );
}