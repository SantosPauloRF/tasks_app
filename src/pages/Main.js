//REACT LIB
import { useEffect } from "react";
//CONTEXT HOOK
import { useUserContex } from "components/UserContext";


export default function Main() {

  const {
    textoAtual,
    setTextoAtual,
    tasks,
    handdleAddTask,
    deleteTask,
    getInfos,
    logout,
  } = useUserContex();

  useEffect(() => {
    getInfos();
  }, []);

  return (
    <>
    <div className="flex-col  text-center justify-center w-full h-full overflow-hidden">
      <div className="bg-white pt-4">
      <h1 className="font-bold text-2xl mb-4 ">Tasks App</h1>
      <form onSubmit={handdleAddTask} className="mb-3">
        <input
          className="placeholder:text-sm border border-blue-900 rounded shadow-sm px-1"
          type="text"
          value={textoAtual}
          placeholder=" Adicione sua Task.."
          onChange={(e) => setTextoAtual(e.target.value)}
        />
        <button
          className="rounded-md border-2 px-2 bg-blue-900 text-white hover:bg-blue-700 transition-all duration-300 ml-1"
          type="submit"
        >
          Adicionar Task
        </button>
      </form>
      
      <button
        className="rounded-md border-2 px-2 bg-blue-900 text-white hover:bg-blue-700 transition-all duration-300 ml-1 absolute top-0 right-0 m-3"
        onClick={logout}
      >
        Logout
      </button>
      <hr />
      </div>
        <main className="flex justify-center mt-2 overflow-hidden ml-0">
          <ul className="flex-row p-2">
            {tasks.map((value, index) => { 
              return (
                <li key={index} className="flex-row justify-around text-left">
                  <button
                    className="border mr-2 rounded-lg border-black w-20 text-bold h-6 bg-blue-900 text-white hover:text-black hover:bg-blue-400 transition-all duration-300"
                    onClick={() => deleteTask(value)}
                  >
                    Deletar
                  </button>
                    {value}
                </li>
              );
            })}
          </ul>
        </main>
    </div>
    </>
  );
};
