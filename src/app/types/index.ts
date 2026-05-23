import { CONTRIBUTOR, MAINTAINER } from "../../constant/common";

export type SIGN_UP_USER_PAYLOAD = {
  name: string;
  email: string;
  password: string;
  role: "contributor" | "maintainer";
};

export type ISSUES_PAYLOAD = {
  title: string;
  description: string;
  type: "bug" | "feature_request";
};
