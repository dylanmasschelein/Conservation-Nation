import { Component } from "react";
// import InteractiveMap from "./components/InteractiveMap/InteractiveMap";
import AreaMap from "./components/AreaMap/AreaMap";
import TestMap from "./components/TestMap";

class App extends Component {
  render() {
    return (
      <div>
        <header></header>
        <main>
          <section>
            {/* <InteractiveMap /> */}
            {/* <AreaMap /> */}
            <TestMap />
          </section>

          <section>
            <h1>Selected area name</h1>
            <p>Main information about area</p>
            <a href='#'>
              Explore area or for animals/plants within the area etc...
            </a>
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
