import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

interface IToDoForm {
  toDo: string;
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const { register, handleSubmit, setValue } = useForm<IToDoForm>();

  const onSubmit = ({ toDo }: IToDoForm) => {
    setToDos((prev) => [
      {
        text: toDo,
        id: prev.length,
        category: "TO_DO",
      },
      ...prev,
    ]);
    setValue("toDo", "");
  };

  return (
    <div>
      <h1>To Do</h1>
      <hr />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <input
          {...register("toDo", {
            required: "Please write a to do",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
