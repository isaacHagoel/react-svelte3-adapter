Do you have an awesome Svelte 3 component you would like to use within your React app?
If so, you've come to the right place!
# React-Svelte3-Adapter

## Installation
```bash
yarn add react-svelte3-adapter
```
or 
```bash
npm install --save react-svelte3-adapter
```

## Usage
```jsx
import React, {useState} from 'react';
import SvelteAdapter from 'react-svelte3-adapter';
import SomeSvelte3Component from 'some-svelte3-library';

export function MyReactComponent() {
    const [name, setName] = useState('World');
  return (
    <div className="App">
        <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        {/*Any change in name will be passed to the svelte component*/}
        {/*Every time the svelte component emits an event with the name "someevent" the function will be called */}
        <SvelteAdapter
            svelteComponent={SomeSvelte3Component}
            data={{name}}
            listeners={{someevent: (e) => alert(JSON.stringify(e.detail))}}
        />
    </div>
  );
}
```

## Misc
- If you would like to create a sharable svelte3 component you can then use this component to wrap, [this repo](https://github.com/sveltejs/component-template) will get you going. Just make sure you use the default compilation target (`generate:dom`). 
- At the time of writing these lines and to the best of my knowledge, other npm modules that have the same functionality as this one only work with Svelte 2, including [the official one](https://github.com/Rich-Harris/react-svelte).
