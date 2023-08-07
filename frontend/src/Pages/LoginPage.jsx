import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform email and password validation
    const isValidUsername = validateUsername();
    const isValidPassword = validatePassword();

    if (isValidUsername && isValidPassword) {
      try {
        // Send login request to the backend API using fetch
        const response = await fetch(
          "http://localhost:4000/api/v1/user/login",
          {
            method: "POST",
            headers: {
              mode: "no-cors",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formData.username,
              password: formData.password,
            }),
          }
        );

        if (!response.ok) {
          console.error("Login error:", response);
          setLoginMessage("Login failed. Please check your credentials.");
          alert('Login Failed!Please contact the admin')
          return;
        }
        setLoginMessage("Login successful");
        const data = await response.json();
        const token = data.token;

        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        setAuthToken(token);
        return;
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateUsername = () => {
    // add logic to check username if needed
    if (!formData.username) {
      setUsernameError("Username is invalid");
      return false;
    } else {
      setUsernameError("");
      return true;
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^[a-zA-Z0-9]+$/;
    if (!formData.password.match(passwordRegex)) {
      setPasswordError(
        "Password should not contain special characters or spaces"
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <ThemeProvider theme={createTheme()}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 2, bgcolor: "secondary.main" }} />
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username "
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
                onBlur={validateUsername}
                error={!!usernameError}
                helperText={usernameError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                onBlur={validatePassword}
                error={!!passwordError}
                helperText={passwordError}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box sx={{ mt: 5 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {"Copyright © "}
                  <Link color="inherit">Post IT</Link>{" "}
                  {new Date().getFullYear()}
                  {"."}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;
