import { CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <CircularProgress
      style={{
        margin: 0,
        position: "absolute",
        top: "50%",
        left: "50%",
        color: "#b3befe"
      }}
    />
  );
}
