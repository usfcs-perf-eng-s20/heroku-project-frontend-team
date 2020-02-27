import React from "react";
import MyTopApicalls from './MyTopApicalls';

class MyTop extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      "tops": []
    }
  }

  async componentDidMount() {
    try {
      setInterval(() => {
        MyTopApicalls.getMyTops().then(
            (v) => {
                
                this.setState({ "tops": v });
            },
            (error) => {
                console.log( error );
                this.setState({ "tops": [] });
            }
        );
      }, 3000);
    } catch(e) {
      console.log(e);
    }
  }

  render(){
    return (
      <div>
        My Tops
        <br/>
        {
          ()=>{
            this.state.tops.map(
              i => {
                
                return <p>{i}</p>
              }
            )
          }
        }
      </div>
    );
  }
}

export default MyTop;
