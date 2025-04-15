// This file is used to declare the global window object in TypeScript
// and to add a custom property to it.
// This is useful when you want to add a custom property to the window object
// and use it in your TypeScript code without getting type errors.
// This is a workaround for the fact that TypeScript does not allow you to add custom properties to the window object by default.

import { searchPlaces } from "./searchPlaces";
declare global {
    interface Window {
        myObject: searchPlaces;
    }
  }
  
  export default global;