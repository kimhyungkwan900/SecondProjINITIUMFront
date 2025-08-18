import { useEffect, useState } from "react";
import ProgramCard from "./ProgramCard";
import { filterProgramList } from "../../../api/user/extracurricular/UserProgramApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { formatDate } from "../../../utils/dateUtils";

const baseUrl = "http://localhost:8080";

const buildImageUrl = (program) => {
    const img = program?.extracurricularImageDTO?.[0];
    if (!img) return "/default-image.png";

    const raw =
        img.imgFilePathNm || img.saveFileNm || img.fileName || img.savedName || "";
    const file = String(raw).split(/[\\/]/).pop();
    if (!file) return "/default-image.png";

    return new URL(`/images/${file}`, baseUrl).href;
};

export default function ProgramCategorySliderSection() {
    const [programsByCategory, setProgramsByCategory] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const { content = [] } = await filterProgramList({ size: 100 });

                // 카테고리별 그룹핑
                const grouped = content.reduce((acc, p) => {
                    const key = p.ctgryNm || "기타";
                    (acc[key] ||= []).push(p);
                    return acc;
                }, {});
                setProgramsByCategory(grouped);
            } catch (err) {
                console.error("프로그램을 불러오는 중 오류:", err);
                setProgramsByCategory({});
            }
        })();
    }, []);

    const hasData = Object.keys(programsByCategory).length > 0;

    return (
        <div className="w-full">
            {!hasData ? (
                <div className="text-center text-gray-400 py-10">
                    불러올 프로그램이 없습니다.
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {Object.entries(programsByCategory).map(([category, programs]) => {
                        const useGrid = programs.length <= 3;
                        return (
                            <section
                                key={category}
                                className="rounded-2xl border border-gray-100 shadow-sm p-4"
                            >
                                <header className="text-lg font-bold mb-3 flex items-center">
                                    <span className="text-[#222E8D] text-xl mr-2">▸</span>
                                    <span>{category}</span>
                                </header>

                                {useGrid ? (
                                    <ul className="flex gap-6 overflow-x-auto pb-4">
                                        {programs.map((program) => (
                                            <li key={program.eduMngId} className="h-full">
                                                <ProgramCard
                                                    id={program.eduMngId}
                                                    title={program.eduNm}
                                                    imageUrl={buildImageUrl(program)}
                                                    mileage={program.eduMlg}
                                                    category={program.ctgryNm}
                                                    description={program.eduDtlCn}
                                                    applicationPeriod={`${formatDate(
                                                        program.eduAplyBgngDt
                                                    )} ~ ${formatDate(program.eduAplyEndDt)}`}
                                                    operatingPeriod={`${formatDate(
                                                        program.eduBgngYmd
                                                    )} ~ ${formatDate(program.eduEndYmd)}`}
                                                    accept={program.accept}
                                                    capacity={program.eduPtcpNope}
                                                    pick={program.eduSlctnType === "FIRSTCOME" ? "선착순" : "선발식"}
                                                    tag={program.eduType === "TEAM" ? "팀 프로그램" : "개인 프로그램"}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <Swiper
                                        modules={[Navigation, Pagination, A11y]}
                                        spaceBetween={24}
                                        slidesPerView={3}
                                        navigation
                                        pagination={{ clickable: true }}
                                        breakpoints={{
                                            0: { slidesPerView: 1 },
                                            640: { slidesPerView: 1 },
                                            768: { slidesPerView: 2 },
                                            1024: { slidesPerView: 2 },
                                        }}
                                        className="!px-1"
                                    >
                                        {programs.map((program) => (
                                            <SwiperSlide key={program.eduMngId} className="!h-auto">
                                                <div className="h-full">
                                                    <ProgramCard
                                                        id={program.eduMngId}
                                                        title={program.eduNm}
                                                        imageUrl={buildImageUrl(program)}
                                                        mileage={program.eduMlg}
                                                        category={program.ctgryNm}
                                                        description={program.eduDtlCn}
                                                        applicationPeriod={`${formatDate(
                                                            program.eduAplyBgngDt
                                                        )} ~ ${formatDate(program.eduAplyEndDt)}`}
                                                        operatingPeriod={`${formatDate(
                                                            program.eduBgngYmd
                                                        )} ~ ${formatDate(program.eduEndYmd)}`}
                                                        accept={program.accept}
                                                        capacity={program.eduPtcpNope}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                )}
                            </section>
                        );
                    })}
                </div>
            )}
        </div>
    );

}