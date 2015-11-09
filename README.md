# react-nav-tabs

## Description

A set of components making tabbed navigation easier.  Optionally supports `react-router` if you'd like the tab panes to show routes instead of predefined components.

The *main* goal of this project is to provide flexible class names, elements, and react-router in a concise way.

## Example Usage

```js
import {
  NavTabs,
  NavTabList,
  NavTab,
  NavTabPaneList,
  NavTabPane
} from "react-nav-tabs";


<NavTabs active="profile" element="div" className="app">
  <NavTabList element="nav" className="app__navigation">
    <NavTab element="div" className="app__navigation-home" key="home">
      <h1>Home</h1>
    </NavTab>
    <NavTab element="div" className="app__navigation-profile" key="profile">
      <h1>Profile</h1>
    </NavTab>
  </NavTabList>
  <NavTabPaneList element="main" className="app__body">
    <NavTabPane key="home" element="div" className="app__body__home">
      <HomeComponent />
    </NavTabPane>
    <NavTabPane key="profile" element="div" className="app__body__profile">
      <ProfileComponent />
    </NavTabPane>
  </NavTabPaneList>
</NavTabs>
```

Please view the [docs](/docs/README.md) for more information on the API.

## License

MIT
