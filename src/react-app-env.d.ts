/// <reference types="react-scripts" />

import "reactn";

declare module "reactn/default" {
  export interface State {
    responses: { question: string; answer: string }[];
    currentQuestion: string;
  }
}
