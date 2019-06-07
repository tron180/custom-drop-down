import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './SelectBox.css'

export default class SelectBox extends Component {
    constructor(props){
        super(props);
        this.state = {
						...this.props,
            items: this.props.items || [],
            showItems: false,
						selectedItem: [],
						filteredKeyResults: [],
						data: this.props.items,
						result: []
				}
				this.onChangeHandler = this.onChangeHandler.bind(this);
    }

		// Showing Dropdown
    dropDown = () => {
        this.setState(prevState => ({
            showItems: !prevState.showItems
        }) )
    }

		// Selecting Items for Tags
    selectItem = (item) => {	
			var selected = [...this.state.selectedItem];
			selected.push(item)
			var uselected = Array.from(new Set(selected));
			this.setState({
					selectedItem: uselected,						
					showItems: true
			})
			console.log(this.state.selectedItem);
		}

		// Remove tags
		remove = (item) => {
			var rem = [...this.state.selectedItem];
			rem = rem.filter(e => e.key !== item)
			this.setState({
				selectedItem: rem
			})
		}
		

		// Search on key
		filterdata = () => {
			const filteredKeyResults = [];
			const searchOnKey = this.props.searchOnKey;
			const dataList = [...this.state.data];
			for(let data of dataList) {
				if(data[searchOnKey]) filteredKeyResults.push(data);				
			}
			this.setState({filteredKeyResults: filteredKeyResults})
		}

		componentDidMount() {
			this.filterdata();
		}
		
		onChangeHandler(event){
			var searchResult = [];
			const input = event.target.value.toUpperCase();
			const states = [...this.state.filteredKeyResults];
			
			for(var i = 0; i < states.length; i++){
									
				if(states[i][this.props.searchOnKey].toUpperCase().indexOf(input) !== -1) searchResult.push(states[i]);
			}
	
			if(!event.target.value){
				searchResult= []
			};
			
	
			this.setState({
				result: searchResult,
				showItems: true
			});
		}

    render() {
			return (
				<div style={{alignContent: "center"}}>
					<div 
						className="select-box--tags">
						{this.state.selectedItem.map(item => 
							<p className="tags" key={ item.key }>
								{ item[this.props.searchOnKey] }
								<span>
									<FontAwesomeIcon onClick={this.remove.bind(this,item.key)} icon={faTimes} />
								</span>
							</p>
						)}
					</div>
					<div style={{width: this.props.width || 500}} className="select-box--box">
						<div className="select-box--container">
							<input 
								className="select-box--selected-item"
								onChange={this.onChangeHandler}
								value={ this.state.selectedItem.searchOnKey }
								/>

							<div 
								className="select-box--arrow"
								onClick={this.dropDown}
							>
								<span 
									className={`${this.state.showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'}`}></span>
							</div>

							<div 
								style={{display:this.state.showItems ? 'block' : 'none'}}
								className="select-box--items"
								>
								{`${this.state.result}` 
								? this.state.result.map(item => 
								<div 
									key={ item.key }
									onClick={() => this.selectItem(item)}
									className={this.state.selectedItem === item ? 'selected' : ''}
									>
									{item.name}
								</div>)

								: this.state.items.map(item => 
								<div 
									key={ item.key }
									onClick={() => this.selectItem(item)}
									className={this.state.selectedItem === item ? 'selected' : ''}
									>
									{item.name}
								</div>)
								}
								
							</div>

						</div>
					</div>
					<input 
						type="hidden" 
						value={this.state.selectedItem.id} 
						name={this.state.searchOnKey} />
				</div>
			)
    }
}
