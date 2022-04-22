import Page from "@components/App/Page";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Styles from "./components/todo.module.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { PlusOutlined, CheckOutlined, DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import moment from "moment";
import _ from "lodash";

const todo = () => {
  const router = useRouter();
  const [todoLocal, setTodoLocal] = React.useState([]);
  const [todoText, setTodoText] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  const dateTime = new Date();
  const dateFormat = "YYYY/MM/DD";
  const [datePicker, setDatePicker] = React.useState("");

  useEffect(() => {
    if (router.isReady) {
      const { userId } = router.query;
      if (!userId) {
        router.replace("/");
      }
    }
  }, [router]);
  const getData = async () => {
    const res2 = await axios.get("http://localhost:3000/todo/getAllTodo/" + router.query.userId);
    setTodoLocal(res2.data);
  };
  useEffect(() => {
    getData();
  }, []);
  const addTodoText = async () => {
    if (todoText != "") {
      const dueDate = new Date();
      dueDate.setDate(+1);
      await axios.post("http://localhost:3000/todo/createTodo", {
        title: todoText,
        link: "null",
        tag: "ON HOLD",
        dueDate: moment(dateTime).format(dateFormat),
        creator: router.query.userId
      });
    }
    setTodoText("");
    getData();
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
    await axios.patch("http://localhost:3000/todo/editTodoTag/" + id, {
      tag: _status
    });
    const res2 = await axios.get("http://localhost:3000/todo/getAllTodo/" + router.query.userId);
    setTodoLocal(res2.data);
  };
  const handleDate = async (date: any) => {
    setDatePicker(moment(date).format(dateFormat));
  };
  const saveEditing = async (id: any) => {
    if (editingText != "") {
      await axios.patch("http://localhost:3000/todo/editTodoTitle/" + id, {
        title: editingText
      });
    }
    try {
      await axios.put("http://localhost:3000/todo/editTodo/" + id, {
        dueDate: datePicker
      });
    } catch (error) {
      console.log(error);
    }
    setTodoEditing(null);
    setEditingText("");
    setDatePicker("");
    const res2 = await axios.get("http://localhost:3000/todo/getAllTodo/" + router.query.userId);
    setTodoLocal(res2.data);
  };
  const deleteEditing = async (id: any) => {
    await axios.delete("http://localhost:3000/todo/deleteTodoById/" + id);
    _.delay(() => {
      getData();
    }, 50);
    setTodoEditing(null);
  };
  const clearTodoLocal = async (id: any) => {
    axios.all([await axios.delete("http://localhost:3000/todo/deleteAllTodo/" + id)]);
    _.delay(() => {
      getData();
    }, 50);
  };
  const signOut = () => {
    router.replace("/");
  };

  return (
    <Page>
      <body className={Styles.body}>
        <div className={Styles.wrapper}>
          <button className={Styles.btnSign} onClick={signOut}>
            SIGN OUT
          </button>
          {/* <button className={Styles.btnSign}>
          GET DATA
        </button> */}
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
                                    <button className={Styles.btnSave} onClick={() => saveEditing((todoData as any).id)}>
                                      <CheckOutlined />
                                    </button>
                                    <ReactQuill
                                      className={Styles.reactQuill}
                                      onChange={setEditingText}
                                      modules={modules}
                                      formats={formats}
                                      defaultValue={(todoData as any).title}
                                    ></ReactQuill>
                                    <table className={Styles.tbWrapper}>
                                      <tr>
                                        <th className={Styles.thWrapper}>DUE DATE</th>
                                        <th>
                                          :
                                          <DatePicker
                                            className={Styles.dateWrapper}
                                            onChange={handleDate}
                                            defaultValue={moment((todoData as any).dueDate, dateFormat)}
                                          ></DatePicker>
                                        </th>
                                      </tr>
                                    </table>
                                    <button className={Styles.btnDelete} onClick={() => deleteEditing((todoData as any).id)}>
                                      <DeleteOutlined />
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button className={Styles.btnEditing} onClick={() => setTodoEditing((todoData as any).id)}>
                                      <FormOutlined />
                                    </button>
                                    <table className={Styles.tbWrapper}>
                                      <tr>
                                        <th className={Styles.thWrapper}>TODO TASK</th>
                                        <th>:</th>
                                        <th>
                                          <div dangerouslySetInnerHTML={{ __html: (todoData as any).title }}></div>
                                        </th>
                                      </tr>
                                      <tr>
                                        <th className={Styles.thWrapper}>DUE DATE</th>
                                        {moment((todoData as any).dueDate).format(dateFormat) < moment(dateTime).format(dateFormat) ? (
                                          <>
                                            <th>:</th>
                                            <th>
                                              <div>
                                                <span className={Styles.dueField}>{moment((todoData as any).dueDate).format(dateFormat)}</span>
                                              </div>
                                            </th>
                                          </>
                                        ) : (
                                          <>
                                            <th>:</th>
                                            <th>
                                              <div>
                                                <span>{moment((todoData as any).dueDate).format(dateFormat)}</span>
                                              </div>
                                            </th>
                                          </>
                                        )}
                                      </tr>
                                    </table>
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
            <button onClick={() => clearTodoLocal(router.query.userId)}>CLEAR ALL</button>
          </div>
        </div>
      </body>
    </Page>
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

export default todo;
