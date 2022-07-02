import { Link } from "react-router-dom";
import LoginWithAuthProviders from "../LoginWithAuthProviders/LoginWithAuthProviders";

export default function AuthenticateUser({ formItems }) {
  const { title, formInputs, btnText, textsAfterBtn, handleSubmit } = formItems;
  return (
    <div className="max-w-md mx-auto my-4 space-y-1">
      {/* Create account form */}
      <form onSubmit={handleSubmit} className="border border-slate-300 p-5 rounded">
        <h1 className="text-2xl font-bold mb-8">{title}</h1>
        <div className="space-y-5">
          {formInputs.map((formInput) => (
            <div key={formInput.id} className="relative">
              <input
                className="peer w-full p-2 border-b border-slate-300 outline-none"
                type={formInput.type}
                id={formInput.id}
              />
              <label
                className="text-slate-400 absolute left-0 pointer-events-none p-2 peer-focus:translate-x-2 peer-focus:-translate-y-1.5 transition-transform peer-focus:text-xs peer-focus:bg-blue-custom peer-focus:text-white peer-focus:border-l-2 peer-focus:border-r-2 peer-focus:border-blue-custom peer-focus:py-0"
                htmlFor={formInput.id}
              >
                {formInput.label}
              </label>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="block mt-4 w-full rounded bg-blue-custom text-white px-5 py-3 hover:bg-violet-500 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-100"
        >
          {btnText}
        </button>
        <p className="text-center mt-3">
          {textsAfterBtn.text1}{" "}
          <Link to={textsAfterBtn.text2Link} className="underline text-blue-500">
            {textsAfterBtn.text2}
          </Link>
        </p>
      </form>
      {/* sign in using google and facebook */}
      <LoginWithAuthProviders />
    </div>
  );
}
