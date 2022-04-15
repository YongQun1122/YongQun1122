import React from "react";
import Styles from "./todo.module.scss";
import { PlusOutlined, CheckOutlined, DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import dynamic from "next/dynamic";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const TodoWrapper = () => {
  const [signIn, setSignIn] = React.useState([]);
  const [todoLocal, setTodoLocal] = React.useState([]);
  const [todoText, setTodoText] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
  const [editingText, setEditingText] = React.useState("");
  const [doubleCheck, setDoubleCheck] = React.useState(null);

  const getSignIn = async () => {
    const res = await axios.post("http://localhost:3000/usertodo/signin", {
      email: "test01@gmail.com",
      password: "1234"
    });
    setSignIn(res.data);
    const res2 = await axios.get("http://localhost:3000/todo/getAllTodo/" + res.data.id);
    setTodoLocal(res2.data);
  };
  const getSignUp = async () => {
    const res = await axios.post("http://localhost:3000/usertodo/signup", {
      email: "test01@gmail.com",
      password: "1234"
    });
    setSignIn(res.data);
    const res2 = await axios.get("http://localhost:3000/todo/getAllTodo/" + res.data.id);
    setTodoLocal(res2.data);
  };
  const addTodoText = async (e: any) => {
    e.preventDefault();
    if (todoText != "") {
      // const newTodoText = {
      //   id: (todoLocal.length + 1).toString(),
      //   text: todoText,
      //   status: "ON HOLD"
      // };
      // setTodoLocal(([...todoLocal] as any).concat(newTodoText));
      const dueDate = new Date();
      dueDate.setDate(+1);
      await axios.post("http://localhost:3000/todo/createTodo", {
        title: todoText,
        link: "null",
        tag: "ON HOLD",
        dueDate: new Date().setDate(new Date().getDate() + 1),
        creator: (signIn as any).id
      });
    }
    setTodoText("");
    const res2 = await axios.get("http://localhost:3000/todo/getAllTodo/" + (signIn as any).id);
    setTodoLocal(res2.data);
  };
  const clearTodoLocal = async (creator: any) => {
    // setTodoLocal([]);
    await axios.delete("http://localhost:3000/todo/deleteAllTodo/" + creator);
    await getSignIn();
  };
  const handleOnDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(todoLocal);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodoLocal(items);
  };
  const toggleStatus = async (id: any, _status: any) => {
    // const renewTodoText = [...todoLocal].map(todoData => {
    //   if ((todoData as any).id === id) {
    //     (todoData as any).status = _status;
    //   }
    //   return todoData;
    // });
    // setTodoLocal(renewTodoText);
    await axios.patch("http://localhost:3000/todo/editTodoTag/" + id, {
      tag: _status
    });
    const res2 = await axios.get("http://localhost:3000/todo/getAllTodo/" + (signIn as any).id);
    setTodoLocal(res2.data);
  };
  const saveEditing = async (id: any, _e: any) => {
    console.log(editingText);

    console.log(_e);

    if (editingText != "") {
      // const renewText = [...todoLocal].map(todoData => {
      //   if ((todoData as any).id === id) {
      //     (todoData as any).text = editingText;
      //   }
      //   return todoData;
      // });
      // setTodoLocal(renewText);
      await axios.patch("http://localhost:3000/todo/editTodoTitle/" + id, {
        title: editingText
      });
    }
    setTodoEditing(null);
    setEditingText("");
    setDoubleCheck(null);
    const res2 = await axios.get("http://localhost:3000/todo/getAllTodo/" + (signIn as any).id);
    setTodoLocal(res2.data);
  };
  const deleteEditing = async (id: any) => {
    // const renewTodoText = [...todoLocal].filter(todoData => (todoData as any).id !== id);
    // setTodoLocal(renewTodoText);
    await axios.delete("http://localhost:3000/todo/deleteTodoById/" + id);
    setTodoEditing(null);
    await getSignIn();
  };

  return (
    <body className={Styles.body}>
      <div className={Styles.wrapper}>
        <button className={Styles.btnSign} onClick={getSignUp}>
          SET DATA
        </button>
        <button className={Styles.btnSign} onClick={getSignIn}>
          GET DATA
        </button>
        <header>Todo App</header>
        <div className={Styles.inputField}>
          <input type="text" onChange={e => setTodoText(e.target.value)} value={todoText} maxLength={60} placeholder="Add your new todo" />
          <button onClick={addTodoText}>
            <PlusOutlined />
          </button>
        </div>
        <ul className={Styles.todoListWrapper}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todoLocal">
              {provided => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {todoLocal.map((todoData, index) => {
                    return (
                      <Draggable key={(todoData as any).id.toString()} draggableId={(todoData as any).id.toString()} index={index}>
                        {provided => (
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <div className={Styles.todoDataWrapper}>
                              {(todoData as any).tag === "ON HOLD" ? (
                                <>
                                  <button className={Styles.onStatus} onClick={() => toggleStatus((todoData as any).id, "IN PROGRESS")}>
                                    ON HOLD
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button className={Styles.inStatus} onClick={() => toggleStatus((todoData as any).id, "ON HOLD")}>
                                    IN PROGRESS
                                  </button>
                                </>
                              )}
                              {(todoData as any).id === todoEditing ? (
                                <>
                                  <button className={Styles.btnSave} onClick={() => setDoubleCheck((todoData as any).id)}>
                                    <CheckOutlined />
                                  </button>
                                  <div className={Styles.textBox} dangerouslySetInnerHTML={{ __html: (todoData as any).title }}></div>
                                  <ReactQuill
                                    className={Styles.reactQuill}
                                    onChange={(e) => {
                                      if (doubleCheck != null) {
                                        console.log(e);
                                        
                                        setEditingText(e);
                                        saveEditing((todoData as any).id, e);
                                      }
                                    }}
                                    modules={modules}
                                    formats={formats}
                                    defaultValue={(todoData as any).title}
                                  ></ReactQuill>
                                  <button className={Styles.btnDelete} onClick={() => deleteEditing((todoData as any).id)}>
                                    <DeleteOutlined />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button className={Styles.btnEditing} onClick={() => setTodoEditing((todoData as any).id)}>
                                    <FormOutlined />
                                  </button>
                                  <div className={Styles.textBox} dangerouslySetInnerHTML={{ __html: (todoData as any).title }}></div>
                                </>
                              )}
                            </div>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </ul>
        <div className={Styles.footer}>
          <span>You have {todoLocal.length} pending tasks.</span>
          <button onClick={() => clearTodoLocal((signIn as any).id)}>CLEAR ALL</button>
        </div>
      </div>
    </body>
  );
};

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"]
  ]
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "image",
  "video",
  "code-block"
];

export default TodoWrapper;
