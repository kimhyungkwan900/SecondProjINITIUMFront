import LinkedButton from "../../common/LinkedButton";

export default function NavMenuHorizontalDropdown({ submenu = [], visible }) {
    if (!visible) return null;
    return (
        <div
            className="absolute left-1/2 top-full -translate-x-1/2 bg-white border rounded-lg shadow-lg flex flex-row px-4 py-2 z-50"
            style={{ minWidth: "max-content" }}
        >
            {submenu.map((item, i) => (
                <LinkedButton
                    key={i}
                    to={item.to}
                    className="px-4 py-2 hover:bg-gray-100 rounded whitespace-nowrap transition no-underline"
                >
                    {item.label}
                </LinkedButton>
            ))}
        </div>
    );
}