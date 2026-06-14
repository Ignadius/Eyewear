
import React, { useRef, useEffect, useState } from "react";

import { JEELIZVTOWIDGET } from "jeelizvtowidget";

import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

import styles from "./css/styles.module.css";
import { glasses } from "../glasses.js";
import Carousel from "./Carousel";

// Starts the Virtual Try-On widget and
// configures callbacks and error handling.
function init_VTOWidget(placeHolder, canvas, toggleLoading) {
  JEELIZVTOWIDGET.start({
    placeHolder,
    canvas,

    callbacks: {
      ADJUST_START: null,
      ADJUST_END: null,

      // Show loading indicator while
      // glasses models are loading
      LOADING_START: toggleLoading.bind(null, true),
      LOADING_END: toggleLoading.bind(null, false),
    },

    sku: "empty",

    searchImageMask:
      "http://cdn130.picsart.com/233354883091212.png",

    searchImageColor: 0xeeeeee,
    searchImageRotationSpeed: -0.001,

    callbackReady: () => {
      console.log("JEELIZVTOWIDGET ready");
    },

    onError: (errorLabel) => {
      alert("An error happened: " + errorLabel);
    },
  });
}


// ========================================
// COMPONENT
// ========================================

function AppCanvas() {

  // ========================================
  // STATE
  // ========================================

  // Currently selected glasses index
  const [selected, setSelected] = useState(-1);

  // Controls whether adjustment mode is active
  const [adjust, setAdjust] = useState(true);


  // ========================================
  // REFS
  // ========================================

  // Main Jeeliz container
  const refPlaceHolder = useRef();

  // Canvas used by Jeeliz
  const refCanvas = useRef();

  // Loading overlay
  const refLoading = useRef();

  // Optional refs used by buttons
  const refAdjustEnter = useRef();
  const refAdjust = useRef();
  const refChangeModel = useRef();


  // ========================================
  // HELPER FUNCTIONS
  // ========================================

  // Show or hide loading indicator
  const toggleLoading = (isLoadingVisible) => {
    refLoading.current.style.display =
      isLoadingVisible ? "block" : "none";
  };


  // ========================================
  // JEELIZ ACTIONS
  // ========================================

  // Enter manual glasses adjustment mode
  const enter_adjustMode = () => {
    JEELIZVTOWIDGET.enter_adjustMode();
    setAdjust(false);
  };

  // Exit adjustment mode
  const exit_adjustMode = () => {
    JEELIZVTOWIDGET.exit_adjustMode();
    setAdjust(true);
  };

  // Load a glasses model by index
  const set_glassesModel = (index) => {
    if (index >= 0 && index < glasses.length) {
      setSelected(index);
      JEELIZVTOWIDGET.load(glasses[index].SKU);
    }
  };


  // ========================================
  // EVENT HANDLERS
  // ========================================

  // Triggered when a carousel image is clicked
  const handleImageClick = (index) => {
    set_glassesModel(index);
  };


  // ========================================
  // EFFECTS
  // ========================================

  // Initialize Jeeliz once when component mounts
  useEffect(() => {
    const placeHolder = refPlaceHolder.current;
    const canvas = refCanvas.current;

    init_VTOWidget(
      placeHolder,
      canvas,
      toggleLoading
    );

    // Cleanup when component unmounts
    return () => {
      JEELIZVTOWIDGET.destroy();
    };
  }, []);


  // ========================================
  // RENDER
  // ========================================

  return (
    <>
      {/* ========================================
          VIRTUAL TRY-ON AREA
      ======================================== */}

      <div
        ref={refPlaceHolder}
        className={styles.container}
      >
        {/* Loading Overlay */}
        <div
          ref={refLoading}
          className={styles.loading}
        >
          LOADING...
        </div>

        {/* Overlay Text */}
        <div className={styles.textContainer}>

          {/* Adjustment Instructions */}
          {!adjust && (
            <Typography className={styles.adjustText}>
              Press and drag to adjust the
              position of the glasses.
            </Typography>
          )}

          {/* Selected Glasses Name */}
          {selected > -1 && adjust && (
            <Typography className={styles.glassesName}>
              {glasses[selected]["label (US)"]}
            </Typography>
          )}
        </div>
      </div>

      {/* ========================================
          CONTROLS SECTION
      ======================================== */}

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
          marginTop: 32,
        }}
      >

        {/* Current Position Indicator */}
        <Typography
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {selected < 0 ? 0 : selected + 1}
          /{glasses.length}
        </Typography>

        {/* Previous / Next Navigation */}
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 32,
          }}
        >
          {selected !== -1 ? (
            <>
              <Button
                variant="contained"
                disabled={
                  selected <= 0 || !adjust
                }
                onClick={() =>
                  set_glassesModel(selected - 1)
                }
              >
                {"<<"} Previous
              </Button>

              <div style={{ padding: 16 }} />

              <Button
                variant="contained"
                disabled={
                  selected === glasses.length - 1 ||
                  !adjust
                }
                onClick={() =>
                  set_glassesModel(selected + 1)
                }
              >
                Next {">>"}
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() =>
                set_glassesModel(selected + 1)
              }
            >
              Start
            </Button>
          )}
        </Box>

        {/* Adjust / Quit Buttons */}
        {selected !== -1 && (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 16,
            }}
          >
            {adjust ? (
              <Button
                variant="contained"
                onClick={enter_adjustMode}
              >
                Adjust
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={exit_adjustMode}
              >
                Quit
              </Button>
            )}
          </Box>
        )}

        {/* ========================================
            GLASSES CAROUSEL
        ======================================== */}

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
