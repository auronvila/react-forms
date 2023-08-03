import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const schema = Yup.object({
  yupusername: Yup.string().required("Username is Required"),
  yuppassword: Yup.string().required("Password is Required"),
});

interface YupFormData {
  yupusername: string;
  yuppassword: string;
}

const onSubmit = (data: YupFormData) => {
  return console.log(data);
};

export default function YupForm() {
  const form = useForm<YupFormData>({
    defaultValues: {
      yupusername: "",
      yuppassword: "",
    },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  return (
    <div className="flex justify-center mt-11">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-white text-2xl">Yup Form</h3>
        <br />
        <label className="text-white">username</label>
        <br />
        <div>
          <input
            {...register("yupusername", {
              required: "username field is required",
            })}
            type="text"
            id="yupusername"
          />
          <p className="text-red-700">{errors.yupusername?.message}</p>
        </div>
        <label className="text-white">password</label>
        <br />
        <input
          {...register("yuppassword", {
            required: "password field is required",
          })}
          type="text"
          id="yuppassword"
        />
        <p className="text-red-700">{errors.yuppassword?.message}</p>
        <div>
          <button className=" px-5 border-2 bg-purple-400 mt-4" type="submit">
            submit yup form
          </button>
        </div>
      </form>
    </div>
  );
}
