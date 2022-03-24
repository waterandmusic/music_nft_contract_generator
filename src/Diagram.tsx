import { useEffect, useState } from "react";
import { useGlobal } from "reactn";
import ReactFlow from "react-flow-renderer";
import styled from "styled-components";
import tree, { Type } from "./Tree";

import ELK from "elkjs";
const elk = new ELK();

const Container = styled.div`
  height: calc(100vh - 320px);
  pointer-events: none;
  width: 150px;
  min-width: 150px;
  @media print {
    display: none;
  }
`;

function Node(props: { data: { color: string } }) {
  return (
    <div
      style={{
        width: 15,
        height: 15,
        borderRadius: 15,
        background: props.data.color,
        display: "inline-block",
      }}
    />
  );
}

const nodeTypes = {
  node: Node,
};

function Diagram() {
  const [cqid] = useGlobal("currentQuestion");
  const [e, setE] = useState<any[] | undefined>([]);

  useEffect(() => {
    let elements = [],
      edges = [];
    for (let id of Object.keys(tree)) {
      elements.push({
        id,
        color:
          tree[id].type === Type.endpointFail
            ? "red"
            : id === cqid
            ? "black"
            : "grey",
      });
      if (tree[id] && tree[id].next) {
        if (typeof tree[id].next === "string") {
          edges.push({
            id: `${id}`,
            sources: [id],
            targets: [tree[id].next],
          });
        } else if (typeof tree[id].next === "object") {
          for (let item of tree[id].next || []) {
            edges.push({
              id: `${id}`,
              sources: [id],
              targets: [item],
            });
          }
        }
      }
    }

    elk
      .layout(
        { id: "root", children: elements, edges },
        {
          layoutOptions: {
            algorithm: "layered",
            "elk.direction": "DOWN",
            "elk.edgeRouting": "POLYLINE",
          },
        }
      )
      .then((items) => {
        setE(items.children);
      });
  }, [cqid]);

  return (
    <Container>
      <ReactFlow
        elements={(e || []).map((i) => ({
          id: i.id,
          type: "node",
          data: { color: i.color },
          position: { x: i.x, y: i.y },
        }))}
        elementsSelectable={false}
        nodesConnectable={false}
        nodesDraggable={false}
        nodeTypes={nodeTypes}
      />
    </Container>
  );
}

export default Diagram;
