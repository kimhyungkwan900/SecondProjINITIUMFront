import { useEffect, useState } from "react";
import ProgramCard from "./ProgramCard";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

export default function ProgramCategorySliderSection() {
    const [programsByCategory, setProgramsByCategory] = useState({});

    useEffect(() => {
        // 호출주소 입력
        axios.get("프로그램 목록전체 조회")
            .then(res => {
                const byCategory = {};
                res.data.forEach(program => {
                    const category = program.category || "기타";
                    if (!byCategory[category]) byCategory[category] = [];
                    byCategory[category].push(program);
                });
                setProgramsByCategory(byCategory);
            })
            .catch(err => {
                console.error("프로그램을 불러오는 중 오류가 발생했습니다:", err);
                setProgramsByCategory({});
            });
    }, []);

    // 카테고리별 렌더링
    return (
        <div className="w-full">
            {Object.keys(programsByCategory).length === 0 ? (
                <div className="text-center text-gray-400 py-10">불러올 프로그램이 없습니다.</div>
            ) : (
                Object.entries(programsByCategory).map(([category, programs]) => (
                    <div key={category} className="mb-12">
                        <div className="text-lg font-bold mb-3 flex items-center">
                            <span className="text-[#222E8D] text-xl mr-2">▸</span>
                            <span>{category}</span>
                        </div>
                        {/* 슬라이드 */}
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={3}
                            navigation
                            pagination={{ clickable: true }}
                            className="!px-2"
                        >
                            {programs.map(program => (
                                <SwiperSlide key={program.id}>
                                    <ProgramCard {...program} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ))
            )}
        </div>
    );
}