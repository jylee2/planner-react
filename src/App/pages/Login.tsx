import { memo, useState, useCallback, SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import auth from "../utils/auth";

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

const LoginPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const [error, setError] = useState("");

  const onFormChange = useCallback(
    (prop: any) => (event: any) => {
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
        username: values.username,
        password: values.password,
      };
      if (!input.username.length || !input.password.length) {
        return setError("Please enter your username and password.");
      }

      try {
        const content = await auth.login(input);

        if (content?.success) {
          return navigate("/");
        }
        if (content?.message) {
          return setError(content?.message);
        }

        return setError("An error occurred, please try again later.");
      } catch (error) {
        console.log("--------Error when logging in.", error);
      }
    },
    [navigate, values]
  );

  return (
    <div
      style={{
        margin: "10px",
        padding: 0,
        height: "75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" gutterBottom component="div" sx={{ m: 1 }}>
        Login
      </Typography>

      <form method="POST">
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          type="username"
          placeholder="username"
          value={values.username}
          onChange={onFormChange("username")}
          sx={{ m: 1, width: "100%" }}
          name="username"
        />
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
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
          sx={{ m: 1 }}
        >
          {error}
        </Typography>

        <Button
          sx={{ m: 1, width: "100%" }}
          variant="outlined"
          type="submit"
          onClick={onSubmit}
        >
          Login
        </Button>
      </form>

      <Box sx={{ m: 1 }}>
        <Link to="/register" color="secondary">
          Register
        </Link>
      </Box>
    </div>
  );
};

export default memo(LoginPage);
