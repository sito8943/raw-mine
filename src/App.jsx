import { Stage, Container, Sprite } from "@inlet/react-pixi";

const App = () => (
  <div>
    <Stage>
      <Sprite image="./my-image.png" x={100} y={100} />

      <Container x={500}>
        <Text text="Hello World" filter={[blurFilter]} />
      </Container>
    </Stage>
  </div>
);

export default App;
