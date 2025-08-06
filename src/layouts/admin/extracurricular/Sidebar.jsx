import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null)

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu)
  }

  const menuVariants = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white text-gray-800 border-r border-gray-300 shadow z-50 overflow-y-auto">
      
      <div className="p-6 text-xl font-bold border-b border-gray-200 text-center">
        INITIUM 관리자
      </div>

      <nav className="p-4 space-y-2">
        {/* 분류 체계 */}
        <div>
          <button
            onClick={() => toggleMenu('category')}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 transition font-bold"
          >
            분류 체계
          </button>
          <AnimatePresence>
            {openMenu === 'category' && (
              <motion.div
                className="pl-6 space-y-1 text-sm overflow-hidden"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={menuVariants}
                transition={{ duration: 0.2 }}
              >
                <Link to="/admin/extracurricular/category" className="block px-2 py-1 rounded hover:bg-gray-100 no-underline font-bold">프로그램 분류 관리</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 비교과 프로그램 */}
        <div>
          <button
            onClick={() => toggleMenu('programs')}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 transition font-bold"
          >
            프로그램 관리
          </button>
          <AnimatePresence>
            {openMenu === 'programs' && (
              <motion.div
                className="pl-6 space-y-1 text-sm overflow-hidden"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={menuVariants}
                transition={{ duration: 0.2 }}
              >
                <Link to="/admin/extracurricular/program/aplication" className="block px-2 py-1 rounded hover:bg-gray-100 no-underline font-bold">프로그램 등록 요청</Link>
                <Link to="/admin/extracurricular/program/request" className="block px-2 py-1 rounded hover:bg-gray-100 no-underline font-bold">프로그램 등록 관리</Link>
                <Link to="/admin/extracurricular/program/apply" className="block px-2 py-1 rounded hover:bg-gray-100 no-underline font-bold">프로그램 수강 신청 관리</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

{/* 진단검사 관리 */}
        <div>
          <button
            onClick={() => toggleMenu('diagnosis')}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 transition font-bold"
          >
            진단검사 관리
          </button>
          <AnimatePresence>
            {openMenu === 'diagnosis' && (
              <motion.div
                className="pl-6 space-y-1 text-sm overflow-hidden"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={menuVariants}
                transition={{ duration: 0.2 }}
              >
                <Link to="/admin/diagnosis/dashboard" className="block px-2 py-1 rounded hover:bg-gray-100 no-underline font-bold">
                  대시보드
                </Link>
                <Link to="/admin/diagnosis/create" className="block px-2 py-1 rounded hover:bg-gray-100 no-underline font-bold">
                  검사 등록
                </Link>
                <Link to="/admin/diagnosis/list" className="block px-2 py-1 rounded hover:bg-gray-100 no-underline font-bold">
                  검사 조회 및 삭제
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 목록 */}
        <div>
          <button
            onClick={() => toggleMenu('survey')}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 transition font-bold"
          >
            목록
          </button>
          <AnimatePresence>
            {openMenu === 'survey' && (
              <motion.div
                className="pl-6 space-y-1 text-sm overflow-hidden"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={menuVariants}
                transition={{ duration: 0.2 }}
              >
                <Link to="/admin" className="block px-2 py-1 rounded hover:bg-gray-100 no-underline font-bold">분류 1</Link>
                <Link to="/admin" className="block px-2 py-1 rounded hover:bg-gray-100 no-underline font-bold">분류 2</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar