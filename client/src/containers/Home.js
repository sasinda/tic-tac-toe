import React from 'react';
import Game from '../components/Game'
class Home extends React.Component {
    render() {
        return (
            <div style={{"padding":"10%"}}>
                <Game/>
            </div>
        )
    }
}
export default Home;