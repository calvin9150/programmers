import Breadcrumb from "./Breadcrumb";
import ImageView from "./ImageView";
import Nodes from "./Nodes";
import { request } from "./api";

function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    imageView.setState(this.state.selectedFilePath);
  };

  const imageView = new ImageView({
    $app,
    initialState: this.state.selectedNodeImage,
  });

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: new Nodes({}),
  });

  const nodes = new Nodes({
    $app,
    initialState: [],

    onClick: async (node) => {
      try {
        if (node.type === "DIRECTORY") {
        } else if (node.type === "FILE") {
          this.setState({
            ...this.state,
            selectedFilePath: node.filePath,
          });
        }
      } catch (e) {
        console.error(e);
      }
    },

    onBackclick: async () => {
      try {
        const nextState = { ...this.state };
        nextState.depth.pop();

        const prevNodeId =
          nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id;

        if (prevNodeId === null) {
          const rootNodes = await request();
          this.setState({
            ...nextState,
            isRoot: true,
            nodes: rootNodes,
          });
        } else {
          const prevNodes = await request(prevNodeID);

          this.setState({
            ...nextState,
            isRoot: false,
            nodes: prevNodes,
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
  });
}

export default App;
