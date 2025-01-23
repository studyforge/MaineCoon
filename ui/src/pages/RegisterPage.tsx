export default function RegisterPage() {
  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <div className="p-8 bg-white shadow-md rounded-md w-fit flex flex-col items-center">
        <h1 className="text-indigo-600 font-bold text-3xl">Créer un compte</h1>
        <form className="flex flex-col mt-6 items-center gap-5">
          <input
            className="w-80 border-gray-200 border-2 p-2  rounded-md"
            type="text"
            placeholder="Email"
          />
          <input
            className="w-80 border-gray-200 border-2 p-2  rounded-md"
            type="password"
            placeholder="Mot de passe"
          />
          <input
            className="w-80 border-gray-200 border-2 p-2  rounded-md"
            type="userName"
            placeholder="Nom d'utilisateur"
          />
          <button className="bg-violet-600 px-8 py-3 rounded-full text-white ">
            Créer un compte
          </button>
        </form>
      </div>
    </div>
  );
}
