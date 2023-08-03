import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

interface FormValues {
  username: string;
  password: string;
  social: {
    instagram: string;
    threads: string;
  };
  phoneNumbers: string[];
  hobbies: {
    hobby: string;
  }[];
  age: number;
  date: Date;
}

const defaultValueData = async (): Promise<FormValues> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const data = await response.json();
  return {
    username: data.name,
    password: "",
    social: {
      instagram: data.company.name,
      threads: data.website,
    },
    phoneNumbers: ["", ""],
    hobbies: [{ hobby: "" }],
    age: 1,
    date: new Date(),
  };
};
export default function Form() {
  const { register, control, handleSubmit, formState, reset } =
    useForm<FormValues>({
      defaultValues: defaultValueData,
    });

  const { fields, append, remove } = useFieldArray({
    name: "hobbies",
    control,
  });

  const { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful } =
    formState;

  const onSubmit = (data: FormValues) => {
    setTimeout(() => {
      console.log("submitedd", data);
    }, 1000);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("form error", errors);
  };

  return (
    <span className="flex justify-center align-middle">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <span className="flex justify-start">
          <label className="">username</label>
        </span>
        <input
          className="flex border"
          {...register("username", {
            required: "username is required",
          })}
          id="username"
          type="text"
        />
        <p className="text-red-700">{errors.username?.message}</p>
        <span className="flex justify-start mt-4"></span>
        <div>
          <label className="">password</label>
          <input
            className="flex border"
            {...register("password", {
              required: "password is required",
            })}
            id="password"
            type="password"
          />
          <p className="text-red-700">{errors.password?.message}</p>
        </div>
        <div className=" mt-2">
          <label>Instagram</label>
          <input
            className="flex border"
            {...register("social.instagram", {
              required: "instagram is required",
            })}
            id="instagram"
            type="text"
          />
          <p className="text-red-700">{errors.social?.instagram?.message}</p>
        </div>
        <div className=" mt-2">
          <label className=" mt-4">threads</label>
          <input
            className="flex border "
            {...register("social.threads", {
              required: "threads is required",
            })}
            id="threads"
            type="text"
          />
          <p className="text-red-700">{errors.social?.threads?.message}</p>
        </div>
        <div className=" mt-2">
          <label className=" mt-4">Phone number 1</label>
          <input
            className="flex border "
            {...register("phoneNumbers.0", {
              required: "Primary phone is required",
            })}
            id="primary-phone"
            type="text"
          />
          <p className="text-red-700">{errors.phoneNumbers?.[0]?.message}</p>
        </div>

        <div>
          <label className=" mt-4">Phone number 1</label>
          <input
            className="flex border"
            {...register("phoneNumbers.1", {
              required: "Secondary phone is required",
            })}
            id="secondary-phone"
            type="text"
          />
          <p className="text-red-700">{errors.phoneNumbers?.[1]?.message}</p>
        </div>

        <div>
          <label className="">List of Hobbies</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <input
                    className="border"
                    {...register(`hobbies.${index}.hobby`)}
                  />
                  {index > 0 && (
                    <button
                      className=" px-5 border-2 bg-blue-700 mt-4"
                      type={"button"}
                      onClick={() => remove(index)}
                    >
                      Remove A Hobby
                    </button>
                  )}
                </div>
              );
            })}
            <button
              className=" px-5 border-2 bg-blue-700 mt-4"
              type={"button"}
              onClick={() => append({ hobby: "" })}
            >
              Add A Hobby
            </button>
          </div>
        </div>

        <div>
          <label className=" mt-4">Age</label>
          <input
            className="flex border"
            {...register("age", {
              valueAsNumber: true,
              required: "Age is required",
            })}
            id="age"
            type="number"
          />
          <p className="text-red-700">{errors.age?.message}</p>
        </div>

        <div>
          <label className=" mt-4">Date of the day</label>
          <input
            className="flex border"
            {...register("date", {
              valueAsDate: true,
              required: "Date of the Day is required",
            })}
            id="date"
            type="date"
          />
          <p className="text-red-700">{errors.date?.message}</p>
        </div>

        <button
          disabled={!isDirty || !isValid || isSubmitting}
          className=" px-5 border-2 bg-blue-400 mt-4"
          type="submit"
        >
          submit
        </button>
      </form>
      <DevTool control={control} />
    </span>
  );
}
