import React, { Component } from 'react';
import './App.css';

class List extends Component {
  constructor(props){
          super(props);
          this.state = {
            food: [
            {
              name: 'Pizza',
              expires: '2217-02-25'
            },
            {
              name: 'Chicken Pad Thai',
              expires: '2017-02-26'
            },
            {
              name: 'Lemon Cake',
              expires: '2017-02-13'
            },
            {
              name: 'Portal Cake',
              expires: '2017-02-13'
            }
        ],
        additionals: {
          name:"",
          expires:""
        }
  }
}

handleToss(event) {
  let targetLock = event.target.id;
  let tossingThis = this.state.food.filter((item) => item.name !== targetLock);
  // console.log(targetLock);
  // console.log(tossingThis);
  this.setState(currentState =>(
    {food: tossingThis }
  ))
}

handleClick(event) {
  event.preventDefault();
  this.setState(currentState =>(
    {food: [...currentState.food,this.state.additionals] }
  ))}

handleInputChange(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;
  this.setState(currentState =>(
      {additionals:{...currentState.additionals, [name]: value}}
    ),
      () => console.log(`Syncing input value with state: ${JSON.stringify(this.state)}`)
    )}



  render(){
        let rightNow = new Date();
        let mm = rightNow.getMonth() + 1;
        let dd = rightNow.getDate();
        let yyyy = rightNow.getFullYear();
        let dateNow = yyyy + '-' + mm + '-' + dd;
        let checkEmpty = this.state.food.length;
        let feedMe = (
          <p>put more things into fridge</p>
        );
        let thisGuy = (
          <ul>
            {this.state.food.map((eatThisShit) => (
              <li
                key={eatThisShit.name}
                className={dateNow > eatThisShit.expires ? "expired":"good"}
                id = {(eatThisShit.expires)}
                >
                {eatThisShit.name}
                <br/>
                <span>
                  {eatThisShit.expires}
                </span>
                <br/>
                <button
                  id = {eatThisShit.name}
                  onClick={(event) => this.handleToss(event)}
                  >
                  toss
                </button>
              </li>
            ))}
          </ul>
        );


  			return (
          <div>
            {checkEmpty == 0  ? feedMe : thisGuy}
            <div>
                <form>
                          <textarea
                          name="name"
                          type="text"
                          rows="4"
                          cols="50"
                          id='whatIsThisInFridge'
                          required
                          value={this.state.name}
                          onChange={(event) => this.handleInputChange(event)}
                          />
                      <br/>
                          <input
                          name="expires"
                          type="date"
                          id='whenDoesItRot'
                          required
                          value={this.state.expires}
                          onChange={(event) => this.handleInputChange(event)}
                          />
                      <br/>
                          <input
                          value="AddToFridge"
                          type="submit"
                          id='whenDoesItRot'
                          onClick={(event) => this.handleClick(event)}
                          />
                </form>
            </div>
          </div>
    		)
      }
  }




export default List;
