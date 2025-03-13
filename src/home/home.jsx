import React from "react";

import { Scripture } from "./scripture";
import { DisplayPane } from "./display_pane";

import "./home.css";

export function Home() {

  return (
    <main>
      <Scripture />
      <DisplayPane />
    </main>
  );
}
