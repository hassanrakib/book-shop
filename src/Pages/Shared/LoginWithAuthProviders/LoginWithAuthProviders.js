import useAuth from "../../../hooks/useAuth";
import facebookLogo from "../../../icons/facebook.png";
import googleLogo from "../../../icons/google.png";

export default function LoginWithAuthProviders({ redirect_uri }) {
  const { googleSignIn } = useAuth();

  // auth providers
  const authProviders = [
    {
      id: "1",
      text: "Continue with Google",
      img: googleLogo,
      handler: googleSignIn,
    },
    { id: "2", text: "Continue with Facebook", img: facebookLogo },
  ];
  return (
    <div className="px-8 space-y-5">
      <div className="text-center">
        <h3 className="text-xl text-slate-700 relative top-3 bg-white inline-block px-4">
          Or
        </h3>
        <div className="h-px bg-slate-400"></div>
      </div>
      <div className="space-y-3">
        {authProviders.map((authProvider) => (
          <button
            key={authProvider.id}
            className="flex items-center border border-slate-300 rounded-full p-2 w-full"
            onClick={() => authProvider.handler(redirect_uri)}
          >
            <img className="h-9" src={authProvider.img} alt="auth-logo" />
            <p className="flex-1">{authProvider.text}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
