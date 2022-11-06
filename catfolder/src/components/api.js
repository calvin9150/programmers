const API_END_POINT = "...";

export const request = (nodeId) => {
  fetch(`${API_END_POINT}/${nodeId ? nodeId : ""}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("server error");
      }
      return res.json();
    })
    .catch((e) => {
      throw new Error(`unknown error! ${e.message}`);
    });
};
