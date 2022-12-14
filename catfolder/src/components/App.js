import Breadcrumb from "./Breadcrumb";
import ImageView from "./ImageView";
import Nodes from "./Nodes";
import { request } from "./api";
import Loading from "./Loading";

const cache = {};

function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
    isLoading: false,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    imageView.setState(this.state.selectedFilePath);
    loading.setState(this.state.nodes);
  };

  const loading = new Loading(this.state.isLoading);

  const imageView = new ImageView({
    $app,
    initialState: this.state.selectedNodeImage,
  });

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: [],
    onClick: (index) => {
      if (index === nul) {
        this.setState({
          ...this.state,
          depth: [],
          nodes: cache.root,
        });
        return;
      }

      if (index === this.state.depth.length - 1) {
        return;
      }

      const nextState = { ...this.state };
      const nextDepth = this.state.depth.slice(0, index + 1);

      this.setState({
        ...nextState,
        depth: nextDepth,
        nodes: cache[nextDepth[nextDepth.lenght - 1].id],
      });
    },
  });

  const nodes = new Nodes({
    $app,
    initialState: [],

    onClick: async (node) => {
      try {
        if (node.type === "DIRECTORY") {
          if (cache[node.id]) {
            this.setState({
              ...this.state,
              depth: [...this.state.depth, node],
              nodes: nextNodes,
              isLoading: false,
            });
          } else {
            const nextNodes = await request(node.id);
            this.setState({
              ...this.state,
              depth: [...this.state.depth, node],
              node: nextNodes,
              isLoading: false,
            });
            cache[node.id] = nextNodes;
          }
        } else if (node.type === "FILE") {
          this.setState({
            ...this.state,
            selectedFilePath: node.filePath,
            isLoading: false,
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
          nextState.depth.length === 0
            ? null
            : nextState.depth[nextState.depth.length - 1].id;

        if (prevNodeId === null) {
          // const rootNodes = await request();

          this.setState({
            ...nextState,
            isRoot: true,
            nodes: cache.rootNodes,
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

  const init = async () => {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    try {
      const rootNodes = await request(
        this.setState({
          ...this.state,
          isLoading: false,
          isRoot: true,
          nodes: rootNodes,
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  init();
}

export default App;
