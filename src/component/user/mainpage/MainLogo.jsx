import { Link } from "react-router-dom";

export default function MainLogo({ logoSrc = "", alt = "메인로고" }) {
    return (
        <Link to="/" className="flex items-center gap-2">
            <img src={logoSrc} alt={alt} className="w-32 h-auto" />
        </Link>
    );
}