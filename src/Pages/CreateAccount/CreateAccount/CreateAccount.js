import AuthenticateUser from "../../Shared/AuthenticateUser/AuthenticateUser";

export default function CreateAccount() {
  // form
  const formInputs = [
    { id: "name-new", label: "Name", type: "text" },
    { id: "email-new", label: "Email", type: "email" },
    { id: "password-new", label: "Password", type: "password" },
    { id: "confirm-password-new", label: "Confirm Password", type: "password" },
  ];

  const formItems = {
    title: "Create an account",
    formInputs,
    btnText: "Create an account",
    textsAfterBtn: {
      text1: "Already have an account?",
      text2: "Login",
      text2Link: "/login",
    },
    handleSubmit: function () {
      console.log("submitted");
    },
  };

  return <AuthenticateUser formItems={formItems} />;
}
