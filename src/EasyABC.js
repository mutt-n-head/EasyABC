import React, {Component} from 'react';
import Alphabets from './alphabets.json';
import classNames from 'classnames';

class EasyABC extends Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            alphabets: Alphabets,
            currentPosition: 0,
            currentTick: 0,
            random: false,
            sound: true
        };

        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.playSound = this.playSound.bind(this);
        this.setRandom = this.setRandom.bind(this);
        this.setSounds = this.setSound.bind(this);
    }

    getRandomPageIndex()
    {
        return Math.floor(Math.random() * (this.state.alphabets.length) + 1) - 1;
    }

    setRandom(e)
    {
        this.setState({
            random: !this.state.random
        });
    }

    setSound(e)
    {
        this.setState({
            sound: !this.state.sound
        });
    }

    handleNext(e)
    {
        if (this.state.currentTick < 2)
        {
            // Just add to tick count, not advancing alphabet index just yet.
            this.setState({
                currentTick: this.state.currentTick + 1
            });
        }
        else
        {
            let nextPosition = 0;

            if (this.state.random === true)
            {
                nextPosition = this.getRandomPageIndex();
            }
            else
            {
                nextPosition = this.state.currentPosition < Alphabets.length - 1 ? this.state.currentPosition + 1 : 0;
            }

            console.log('Next position is ' + nextPosition);

            this.setState({
              currentPosition: nextPosition,
              currentTick: 0
            });
        }
    }

    handlePrevious(e) {
        // The event really doesn't do anything here.
        let atStart = this.state.currentPosition === 0 ? true : false;

        if (!atStart) {
            this.setState({
                currentPosition: this.state.currentPosition - 1,
                currentTick: 0
            });
        } else {
            this.setState({
                currentPosition: Alphabets.length - 1,
                currentTick: 0
            });
        }
    }

    playSound() {
        // Get selectors only if needed.
        if (this.state.currentTick === 0) {
            let letterSound = document.querySelector(`audio[data-key="letter"`);

            letterSound.currentTime = 0;
            letterSound.play();
        } else {
            let wordSound = document.querySelector(`audio[data-key="word"`);

            wordSound.currentTime = 0;
            wordSound.play();
        }
    }

    componentDidMount() {
        console.log('DidMount');
        this.playSound();
    }

    componentDidUpdate() {
        console.log('DidUpdate');
        this.playSound();
    }

    render() {
        let showImage = this.state.currentTick !== 0 ? true : false;
        let showWord = this.state.currentTick > 1 ? true : false;

        return (
            <div className="game">
                <span className="random-label">Random Letters:</span>
                <label className="switch">
                    <input onClick={this.setRandom} type="checkbox" defaultValue="false" value={this.state.random} />
                    <div className="slider round" />
                </label>
                <div className="options">
                    <div className="fields">
                        <div className="field-block">
                            {this.state.alphabets[this.state.currentPosition].letter}
                        </div>
                        <audio src={this.state.alphabets[this.state.currentPosition].letterSound} data-key="letter" />
                    </div>
                    <div className="buttons">
                        <a onClick={this.handlePrevious} className="button prev">
                            Previous
                        </a>
                        <a onClick={this.playSound} className="button sound">
                            Play Sound Again
                        </a>
                        <a onClick={this.handleNext} className="button next">
                            Next
                        </a>
                    </div>
                    <div className="fields">
                        <div className="field-block">
                            <div className="left-field">
                                <div className={classNames("placeholder-span", {"hide": showImage})}>
                                    Click next to view image
                                </div>
                                <img
                                    className={classNames("letter-image", {"hide": !showImage})}
                                    src={this.state.alphabets[this.state.currentPosition].image}
                                    alt={this.state.alphabets[this.state.currentPosition].word} />
                                <audio src={this.state.alphabets[this.state.currentPosition].wordSound} data-key="word" />
                            </div>
                            <div className="right-field">
                                <div className={classNames("placeholder-span", {"hide": showWord})}>
                                    Click next to view word
                                </div>
                                <div className={classNames({"hide": !showWord})}>
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
