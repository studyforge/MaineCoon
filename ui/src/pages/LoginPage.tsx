import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../assets/CatVectorIcon.svg?react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    await axios.post("/user/login", user).then(() => {
      console.log("success");
    });
  };
  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-col justify-center w-2/3 ml-16">
        <h1 className="font-bold flex content-center text-5xl mb-8 bg-gradient-to-r from-indigo-600 to-pink-500 text-transparent bg-clip-text w-fit">
          {" "}
          MaineC{" "}
          <span style={{ color: '#AD49B8' }}> <Logo width={55} height={55} /></span>
          on{" "}
        </h1>
        <h2 className="text-2xl  font-medium">
          Discutez avec vos amis dans le monde entier avec MaineCoon, <br />
          le chat qui va vous faire{" "}
          <span className=" text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 text-transparent bg-clip-text">
            {" "}
            MIAOU !
          </span>
        </h2>
      </div>
      <div className="flex flex-col justify-center w-1/3 ">
        <span style={{ color: '#AD49B8', position: 'relative', top: 190, left: 37, width: 300, height: 300 }}> <Logo /></span>
        <div className="p-8 bg-white shadow-md rounded-md w-fit flex flex-col items-center z-10 mb-52">
          <h1 className="text-indigo-600 font-bold text-3xl">Connectez-vous</h1>
          <form
            className="flex flex-col mt-6 items-center gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <input
              className="w-80 border-gray-200 border-2 p-2  rounded-md"
              type="text"
              placeholder="Email"
              onBlur={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              className="w-80 border-gray-200 border-2 p-2  rounded-md"
              type="password"
              placeholder="Mot de passe"
              onBlur={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button
              className="bg-violet-600 px-8 py-3 rounded-full text-white"
              type="submit"
            >
              Se connecter
            </button>
            <div className="flex w-full justify-center items-center">
              <div className="h-0.5 bg-gray-500 w-1/2 rounded-full" />
              <p className="mx-2">ou</p>
              <div className="h-0.5 bg-gray-500 w-1/2 rounded-full" />
            </div>
            <button
              className="bg-gray-300 px-8 py-3 rounded-full text-gray-800"
              onClick={() => navigate("/register")}
            >
              Créer un compte
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
