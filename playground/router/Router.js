import EventEmitter from './events';

class Router extends EventEmitter {
  sessionStack = [];

  constructor() {
    super();
    this.addEvents();
  }

  addEvents() {
    window.addEventListener('popstate', () => {
      this.emit('popstate');
    }, false);
    // custom events
    const { sessionStack } = this;
    this.on('popstate', () => {
      sessionStack.pop();
    });
    this.on('pushstate', (historyData) => {
      sessionStack.push(historyData);
    });
    this.on('replacestate', (historyData) => {
      sessionStack.pop();
      sessionStack.push(historyData);
    });
  }

  push(path, data, title) {
    const historyData = { data, title, path };
    window.history.pushState(data, title, path);
    this.emit('pushstate', historyData);
  }
  
  replace(path, data, title) {
    const historyData = { data, title, path };
    window.history.replaceState(data, title, path);
    this.emit('replacestate', historyData);
  }

  pushSessionStack(historyData) {
    this.sessionStack.push(historyData);
  }
}

export default Router;
