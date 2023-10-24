import { useForm } from "react-hook-form";

interface IFormData {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  password1: string;
  serverError: string;
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>({
    defaultValues: {
      email: "@naver.com",
    },
  });

  const onValid = (data: IFormData) => {
    console.log(data);
    if (data.password !== data.password1) {
      setError(
        "password1",
        {
          message: "Passwords are not the same",
        },
        {
          shouldFocus: true,
        }
      );
    }

    setError("serverError", { message: "A server error occurred" });
  };

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
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Invalid email",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>

        <input
          {...register("firstName", {
            required: "First name is required",
            validate: {
              aaron: (value) => {
                if (value.includes("aaron")) {
                  return true;
                }
                return "Only aaron allowed";
              },
            },
          })}
          placeholder="First Name"
        />
        <span>{errors.firstName?.message}</span>

        <input
          {...register("lastName", { required: "Last name is required" })}
          placeholder="Last Name"
        />
        <span>{errors.lastName?.message}</span>

        <input
          {...register("userName", {
            required: "User name is required",
            minLength: {
              value: 10,
              message: "User name shouldn't be less than 10",
            },
          })}
          placeholder="User Name"
        />
        <span>{errors.userName?.message}</span>

        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Password shouldn't be less than 5",
            },
          })}
          placeholder="Password"
        />
        <span>{errors.password?.message}</span>

        <input
          {...register("password1", {
            required: "Password is required",
            minLength: 5,
          })}
          placeholder="Confirm Password"
        />
        <span>{errors.password1?.message}</span>

        <button>Add</button>

        <span>{errors.serverError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
