import Breadcrumb from "./Breadcrumb";
import Nodes from "./Nodes";

function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: new Nodes({}),
  });

  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },

    onClick: (node) => {
      if (node.type === "DIRECTORY") {
      } else if (node.type === "FILE") {
      }
    },
  });
}

export default App;
