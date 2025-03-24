import React from "react";

import { Quote } from "./quote";
import { DisplayPane } from "./display_pane";

import "./home.css";

export function Home() {

  return (
    <main>
      <Quote />
      <DisplayPane />
    </main>
  );
}
