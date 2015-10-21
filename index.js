import React from "react";

export class NavTabs extends React.Component {

  static contextTypes = {
    history: React.PropTypes.object,
    location: React.PropTypes.object,
  }

  static propTypes = {
    baseRoute: React.PropTypes.string,
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.string.isRequired,
    element: React.PropTypes.string.isRequired,
    props: React.PropTypes.object,
    routeHandler: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    const tabs = this.props.children[0].props.children;
    this.state = {
      activeTabKey: tabs.find(c => c.props.isActive).key || tabs[0].key,
    };
  }

  handleTabClick(key) { this.setState({ activeTabKey: key }); }

  componentWillMount() {
    // Select a tab over default if soft query
    if (this.context.location.query.nav) {
      const tabs = this.props.children[0].props.children;
      if (tabs.find(c => c.key === this.context.location.query.nav)) {
        this.setState({
          activeTabKey: tabs.find(c => c.key === this.context.location.query.nav).key,
        });
      }
    }
  }

  render() {
    const { location } = this.context;
    const { baseRoute, routeHandler } = this.props;

    const tabList = React.cloneElement(this.props.children[0], {
      activeTabKey: this.state.activeTabKey,
      onTabClick: this.handleTabClick.bind(this),
      baseRoute: baseRoute,
      key: "tabList",
    });

    let tabPaneList = routeHandler;
    if (!baseRoute || (location.pathname === baseRoute || location.query.nav )) {
      tabPaneList = React.cloneElement(this.props.children[1], {
        activePaneKey: this.state.activeTabKey,
        key: "tabPaneList",
      });
    }

    let element = React.DOM[this.props.element]({ className: this.props.className });
    element = React.cloneElement(element, this.props, [ tabList, tabPaneList ]);

    return element;
  }
}

export class NavTabList extends React.Component {

  static contextTypes = {
    history: React.PropTypes.object,
    location: React.PropTypes.object,
  }

  static propTypes = {
    activeTabKey: React.PropTypes.string,
    baseRoute: React.PropTypes.string,
    children: React.PropTypes.node,
    className: React.PropTypes.string.isRequired,
    element: React.PropTypes.string.isRequired,
    onTabClick: React.PropTypes.func,
  }

  handleClick(key) {
    this.props.onTabClick(key);
    if (this.props.baseRoute) {
      this.context.history.pushState({}, this.props.baseRoute, { nav: key });
    }
  }

  render() {
    const children = React.Children.map(this.props.children, c => {
      if (React.isValidElement(c)) {
        // Don't set a tab to active if off base route
        const possActive = this.props.baseRoute
                ? this.props.baseRoute === this.context.location.pathname
                : true;
        return React.cloneElement(c, {
          isActive: possActive && c.key === this.props.activeTabKey,
          onClick: this.handleClick.bind(this, c.key),
        });
      } else {
        return c;
      }
    });

    const element = React.DOM[this.props.element]({ className: this.props.className });

    return React.cloneElement(element, this.props, children);
  }
}

export class NavTab extends React.Component {

  static propTypes = {
    activeClass: React.PropTypes.string,
    children: React.PropTypes.node,
    className: React.PropTypes.string.isRequired,
    element: React.PropTypes.string.isRequired,
    isActive: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  }

  static defaultProps = { activeClass: "is-open" }

  render() {
    const { className, activeClass, isActive } = this.props;
    const classes = `${ className } ${ isActive ? activeClass : "" }`;
    const element = React.DOM[this.props.element]({ className: classes });

    return React.cloneElement(element,
                              { onClick: this.props.onClick },
                              this.props.children);
  }
}

export class NavTabPaneList extends React.Component {

  static propTypes = {
    element: React.PropTypes.string.isRequired,
    className: React.PropTypes.string.isRequired,
    children: React.PropTypes.node,
    activePaneKey: React.PropTypes.string,
  }

  render() {
    const activePane = () => {
      if (React.Children.count(this.props.children) === 1) {
        return React.Children.only(this.props.children);
      } else {
        return this.props.children.find(c => c.key === this.props.activePaneKey);
      }
    };

    const element = React.DOM[this.props.element]({ className: this.props.className});
    return React.cloneElement(element, this.props, activePane());
  }
}

export class NavTabPane extends React.Component {

  static propTypes = {
    element: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    children: React.PropTypes.node,
  }

  render() {
    const element = React.DOM[this.props.element]({ className: this.props.className });
    return React.cloneElement(element, this.props, this.props.children);
  }
}
