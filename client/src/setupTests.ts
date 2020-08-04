// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

import { configure } from "enzyme";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import React from "react";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";

// Enable import of Zoom
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
window.crypto = {};

import $ from "jquery";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
global.$ = global.jQuery = $;
