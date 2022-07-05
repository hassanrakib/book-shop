import AuthenticateUser from "../../Shared/AuthenticateUser/AuthenticateUser";

export default function Login() {

  const formInputs = [
    { id: "email", label: "Email", type: "email" },
    { id: "password", label: "Password", type: "password" },
  ];

  const formItems = {
    title: "Login",
    formInputs,
    btnText: "Login",
    textsAfterBtn: {
      text1: "Don't have an account?",
      text2: "Create an account",
      text2Link: "/create-account",
    },
    handleSubmit: function () {
      console.log("submitted");
    },
  };

  return <AuthenticateUser formItems={formItems} />;
}
