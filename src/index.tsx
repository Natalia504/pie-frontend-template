import App from "./App";

const rootElement = document.getElementById("microui-root");

// Don't run store setup if the rootElement isn't found (We are running as a subapp)
if (rootElement) {
  console.log("Running as root app");
  import("./devIndex")
    .then(module => {
      console.log(module);
      module.renderApp(rootElement);
    })
    .catch(err => console.log(err));
}

export default App;
