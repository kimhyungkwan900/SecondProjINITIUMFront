import { Link } from "react-router-dom";

export default function LinkedButton({ to, children, variant = "default", ...rest }) {
    const base = "px-3 py-1 rounded text-sm font-semibold transition no-underline";
    const styles = {
        default: base + " bg-transparent text-[#222E8D] hover:text-[#28B8B2]",
        primary: base + " bg-[#222E8D] text-white hover:bg-[#28B8B2]",
        danger: base + " bg-red-500 text-white hover:bg-red-700",
    };
    return (
        <Link to={to} className={styles[variant] || styles.default} {...rest}>
            {children}
        </Link>
    );
}