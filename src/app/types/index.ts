import { CONTRIBUTOR, MAINTAINER } from "../../constant/common";

export type SIGN_UP_USER_PAYLOAD = {
  name: string;
  email: string;
  password: string;
  role: "contributor" | "maintainer";
};
