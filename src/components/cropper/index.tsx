import React, { useCallback, useEffect, useRef, useState } from "react";

import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { Container, CropButton } from "./styles";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Modal, Backdrop, Fade } from "@material-ui/core";

import Button from "components/button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

interface CropperInterface {
  children?: JSX.Element;
  onCrop: Function;
  callback?: () => void;
}

export interface CroppedImage {
  blob: Blob;
  url: string;
}

const Cropper: React.FC<CropperInterface> = ({
  children,
  onCrop,
  callback,
}) => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [upImg, setUpImg] = useState<any>("");
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 50,
    height: 50,
  });
  const [completedCrop, setCompletedCrop] = useState<any>({});

  const imgRef = useRef<any>(null);

  const onSelectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const selectFile = () => {
    const input = document.createElement("input");
    input.setAttribute("class", "input-image-class");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*,video/*");
    input.onchange = onSelectFile;

    input.click();
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const closeCropModal = () => {
    setUpImg("");
    setShowModal(false);
  };

  const cropImage = useCallback(() => {
    if (!completedCrop || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const crop = completedCrop;
    const pixelRatio = window.devicePixelRatio || 1;
    const canvas = document.createElement("canvas");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    ctx.canvas.toBlob((blob) => {
      onCrop({
        blob,
        url: URL.createObjectURL(blob),
      } as CroppedImage);
      closeCropModal();
    });
  }, [completedCrop, onCrop]);

  useEffect(() => {
    if (upImg !== "") {
      setShowModal(true);
    }
  }, [upImg]);

  const renderContent = () => (
    <Container>
      <div>
        <ReactCrop
          src={upImg}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        />
      </div>
      <div className={"footer"}>
        <Button
          text={"Cancelar"}
          handleButton={() => {
            callback && callback();
            closeCropModal();
          }}
        />

        <Button
          text={"Confirmar"}
          handleButton={() => {
            callback && callback();

            cropImage();
          }}
        />
      </div>
    </Container>
  );

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={showModal}
        onClose={setShowModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <div className={classes.paper}>{renderContent()}</div>
        </Fade>
      </Modal>

      <CropButton
        onClick={(e: any) => {
          e.preventDefault();
          selectFile();
        }}
      >
        {children}
      </CropButton>
    </>
  );
};

export default Cropper;
