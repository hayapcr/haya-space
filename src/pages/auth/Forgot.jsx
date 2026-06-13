import { Link, useOutletContext } from "react-router-dom";
import { Mail } from "lucide-react";

export default function Forgot() {
  const { AuthIllustration } = useOutletContext();

  return (
    <div className="flex h-[350px] w-full max-w-[940px] bg-white">
      <AuthIllustration />

      <div className="flex w-full items-center justify-center md:w-1/2">
        <div className="w-[285px]">
          <h1 className="mb-4 text-[24px] font-extrabold">Forget Password</h1>

          <p className="mb-7 text-[11px] leading-4 text-[#555]">
            Please enter your email address below
            <br />
            you will receive a verification link
          </p>

          <div className="relative mb-20">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff7a1a]" />
            <input
              type="email"
              placeholder="Email Address"
              className="h-[38px] w-full rounded-[3px] border border-[#eeeeee] pl-9 pr-3 text-[11px] outline-none focus:border-[#ff7a1a]"
            />
          </div>

          <Link to="/password-changed">
            <button className="h-[38px] w-full rounded-[4px] bg-[#ff7a1a] text-[11px] font-bold text-white">
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}