import React, { useRef, useEffect, useState } from "react";
import { JEELIZVTOWIDGET } from "jeelizvtowidget";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import styles from "./css/styles.module.css";
import { glasses } from "../glasses.js";
import Carousel from "./Carousel";

function init_VTOWidget(placeHolder, canvas, toggleLoading) {
  JEELIZVTOWIDGET.start({
    placeHolder,
    canvas,
    callbacks: {
      ADJUST_START: null,
      ADJUST_END: null,
      LOADING_START: () => toggleLoading(true),
      LOADING_END: () => toggleLoading(false),
    },
    sku: "empty",

    searchImageMask: "https://cdn130.picsart.com/233354883091212.png",

    searchImageColor: 0xeeeeee,
    searchImageRotationSpeed: -0.001,

    callbackReady: () => {
      console.log("JEELIZVTOWIDGET ready");
    },

    onError: (errorLabel) => {
      console.error("JEELIZ Error:", errorLabel);

      switch (errorLabel) {
        case "WEBCAM_UNAVAILABLE":
          alert("Camera access is unavailable.");
          break;

        case "INVALID_SKU":
          alert("Invalid glasses model.");
          break;

        case "PLACEHOLDER_NULL_WIDTH":
        case "PLACEHOLDER_NULL_HEIGHT":
          alert("Placeholder size is invalid.");
          break;

        default:
          alert(`An error occurred: ${errorLabel}`);
      }
    },
  });
}

function AppCanvas() {
  const [selected, setSelected] = useState(-1);
  const [adjust, setAdjust] = useState(true);

  const refPlaceHolder = useRef(null);
  const refCanvas = useRef(null);
  const refLoading = useRef(null);

  const toggleLoading = (isLoadingVisible) => {
    if (!refLoading.current) return;

    refLoading.current.style.display = isLoadingVisible ? "flex" : "none";
  };

  const enter_adjustMode = () => {
    JEELIZVTOWIDGET.enter_adjustMode();
    setAdjust(false);
  };

  const exit_adjustMode = () => {
    JEELIZVTOWIDGET.exit_adjustMode();
    setAdjust(true);
  };

  const set_glassesModel = (index) => {
    if (index < 0 || index >= glasses.length) return;

    setSelected(index);
    JEELIZVTOWIDGET.load(glasses[index].SKU);
  };

  useEffect(() => {
    const placeHolder = refPlaceHolder.current;
    const canvas = refCanvas.current;

    init_VTOWidget(placeHolder, canvas, toggleLoading);

    return () => {
      JEELIZVTOWIDGET.destroy();
    };
  }, []);

  const handleImageClick = (index) => {
    set_glassesModel(index);
  };

  return (
    <>
      <div ref={refPlaceHolder} className={styles.container}>
        <div ref={refLoading} className={styles.loading}>
          LOADING...
        </div>

        <div className={styles.textContainer}>
          {!adjust && (
            <Typography className={styles.adjustText}>
              Press and drag to adjust the position of the glasses.
            </Typography>
          )}

          {selected > -1 && adjust && (
            <Typography className={styles.glassesName}>
              {glasses[selected]["label (US)"]}
            </Typography>
          )}
        </div>
      </div>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography
          sx={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {selected < 0 ? 0 : selected + 1}/{glasses.length}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            gap: 2,
          }}
        >
          {selected !== -1 ? (
            <>
              <Button
                variant="contained"
                disabled={selected <= 0 || !adjust}
                onClick={() => set_glassesModel(selected - 1)}
              >
                {"<<"} Previous
              </Button>

              <Button
                variant="contained"
                disabled={selected >= glasses.length - 1 || !adjust}
                onClick={() => set_glassesModel(selected + 1)}
              >
                Next {">>"}
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={() => set_glassesModel(0)}>
              Start
            </Button>
          )}
        </Box>

        {selected !== -1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            {adjust ? (
              <Button
                variant="contained"
                className={styles.secondaryButton}
                onClick={enter_adjustMode}
              >
                Adjust
              </Button>
            ) : (
              <Button
                variant="contained"
                className={styles.secondaryButton}
                onClick={exit_adjustMode}
              >
                Quit
              </Button>
            )}
          </Box>
        )}

        <Carousel
          images={glasses}
          onClick={handleImageClick}
          selected={selected}
        />
      </Box>
    </>
  );
}

export default AppCanvas;
