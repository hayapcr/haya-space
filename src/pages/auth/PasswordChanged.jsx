import { Link, useOutletContext } from "react-router-dom";

export default function PasswordChanged() {
  const { AuthIllustration } = useOutletContext();

  return (
    <div className="flex h-[350px] w-full max-w-[940px] bg-white">
      <AuthIllustration />

      <div className="flex w-full items-center justify-center md:w-1/2">
        <div className="w-[285px]">
          <h1 className="mb-5 text-[24px] font-extrabold">Password Changed</h1>

          <p className="mb-10 text-[11px] leading-5 text-[#555]">
            We have sent a verification link to
            <br />
            your email{" "}
            <span className="font-semibold text-[#18b447]">
              admin22@gmail.com
            </span>
          </p>

          <p className="mb-16 text-[11px] text-[#555]">
            Click on the link in your mail box & all done.
          </p>

          <Link to="/login">
            <button className="mb-3 h-[38px] w-full rounded-[4px] bg-[#ff7a1a] text-[11px] font-bold text-white">
              Back To Login
            </button>
          </Link>

          <button className="h-[38px] w-full rounded-[4px] bg-[#f5f5f5] text-[11px] font-bold text-[#b8b8b8]">
            Resend Link
          </button>
        </div>
      </div>
    </div>
  );
}