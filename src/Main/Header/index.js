import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SettingContext } from "../../context/SettingContext";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "@firebase/auth/internal";
import { auth } from "../../firebase/config";
import { addUser } from "../../firebase/service";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "@firebase/auth";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    height: 60,
    width: "100%",
    margin: "auto",
    alignItems: "center",
  },
  buttonBar: {
    alignItems: "center",
    display: "flex",
  },
  headerContainer: {
    padding: "0px 12px",
    maxWidth: 620,
    margin: "auto",
  },
  imgButton: {
    width: 16,
  },
  contentButton: {
    marginLeft: 4,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 4,
    cursor: "pointer",
    opacity: 0.9,
    background: "none rgba(255,255,255,0.2)",
    boxShadow: "none",
    marginLeft: 10,
    fontSize: 13,
    padding: "4px 8px",
    minWidth: 70,
    border: "none",
    color: "white",
  },
  imgLogin: {
    width: 28,
    borderRadius: 4,
    backgroundColor: "white",
  },
  btnLogin: {
    marginLeft: 8,
    padding: 2,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  profileContainer: {
    zIndex: 1000,
    borderRadius: 4,
    opacity: 1,
    boxShadow: "rgb(0 0 0/ 15%) 0px 10px 20px, rgb(0 0 0/10%) 0px 3px 6px",
    display: "block",
    position: "absolute",
    backgroundColor: "white",
    width: 200,
    right: 0,
    transform: "translateY(10px)",
    pointerEvents: "auto",
  },
  profile: {
    color: "rgb(79,43,45)",
    display: "flex",
    alignItems: "center",
    padding: "10px 12px",
    fontSize: 14,
    cursor: "pointer",
    "&:hover": {
      background: "rgb(211,211,211)",
    },
  },

  profileIcon: {
    opacity: 0.8,
    width: 14,
    marginRight: 8,
  },
});

const Header = () => {
  const settingInfo = useContext(SettingContext);
  const { login, setLogin } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);
  const provider = new GoogleAuthProvider();
  const { user } = useContext(AuthContext);
  const profileRef = useRef(null);

  //click outside
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowProfile(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(profileRef);
  const checkUserExist = (additionalUserInfo, user) => {
    if (additionalUserInfo?.isNewUser) {
      addUser(user.uid, {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
      });
    }
  };
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((results) => {
        const { _tokenResponse, user } = results;
        checkUserExist(_tokenResponse, user);
        setLogin(true);
        console.log("logged in!!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const classes = useStyles();
  return (
    <div className={classes.headerContainer}>
      <div className={classes.header}>
        <div>
          <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
            Pomofocus
          </Typography>
        </div>

        <div className={classes.buttonBar}>
          <button
            className={classes.button}
            onClick={() => settingInfo.setShowReport(true)}
          >
            <AssessmentIcon className={classes.imgButton} />
            <div className={classes.contentButton}>Report</div>
          </button>
          <button
            className={classes.button}
            onClick={() => {
              settingInfo.setShowSetting(true);
              console.log("?");
              console.log(settingInfo.showSetting);
            }}
          >
            <SettingsIcon className={classes.imgButton} />
            <div className={classes.contentButton}>Setting</div>
          </button>
          {login ? (
            <>
              <div style={{ position: "relative" }}>
                <div
                  className={classes.btnLogin}
                  onClick={() => setShowProfile((prev) => !prev)}
                >
                  <img src={user.photoURL} className={classes.imgLogin} />
                </div>
                {showProfile && (
                  <div className={classes.profileContainer} ref={profileRef}>
                    <div className={classes.profile}>
                      <PersonIcon className={classes.profileIcon} />
                      Profile
                    </div>
                    <div
                      className={classes.profile}
                      onClick={() => {
                        signOut(auth);
                        setLogin(false);
                        setShowProfile((prev) => !prev);
                      }}
                    >
                      <LogoutIcon className={classes.profileIcon} />
                      Log Out
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button className={classes.button} onClick={handleLogin}>
              <AccountCircleIcon className={classes.imgButton} />
              <div className={classes.contentButton}>Login</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
