import { useOutletContext } from "react-router-dom";
import { LockKeyhole } from "lucide-react";

export default function ResetPassword() {
  const { AuthIllustration } = useOutletContext();

  return (
    <div className="flex h-[350px] w-full max-w-[940px] bg-white">
      <AuthIllustration />

      <div className="flex w-full items-center justify-center md:w-1/2">
        <div className="w-[285px]">
          <h1 className="mb-8 text-[24px] font-extrabold">Reset Password</h1>

          <div className="relative mb-4">
            <LockKeyhole size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff7a1a]" />
            <input
              type="password"
              placeholder="New Password"
              className="h-[38px] w-full rounded-[3px] border border-[#eeeeee] pl-9 pr-3 text-[11px] outline-none focus:border-[#ff7a1a]"
            />
          </div>

          <div className="relative mb-20">
            <LockKeyhole size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff7a1a]" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="h-[38px] w-full rounded-[3px] border border-[#eeeeee] pl-9 pr-3 text-[11px] outline-none focus:border-[#ff7a1a]"
            />
          </div>

          <button className="h-[38px] w-full rounded-[4px] bg-[#ff7a1a] text-[11px] font-bold text-white">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}