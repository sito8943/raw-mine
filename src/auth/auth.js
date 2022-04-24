import { encode } from "js-base64";
import config from "../config";

export const user = { name: "react", pass: config.reactAuth };
export const getAuth = {
  Authorization: `Basic ${encode(`${user.name}:${user.pass}`)}`,
  Accept: "application/json",
  "Content-Type": "application/json",
};
