# Context
context在开发过程中相对于state、props等特性，是比较少用的，时间久了之后就容易忘记。

> Context provides a way to pass data through the component tree without having to pass props down manually at every level.

> Context is primarily used when some data needs to be accessible by many components at different nesting levels. Apply it sparingly because it makes component reuse more difficult.

Context适用场景
* 需要在很多地方用到的应用级别（不应该交由父子组件之间传递的）的属性。
  * theme
  * 登录状态
  * 组件库配置传递
  * 其他
  * 登录状态

## API
React.createContext

### Context.Provider & Context.Consumer
```jsx
<ThemeContext.Provider value="dark">
  <Toolbar />
</ThemeContext.Provider>
```

使用单个context传递的值
```jsx
// 组件需要指定contextType来消费context传递的内容
class ThemedButton extends React.Component {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".

  // 注意 **the closest theme Provider**
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```
使用多个context传递的值
```jsx
const ThemeContext = React.createContext(
  themes.dark // default value
);
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;

    // App component that provides initial context values
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```
### Context.displayName
```jsx
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" in DevTools
<MyContext.Consumer> // "MyDisplayName.Consumer" in DevTools
```

### useContext
* 相当于一个consumer内内function的第一个参数
* 或者是class组件的contextType指定一个context，然后从this.context取值
```jsx
// contexts.js
export const ThemeContext = React.createContext(themes.light);

// app.jsx
<ThemeContext.Provider value={themes.dark}>
  <Toolbar />
</ThemeContext.Provider>

// component.jsx
import { ThemeContext } from './contexts';

export function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```
* 要小心render的控制
> will always re-render when the context value changes.
