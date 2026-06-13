import { Outlet } from "react-router-dom";

function AuthIllustration() {
  return (
    <div className="hidden md:flex w-1/2 items-center justify-center border-r border-[#eeeeee] bg-white">
      <div className="relative h-[260px] w-[330px]">
        <div className="absolute left-[55px] top-[48px] h-[130px] w-[92px] rounded-[6px] bg-[#fff3e9] shadow-sm">
          <div className="mx-auto mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff7a1a] text-white">
            👤
          </div>
          <div className="mx-auto mt-4 h-2 w-14 rounded bg-[#f2d6c2]"></div>
          <div className="mx-auto mt-2 h-2 w-10 rounded bg-[#f2d6c2]"></div>
          <div className="mx-auto mt-4 h-5 w-16 rounded bg-[#ff7a1a]"></div>
        </div>

        <div className="absolute left-[172px] top-[58px] flex h-14 w-14 items-center justify-center rounded-[8px] bg-[#ff7a1a] text-xl text-white">
          ✓
        </div>

        <div className="absolute bottom-[46px] left-[26px] h-[6px] w-[248px] rounded-full bg-[#bfc4c9]"></div>
        <div className="absolute bottom-[15px] left-[82px] h-[65px] w-[6px] bg-[#aeb4ba]"></div>
        <div className="absolute bottom-[15px] left-[245px] h-[65px] w-[6px] bg-[#aeb4ba]"></div>

        <div className="absolute bottom-[60px] left-[132px] h-[82px] w-[70px] rounded-t-[36px] bg-[#f2b77f]"></div>
        <div className="absolute bottom-[42px] left-[184px] h-[90px] w-[16px] -rotate-45 rounded-full bg-[#2f343c]"></div>
        <div className="absolute bottom-[30px] left-[158px] h-[110px] w-[16px] rotate-45 rounded-full bg-[#f2b77f]"></div>
        <div className="absolute bottom-[32px] left-[190px] h-[95px] w-[16px] rotate-[70deg] rounded-full bg-[#f2b77f]"></div>
        <div className="absolute bottom-[102px] left-[166px] h-[18px] w-[78px] -rotate-6 rounded-full bg-[#2f343c]"></div>
        <div className="absolute bottom-[135px] left-[150px] h-[34px] w-[34px] rounded-full bg-[#f2b77f]"></div>
        <div className="absolute bottom-[166px] left-[152px] h-[18px] w-[36px] rounded-full bg-[#2f343c]"></div>

        <div className="absolute bottom-[35px] left-[4px] h-8 w-12 rounded-b bg-[#ff7a1a]"></div>
      </div>
    </div>
  );
}

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Outlet context={{ AuthIllustration }} />
    </div>
  );
}