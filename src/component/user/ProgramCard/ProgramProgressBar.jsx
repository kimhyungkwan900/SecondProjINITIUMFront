import { Progress } from "reactstrap";

export default function ProgramProgressBar({ current, max }) {
    const percent = Math.round((current / max) * 100);

    return (
        <div className="w-full">
            <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-500 font-semibold">
                    참여인원
                </span>
                <span className="text-xs text-gray-700 font-bold">
                    {current}/{max}
                </span>
            </div>
            <Progress value={percent} color="info" style={{ height: "8px" }} />
        </div>
    );
}