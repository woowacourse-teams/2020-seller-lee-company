/**
 * @author kouz95, jnsorn, lxxjn0
 */

import { StyleSheet } from "react-native";

const headerFlex = 1;
const contentsFlex = 12;
const footerFlex = 1;

export default StyleSheet.create({
  header: {
    flex: headerFlex,
    backgroundColor: "white",
  },
  contents: {
    flex: contentsFlex,
    backgroundColor: "#d0d0d0",
  },
  footer: {
    flex: footerFlex,
    backgroundColor: "white",
  },
});
