import * as React from 'react';
import * as ReactDOM from 'react-dom';

const WRAPPER_CLASS = 'dropdown';
const OPENED_CLASS = 'open';
const HIGHLIGHT_CLASS = 'highlight';

export interface Props {
	globalPositioned?:boolean,
	handlerClassName:string,
	itemElementsClassName:string
}

export interface State {
	opened:boolean,
	highlight:boolean
}

export class UIDropdown extends React.Component<Props, State> {
	state:State = {
		opened: false,
		highlight: false
	};

	private shouldComponentUpdate(nextProps, nextState:State):boolean {
		return nextState.opened !== this.state.opened ||
			this.props.children !== nextProps.children ||
			this.state.highlight !== nextState.highlight;
	}

	private handlerElement:Element = null;
	private itemElements:NodeListOf<Element> = null;

	private clickOutside = (e) => {
		let domNode = ReactDOM.findDOMNode(this);

		if ((!domNode || !domNode.contains(e.target))) {
			this.dropdownCloseHandler();
		}
	};

	private pressEscape = (e:KeyboardEvent) => {
		if(e.keyCode === 27) {
			this.dropdownCloseHandler();
		}
	};

	private clickHandler = (e) => {
		this.dropdownToggleHandler();
	};

	private clickItemElement = (e) => {
		this.dropdownToggleHandler();
	};

	private removeClickOutsideListeners():void {
		window.removeEventListener('mousedown', this.clickOutside, false);
	}

	private addClickOutsideListeners():void {
		this.removeClickOutsideListeners();
		window.addEventListener('mousedown', this.clickOutside, false);
	}

	private removeEscListener():void {
		window.removeEventListener('keyup', this.pressEscape, false);
	}

	private addEscListener():void {
		this.removeEscListener();
		window.addEventListener('keyup', this.pressEscape, false);
	}

	private removeClickHandlerListeners():void {
		window.removeEventListener('mousedown', this.clickOutside, false);
	}

	private addClickHandlerListeners():void {
		this.removeClickHandlerListeners();
		this.handlerElement.addEventListener('mousedown', this.clickHandler, false);
	}

	private removeClickOnElementListeners():void {
		if(this.itemElements) {
			for (let i:number = 0, l = this.itemElements.length; i < l; i++) {
				this.itemElements[i].removeEventListener('click', this.clickItemElement, true);
			}
		}
	}

	private addClickOnElementListeners():void {
		this.itemElements = ReactDOM.findDOMNode(this).querySelectorAll(`.${this.props.itemElementsClassName}`);
		this.removeClickOnElementListeners();

		for(let i:number = 0, l = this.itemElements.length; i < l; i++){
			this.itemElements[i].addEventListener('click', this.clickItemElement, true);
		}
	}

	private componentWillUnmount():void {
		this.removeClickOutsideListeners();
		this.removeClickHandlerListeners();
		this.removeClickOnElementListeners();
		this.removeEscListener();
	}

	private componentDidMount():void {
		this.handlerElement = ReactDOM.findDOMNode(this).querySelector(`.${this.props.handlerClassName}`);
		this.addClickHandlerListeners();
	}

	private componentDidUpdate():void {
		this.addClickOnElementListeners();
	}

	private dropdownToggleHandler():void {
		let state:boolean = !this.state.opened;

		if(this.props.globalPositioned === true) {
			this.setState({
				highlight: state,
				opened: false
			} as State);
		} else {
			this.setState({
				highlight: state,
				opened: state
			});

			if (state) {
				this.addClickOutsideListeners();
				this.addEscListener();
				this.addClickOnElementListeners();
			} else {
				this.removeClickOutsideListeners();
				this.removeEscListener();
				this.removeClickOnElementListeners();
			}
		}
	}

	private dropdownCloseHandler():void {
		if(this.props.globalPositioned === true) {
			this.setState({
				highlight: false,
				opened: false
			} as State);
		} else {
			this.setState({
				highlight: false,
				opened: false
			});
		}

		this.removeClickOutsideListeners();
	}

	private getDropdownClassName():string {
		let className:string = WRAPPER_CLASS;

		if (this.state.highlight) {
			className += ` ${HIGHLIGHT_CLASS}`;
		}

		if (this.state.opened) {
			className += ` ${OPENED_CLASS}`;
		}

		return className;
	}

	public render() {
		return (
			<div className={this.getDropdownClassName()}>
				{this.props.children}
			</div>
		);
	}
}
