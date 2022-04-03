import {
  memo,
  useState,
  useCallback,
  ChangeEvent,
  SyntheticEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    showPassword: false,
  });
  const [error, setError] = useState("");

  const onFormChange = useCallback(
    (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    },
    [values]
  );

  const handleClickShowPassword = useCallback(() => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  }, [values]);

  const handleMouseDownPassword = useCallback((event: SyntheticEvent) => {
    event.preventDefault();
  }, []);

  const onSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();

      const input = {
        name: values.name,
        email: values.email,
        username: values.username,
        password: values.password,
      };
      if (input.password?.length < 8) {
        return setError("Password must have at least 8 characters.");
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
          }
        );

        const content = await response.json();

        if (content?.success) {
          return navigate("/login");
        }
        if (content?.message) {
          return setError(content?.message);
        }

        return setError("An error occurred, please try again later.");
      } catch (error) {
        console.log("--------Error when registering user.", error);
        return setError("Failed to register.");
      }
    },
    [navigate, values]
  );

  return (
    <div
      style={{
        margin: "10px",
        padding: 0,
        height: "80vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "340px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ m: 1 }}>
          Register
        </Typography>

        <Box sx={{ m: 1 }}>
          <form method="POST">
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              type="username"
              placeholder="username"
              value={values.username}
              onChange={onFormChange("username")}
              sx={{ mt: 1, width: "100%" }}
              name="username"
            />
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              type="name"
              placeholder="John Doe"
              value={values.name}
              onChange={onFormChange("name")}
              sx={{ mt: 1, width: "100%" }}
              name="name"
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              placeholder="hello@example.com"
              value={values.email}
              onChange={onFormChange("email")}
              sx={{ mt: 1, width: "100%" }}
              name="email"
            />
            <FormControl sx={{ mt: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={onFormChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                name="password"
              />
            </FormControl>

            <Typography
              align="left"
              variant="subtitle1"
              gutterBottom
              component="div"
              sx={{ mt: 1 }}
              style={{ color: "red", fontSize: "12px" }}
            >
              {error}
            </Typography>

            <Button
              sx={{ mt: 1, width: "100%" }}
              variant="outlined"
              type="submit"
              onClick={onSubmit}
            >
              Register
            </Button>
          </form>
        </Box>

        <Box sx={{ m: 1 }}>
          <Link to="/login" color="secondary">
            Login
          </Link>
        </Box>
      </div>
    </div>
  );
};

export default memo(RegisterPage);
