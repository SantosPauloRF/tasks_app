//REACT ROUTER DOM
import { Link } from "react-router-dom";
//CONTEXT HOOK
import { useUserContex } from "components/UserContext";


export default function Register() {

  const { 
    signInUser, 
    error,
    email, setEmail, 
    password, setPassword 
  } = useUserContex();

  return (
    <>
    <div 
      className="w-screen h-screen flex justify-center items-center">
      <div 
        className="border-2 border-gray-250 shadow-md flex flex-col items-center p-4 w-[500px] h-[400px] rounded-[50px] justify-evenly bg-white">
        <h1 
          className="font-bold text-lg">
            Crie sua conta
        </h1>
        <form onSubmit={signInUser} className="flex flex-col">
          <label> Digite seu email </label>
          <input
            className="border-2 my-2 border-black px-2 py-1 rounded-md"
            type="email"
            placeholder="Email..."
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className="mt-1"> Digite sua senha </label>
          <input
            className="border-2 my-2 border-black px-2 py-1 rounded-md"
            type="password"
            placeholder="Senha..."
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div
            className="text-red-600 text-sm font-semibold">
              {error}
          </div>
          <br />
          <button
            type="submit"
            className="rounded-lg bg-blue-900 hover:bg-blue-700 text-white font-bold transition-all duration-200 p-1 shadow-black shadow-md">
              Criar
          </button>
          <br />
          <p> Se ja possui uma conta, faço o Login
            <Link
              className="font-bold ml-1 hover:text-blue-700 transition-all duration-200"
              to={"/"}>
                AQUI
            </Link>
          </p>
        </form>
      </div>
    </div>
    </>
  );
};