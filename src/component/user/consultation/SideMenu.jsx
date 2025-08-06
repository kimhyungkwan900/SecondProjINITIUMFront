const SideMenu = ({a1, a2})=>{
    return(
        <div className="flex flex-col fixed shadow border-2 border-[#222E8D] z-[1] top-[230px] left-[25px] w-[200px] bg-[white] overflow-x-hidden py-2 font-bold text-center justify-center">
            <a href="#about" className="block px-[8px] py-[15px] text-[18px] text-[#222E8D] no-underline hover:text-[#28B8B2]">{a1}</a>
            <a href="#services" className="block px-[8px] py-[15px] text-[18px] text-[#222E8D] no-underline hover:text-[#28B8B2]">{a2}</a>
        </div>
    );
}
export default SideMenu;