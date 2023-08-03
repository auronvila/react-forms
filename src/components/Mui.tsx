import { TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

interface MuiData {
  email: string;
  password: string;
}
export default function Mui() {
  const form = useForm<MuiData>({
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: MuiData) => {
    console.log("MUI", data);
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1 className="text-3xl mb-5 flex justify-center mt-4">
          Mui Login Form
        </h1>
        <Stack spacing={2} width={400}>
          <TextField
            {...register("email", {
              required: "Email is required",
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            label="Email"
            type="email"
          />
          <TextField
            {...register("password", {
              required: "Password is required",
            })}
            helperText={errors.password?.message}
            error={!!errors.password}
            label="Password"
            type="password"
          />
          <div className="mb-11">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Login
            </Button>
          </div>
        </Stack>
      </form>
    </div>
  );
}
