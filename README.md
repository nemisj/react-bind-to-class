== How to use ==

```javascript
import bindToClass from 'react-bind-to-class';

class Component extends React.Component {
  constructor(props) {
    super(props);

    bindToClass(this, [
      'onClick'
    ]);
  }

  onClick(e) {
  }

  render() {
    return <button onClick={this.onClick}>Click me</button>
  }
}
```

`bindToClass` will bind method `onClick` to the current components scope.
You could do it also like: 

```javascript
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }
```

Though in comparison to the usual bind, this `bindToClass` will warn you whenever you forgot to bind.
Which means, that this code, will also work, keeping your app stable.

```javascript
import bindToClass from 'react-bind-to-class';

class Component extends React.Component {
  constructor(props) {
    super(props);

    bindToClass(this, [
      'onClick'
    ]);
  }

  onClick(e) {
  }

  onKeyDown(e) {
  }

  render() {
    return <button onKeyDown={this.onKeyDown} onClick={this.onClick}>Click me</button>
  }
}
```
