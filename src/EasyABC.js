import React, {Component} from 'react';
import Alphabets from './alphabets.json';

class EasyABC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alphabets: Alphabets,
            currentPosition: 0
        };

        this.playLetterSound = this.playLetterSound.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    playLetterSound(e) {
        // playSound(this.state.alphabets[this.state.currentPosition].wordSound);
    }

    handleNext(e) {
        this.setState(
            {currentPosition: this.state.currentPosition + 1}
        );
    }

    render() {
        return (
            <div className="game">
                <div className="options">
                    <div className="fields">
                        <div className="field-block">
                            {this.state.alphabets[this.state.currentPosition].letter}
                        </div>
                    </div>
                    <div className="buttons">
                        <a className="button prev">Previous</a>
                        <a onClick="this.playLetterSound" className="button sound">Play Sound</a>
                        <a onClick={this.handleNext} className="button next">Next</a>
                    </div>
                    <div className="fields">
                        <div className="field-block">
                            <div className="left-field">
                                <div className="placeholder-span hide">Click next to view image</div>
                                <img
                                    className="letter-image"
                                    src={this.state.alphabets[this.state.currentPosition].image}
                                    alt={this.state.alphabets[this.state.currentPosition].word} />

                            </div>
                            <div className="right-field">
                                <div className="placeholder-span hide">Click next to view word</div>
                                <div className="word">
                                    {this.state.alphabets[this.state.currentPosition].word.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EasyABC;