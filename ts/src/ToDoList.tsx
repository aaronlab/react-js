import { useForm } from "react-hook-form";

function ToDoList() {
  const { register, watch, handleSubmit, formState } = useForm();

  watch((value) => {});

  const onValid = (data: any) => {
    console.log(data);
  };

  console.log(formState.errors);

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit(onValid)}
      >
        <input {...register("email", { required: true })} placeholder="Email" />
        <input {...register("firstName")} placeholder="First Name" />
        <input
          {...register("lastName", { required: true })}
          placeholder="Last Name"
        />
        <input
          {...register("userName", { required: true, minLength: 10 })}
          placeholder="User Name"
        />
        <input
          {...register("password", { required: true, minLength: 5 })}
          placeholder="Password"
        />
        <input
          {...register("password1", {
            required: true,
            minLength: {
              value: 5,
              message: "Password is required!",
            },
          })}
          placeholder="Confirm Password"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
