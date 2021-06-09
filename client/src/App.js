import { Component } from "react";
import AreaMapHooks from "./components/AreaMapHooks/AreaMapHooks";
// import Test from "./components/Test/test";

class App extends Component {
  render() {
    return (
      <div>
        <header></header>
        <main>
          <section>
            <AreaMapHooks />
            {/* <AreaMap /> */}
          </section>

          <section>
            <h1>Selected area name</h1>
            <p>Main information about area</p>
            <p>Explore area or for animals/plants within the area etc...</p>
            <p>select photos or articles or whatever etc...</p>
            <p>more info about specifc plant, animal comes up on selection??</p>
          </section>
          <footer>info etc..</footer>
        </main>
      </div>
    );
  }
}

export default App;
