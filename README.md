# react-ui-dropdown

React ui dropdown

## How to install
```
npm i react-dropdown-ui --save
```

## How to import
For TypeScript usage there is a index.d.ts in node_modules folder
```typescript
import {UIDropdown} from 'react-dropdown-ui';
```

or

```javascript
var UIDropdown = require('react-dropdown-ui');
```

Also use css in a lib folder in: 

```
node_modules/react-video-seek-slider/lib/dropdown.css
```

## How to use
```jsx harmony
<UIDropdown 
    globalPositioned={this.props.globalPositionedDropdown} 
    handlerClassName="current"
    itemElementsClassName="item">
                
</UIDropdown>
```

### Specification

* `globalPositioned`?: boolean;
* `handlerClassName`: string;
* `itemElementsClassName`: string;



## For development
just use:

+ $ yarn or $ npm i
+ $ gulp

open your browser http://localhost:3000

## For Build

$ ./production
