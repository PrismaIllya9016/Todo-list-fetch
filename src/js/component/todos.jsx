import React, { useState } from "react";

export const Todo = () => {
  //planteamientos:
  //1) Pensar en una estructura de datos adecuada: Arreglos

  //["tarea1" , "lavar los platos", "sacar la basura"]
  //Sabemos que podemos agregar con el método .push()

  //Podemos recorrer los arreglos con For, .map((item, index)=>{return()})

  //Podemos remover .filter((item, index)=>{return (index != 2)})

  const [listTodos, setListTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const deleteTodo = (indiceTarea) => {
    setListTodos((prevState) => {
      return prevState.filter((item, index) => {
        return index !== indiceTarea;
      });
    });
  };

  const deleteTodo2 = (indiceTarea) => {
    setListTodos((prevState) => {
      return prevState.filter((item, index) => {
        return index !== indiceTarea;
      });
    });
  };

  return (
    <div className="card">
      <input
        type="text"
        placeholder="escribe una tarea nueva"
        onKeyUp={(e) => {
          if (e.keyCode == "13") {
            let arrAux = listTodos.slice();
            arrAux.push(e.target.value);
            setListTodos(arrAux);
            e.target.value = "";
          }
        }}
      />
      <ul>
        {listTodos.map((item, indice) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between"
              key={indice}
            >
              {item}
              {indice}
              <button
                type="button"
                className="btn btn-light"
                onClick={(e) => {
                  deleteTodo(indice);
                }}
              >
                Eliminar {item}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
