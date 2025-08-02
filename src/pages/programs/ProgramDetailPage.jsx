import { useParams } from "react-router-dom";

export default function ProgramDetailPage() {
    const { id } = useParams();
    return (
        <div>
            <h1>비교과 프로그램 상세: {id}</h1>
        </div>
    );
}