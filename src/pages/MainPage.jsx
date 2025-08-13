import LinkedButton from "../component/common/LinkedButton";
import UserTopBar from "../component/user/mainpage/UserTopBar";
import MainHeader from "../features/user/mainpage/MainHeader";
import ProgramCard from "../features/user/programs/ProgramCard";
import ProgramCategorySliderSection from "../features/user/programs/ProgramCategorySliderSection";

export default function MainPage() {

    return (
        <div className="min-h-screen bg-[#f6f9fc] flex flex-col items-center">
            <UserTopBar />
            <MainHeader />
            <main className="w-full max-w-5xl px-4">
                <section className="my-12">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">추천 비교과 프로그램</h2>
                    <ProgramCategorySliderSection />
                </section>
            </main>
        </div>
    );
}