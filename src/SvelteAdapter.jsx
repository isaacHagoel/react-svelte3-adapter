import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wraps a svelte component with a React component and handles the communication between the two
 */
class SvelteAdapter extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
    }
    componentDidMount() {
        const {svelteComponent, listeners, data} = this.props;
        this.component = new svelteComponent({
            target: this.containerRef.current,
            props: {
                ...data
            }
        });

        Object.entries(listeners).forEach(([eventName, listener]) =>
            this.component.$on(eventName, listener)
        );

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {data} = this.props;
        this.component.$set({...data});
    }
    componentWillUnmount() {
        this.component.$destroy();
    }
    render() {
        const {containerClass, containerStyles} = this.props;
        return <div ref={this.containerRef} className={containerClass} style={containerStyles}/>
    }
}

SvelteAdapter.propTypes = {
    /** The svelte component to wrap. Doesn't change after initialization.
     * Needs to be compiled with the 'generate:dom' option (which is the svelte default).
     */
    svelteComponent: PropTypes.func.isRequired,
    /** Passed into the svelte component as props. */
    data: PropTypes.object.isRequired,
    /** An object that maps event-names to handler functions.
     * When the svelte component emits the event, the handler will be called.
     */
    listeners: PropTypes.objectOf(PropTypes.func),
    /** A class to add to the div that the svelte component mounts to (a.k.a it's container).*/
    containerClass: PropTypes.string,
    /** Inline containerStyles to add to the div that the svelte component mounts to (a.k.a it's container).*/
    containerStyles: PropTypes.objectOf(PropTypes.string)
};

SvelteAdapter.defaultProps = {
    listeners: {},
    containerClass: '',
    containerStyles: {}
};

export default SvelteAdapter;