// By default, this pack is loaded for server-side rendering.
// It must expose react_ujs as `ReactRailsUJS` and prepare a require context.
var componentRequireContext = require.context("components", true);
import ReactRailsUJS from "react_ujs";
ReactRailsUJS.useContext(componentRequireContext);
