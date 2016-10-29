import React, { Component } from 'react';

import firebase from 'firebase';

import ResultChart from './Components/ResultChart';
import Poll from './Components/Poll';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      hasMadeChoice: false,
      pollData: {},
      pollResult: [],
      selectedChoice: {},
    }
  }

  componentDidMount() {
     const config = {
      apiKey: "AIzaSyBh3ovibfobnNHNVh8FAzEHnuF_D6emTYw",
      authDomain: "pollsuhs.firebaseapp.com",
      databaseURL: "https://pollsuhs.firebaseio.com",
      storageBucket: "",
      messagingSenderId: "751727525041"
    };
    firebase.initializeApp(config);
    // this.createSeedPolls()
    this.getPollWith()
  }

  getPollWith(pollIdx = 0) {
    const pollRef = firebase.database().ref("polls");
    pollRef.once('value').then(function(snapshot){
      const polls = snapshot.val() || {};
      const pollKeys = Object.keys(polls)
      const targetPollKey = pollKeys[pollIdx];
      const pollData = polls[targetPollKey];
      pollData['id'] = targetPollKey;
      this.setState({pollData});

      this.getResultsWith(targetPollKey);

    }.bind(this));
  }

  getResultsWith(pollId) {
    const resultRef = firebase.database().ref("/results/" + pollId);
    resultRef.on('value', function(snapshot){
      const pollResult = snapshot.val() || [];
      this.setState({pollResult});
      console.log(pollResult);
    }.bind(this));
  }

  submitPoll(survey) {
    this.setState({hasMadeChoice: true, selectedChoice: survey.data})

    let newResult = [];
    let pollResult = this.state.pollResult;
    const pollData = this.state.pollData;
    const choices = pollData.questions[0].choices;
    const pollId = pollData.id;
    const selectedChoice = survey.data.choice;

    if(pollResult.length > 0) {
      newResult = pollResult.map((data) => {
        if(data.choice === selectedChoice) {
          data.count += 1;
        }

        return data
      })
    }else {
      choices.forEach((choice) => {
        const count = (choice === selectedChoice) ? 1 : 0;
        const data = {choice, count};
        newResult.push(data);
      })
    }
    
    const resultRef = firebase.database().ref("/results/" + pollId);
    resultRef.set(newResult);
  }

  createSeedPolls() {
    const seed = 
      { questions: 
        [
          { type: "radiogroup", 
            name: "choice", 
            title: "What car are you driving?", 
            isRequired: true, 
            colCount: 4, 
            choices: ["None", "Ford", "Vauxhall", "Volkswagen"] 
          }
        ]
      };

    firebase.database().ref('polls').push(seed);
  }

  render() {
    return (
      <div>

        <Poll 
        pollData={this.state.pollData}
        selectedChoice={this.state.selectedChoice}
        submitPoll={this.submitPoll.bind(this)}
        hidden={this.state.hasMadeChoice}
        />

        <ResultChart
        hidden={!this.state.hasMadeChoice}
        data={this.state.pollResult}
        />
      </div>
    );
  }
}

export default App;
