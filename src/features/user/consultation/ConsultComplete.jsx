import { Link } from 'react-router-dom';
import LinkedButton from '../../../component/common/LinkedButton';

const ConsultComplete = ()=>{
    return(
        <div className="w-4/5 px-20 py-6 mx-auto">
            <div className="flex items-center justify-center mb-8 space-x-0">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">
                        1
                    </div>
                    <div className="mt-2 text-sm ">상담일정 선택</div>
                </div>
                <div className="h-1 flex-1 max-w-20 bg-gray-300"></div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">
                        2
                    </div>
                    <div className="mt-2 text-sm">신청서 작성</div>
                </div>
                <div className="h-1 flex-1 max-w-20 bg-gray-300"></div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center">
                        3
                    </div>
                    <div className="mt-2 text-sm font-bold">신청 완료</div>
                </div>
            </div>
            <div className="h-full flex flex-col items-center justify-center border-3 border-indigo-950 p-8 space-y-6">
                <p class="text-lg text-gray-700">신청이 정상적으로 완료되었습니다.</p>
                {/* <Link
                    to="/"
                    role="button"
                    className="bg-blue-700 hover:bg-blue-800 text-white no-underline px-6 py-2 rounded"
                >
                    홈으로
                </Link> */}
                <LinkedButton to="/" variant="primary">
                    홈으로
                </LinkedButton>
            </div>
        </div>
    );
}
export default ConsultComplete