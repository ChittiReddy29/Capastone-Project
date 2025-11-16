
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Container,
//   IconButton,
// } from "@mui/material";
// import { Link, Routes, Route, Outlet } from "react-router-dom";
// import Home from "./Home.jsx";
// import About from "./About.jsx";
// import NotFound from "./NotFound.jsx";
// import styles from "./App.module.css";
// import { AuthContext } from "./AuthProvider.jsx";
// import { useContext, useMemo, useState } from "react";
// import logo from "./assets/revature.webp";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { Brightness4, Brightness7 } from "@mui/icons-material";

// function App() {
//   const [mode, setMode] = useState("light");

//   const toggleMode = () => {
//     setMode((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   const theme = useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode,
//           ...(mode === "light"
//             ? {
//                 primary: { main: "#2c0369ff" },
//                 background: { default: "#f5f5f5", paper: "#ffffff" },
//               }
//             : {
//                 primary: { main: "#0d47a1" },
//                 background: { default: "#121212", paper: "#1e1e1e" },
//               }),
//         },
//       }),
//     [mode]
//   );

//   function Layout() {
//     const { isLogged, logout, login } = useContext(AuthContext);

//     return (
//       <>
//         {/* Gradient AppBar */}
//         <AppBar
//           position="static"
//           sx={{
//             background:
//               "linear-gradient(90deg, #061b42ff 0%, #2a5298 50%, #061315ff 100%)",
//             height: "90px",
//             justifyContent: "center",
//             boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
//           }}
//         >
//           <Toolbar sx={{ justifyContent: "space-between", minHeight: "90px" }}>
//             <Link
//               to="/"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 textDecoration: "none",
//                 color: "inherit",
//               }}
//             >
//               <img
//                 src={logo}
//                 alt="Logo"
//                 style={{
//                   height: "55px",
//                   borderRadius: "8px",
//                   marginRight: "12px",
//                 }}
//               />

//               {/* Gradient Heading */}
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontWeight: "bold",
//                   background: "linear-gradient(45deg, #ffffff, #cfe8ff)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   letterSpacing: 1,
//                 }}
//               >
               
//               </Typography>
//             </Link>

//             <div style={{ display: "flex", alignItems: "center" }}>
//               {isLogged ? (
//                 <>
//                   <Link className={styles.link} to="/">
//                     Home
//                   </Link>
//                   <Link className={styles.link} to="/about">
//                     About
//                   </Link>
//                   <Link className={styles.link} to="/does-not-exist">
//                     404 Test
//                   </Link>
//                   <Link className={styles.link} onClick={logout}>
//                     Logout
//                   </Link>
//                 </>
//               ) : (
//                 <Link className={styles.link} onClick={login}>
//                   Login with ServiceNow
//                 </Link>
//               )}

//               <IconButton
//                 sx={{ ml: 2, color: "white" }}
//                 onClick={toggleMode}
//                 aria-label="toggle theme"
//               >
//                 {mode === "light" ? <Brightness4 /> : <Brightness7 />}
//               </IconButton>
//             </div>
//           </Toolbar>
//         </AppBar>

//         <Container sx={{ mt: 12 }}>
//           <Outlet />
//         </Container>
//       </>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Routes>
//         <Route element={<Layout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//     </ThemeProvider>
//   );
// }

// export default App;
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import Home from "./Home.jsx";
import About from "./About.jsx";
import NotFound from "./NotFound.jsx";
import styles from "./App.module.css";
import { AuthContext } from "./AuthProvider.jsx";
import { useContext, useMemo, useState } from "react";
import logo from "./assets/revature.webp";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Brightness4, Brightness7 } from "@mui/icons-material";

function App() {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: { main: "#2c0369ff" },
                background: { default: "#f5f5f5", paper: "#ffffff" },
              }
            : {
                primary: { main: "#0d47a1" },
                background: { default: "#121212", paper: "#1e1e1e" },
              }),
        },
      }),
    [mode]
  );

  function Layout() {
    const { isLogged, logout, login } = useContext(AuthContext);

    return (
      <>
        {/* Updated Gradient AppBar */}
        <AppBar
          position="static"
          sx={{
            background:
              "linear-gradient(90deg, #061b42 0%, #2a5298 50%, #061315 100%)",
            height: "120px",  
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", minHeight: "120px" }}>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{
                  height: "70px", 
                  borderRadius: "8px",
                  marginRight: "14px",
                }}
              />

              {/* CLEAN WHITE HEADING */}
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  letterSpacing: 1,
                  color: "white", 
                }}
              >
                ServiceNow Integration App
              </Typography>
            </Link>

            <div style={{ display: "flex", alignItems: "center" }}>
              {isLogged ? (
                <>
                  <Link className={styles.link} to="/">
                    Home
                  </Link>
                  <Link className={styles.link} to="/about">
                    About
                  </Link>
                  <Link className={styles.link} to="/does-not-exist">
                    404 Test
                  </Link>
                  <Link className={styles.link} onClick={logout}>
                    Logout
                  </Link>
                </>
              ) : (
                <Link className={styles.link} onClick={login}>
                  Login with ServiceNow
                </Link>
              )}

              <IconButton
                sx={{ ml: 2, color: "white" }}
                onClick={toggleMode}
                aria-label="toggle theme"
              >
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 14 }}>
          <Outlet />
        </Container>
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
