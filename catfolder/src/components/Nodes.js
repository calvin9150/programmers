function Nodes({ $app, initialState, onClick, onBackClick }) {
  this.state = initialState;

  this.$target = document.createElement("ul");
  $app.appendChild(this.$target);

  this.setstate = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.onBackClick = onBackClick;

  this.onClick = onClick;

  this.render = () => {
    // this.$target.innerHTML = this.state.nodes.map((node) => `<li>${node.name}</li>`);
    if (this.state.nodes) {
      const nodesTemplate = this.state.nodes
        .map((node) => {
          const iconPath =
            node.type === "FILE"
              ? "./assets/file.png"
              : "./assets/directory.png";

          return `
          <div class='Node' data-node-id='${node.id}'>
            <img src='${iconPath}'/>
            <div>${node.name}</div>
          </div>
        `;
        })
        .join("");

      this.$target.innerHTML = !this.state.isRoot
        ? `<div class='Node'><img src='/assets/prev.png/></div>${nodesTemplate}`
        : nodesTemplate;
    }
  };

  this.$target.addEventListener("click", (e) => {
    const $node = e.target.closest("node");

    if ($node) {
      const { nodeId } = $node.dataset;

      if (!nodeId) {
        this.onBackClick();
        return;
      }

      const selectedNode = this.state.nodes.find((node) => node.id === nodeId);
      if (selectedNode) {
        this.onClick(selectedNode);
      }
    }
  });

  this.render();

  // this.$target.querySelectorAll(".Node").forEach(($node) => {
  //   $node.addEventListener("click", (e) => {
  //     const { nodeId } = e.target.dataset;
  //     if (!nodeId) {
  //       this.onBackClick();
  //     }
  //     const selectedNode = this.state.nodes.find((node) => node.id === nodeId);

  //     if (selectedNode) {
  //       this.onClick(selectedNode);
  //     }
  //   });
  // });
}

export default Nodes;
