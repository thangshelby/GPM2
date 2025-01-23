import { createLazyFileRoute } from "@tanstack/react-router";
import Model from "../component/Model";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [ric, setRic] = useState("");

  return (
    <div className="p-2 text-blue-300">
      <Model setRic={setRic} />
    </div>
  );
}
