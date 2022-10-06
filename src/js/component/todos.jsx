import React, { useState, useEffect } from "react";

export const Todo = () => {
  const [listTodos, setListTodos] = useState([]);
  const [usuario, setUsuario] = useState("");

  const BASE_URL = "https://assets.breatheco.de/apis/fake/todos/";

  const crearUsuario = async (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    let username = data.get("username");
    console.log("la variable username es: ", username);
    setUsuario(username);

    let URI = `${BASE_URL}user/${username}`;

    try {
      let respuesta = await fetch(URI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([]),
      });
      console.log(respuesta);
      if (respuesta.ok) {
        alert("Usuario creado correctamente");
        return;
      } else {
        alert("Error al crear usuario, o el usuario ya existe");
        setUsuario(username);
      }
      let respuestaJSON = await respuesta.json();
      console.log(respuestaJSON);
    } catch {
      (e) => console.log(e);
    }
  };

  const traerListaTareas = async () => {
    let URI = `${BASE_URL}user/${usuario}`;
    try {
      let respuesta = await fetch(URI);
      if (respuesta.ok) {
        let respuestaJSON = await respuesta.json();
        console.log(respuestaJSON);
        console.log(listTodos);
        setListTodos(respuestaJSON);
        console.log(listTodos);
      } else {
        console.log("respuesta fallida");
        setListTodos([]);
      }
    } catch {
      (err) => console.log(err);
    }
  };

  const eliminarTarea = async (indiceTarea) => {
    let URI = `${BASE_URL}user/${usuario}`;

    let auxArr = listTodos.filter((item, index) => {
      return index !== indiceTarea;
    });

    console.log(auxArr);
    if (auxArr.length > 0) {
      try {
        let respuesta = await fetch(URI, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(auxArr),
        });

        if (respuesta.ok) {
          console.log("Se eliminó exitósamente la tarea");
          traerListaTareas();
        } else {
          console.log("erro");
        }
      } catch {
        (e) => console.log(e);
      }
    } else {
      let respuesta = await fetch(URI, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auxArr),
      });
    }
  };

  useEffect(() => {
    traerListaTareas();
  }, [usuario]);

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

  const agregarTodo = async (e) => {
    let arrAux = listTodos.slice();
    arrAux.push({
      label: e,
      done: false,
    });
    setListTodos(arrAux);
    console.log(usuario, e, arrAux);
    let URI = `${BASE_URL}user/${usuario}`;

    let respuesta = await fetch(URI, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arrAux),
    });

    if (respuesta.ok) {
      console.log("Se agregó exitósamente la tarea");
     
      traerListaTareas();
    } else {
      console.log("error al agregar tarea");
    }
  };

  return (
    <div className="card">
      <form
        onSubmit={(e) => {
          crearUsuario(e);
        }}
      >
        <input type="text" placeholder="Nombre de usuario" name="username" />
        <button type="submit">Crear Usuario</button>
      </form>

      {/* <button type="button" onClick={()=>traerListaTareas()}>Traer las tareas</button> */}
      <input
        type="text"
        placeholder="escribe una tarea nueva"
        onKeyUp={(e) => {
          if (e.keyCode == "13") {
            console.log(e.target.value);
            agregarTodo(e.target.value);
            /*  e.target.value = ""; */
          }
        }}
      />
      <ul>
        {listTodos.length > 0 && listTodos && listTodos != undefined ? (
          listTodos.map((item, indice) => {
            return (
              <li
                className="list-group-item d-flex justify-content-between"
                key={indice}
              >
                {item.label}
                <span>{JSON.stringify(item.done)}</span>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={(e) => {
                    eliminarTarea(indice);
                  }}
                >
                  Eliminar
                </button>
              </li>
            );
          })
        ) : (
          <>No Hay tareas</>
        )}
      </ul>
    </div>
  );
};
