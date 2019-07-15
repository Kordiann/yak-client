import React from 'react';
import { Link } from 'react-router-dom';
import { deleteUser } from '../redux/reducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        isLogged: state.isLogged
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: () => dispatch(deleteUser()),
    };
}

class Avatar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
            toRedirect: false,
        }

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);

        this.logout = this.logout.bind(this);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({showMenu: true}, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu() {
        this.setState({showMenu: false}, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    render() {
        if(this.state.toRedirect) {
            return <Redirect to='/' push={false} />;
        }

        return <div className='dropdown'>
                <img className="user_navbar_avatar"
                        alt=''
                        width='52px' 
                        height='53px' 
                        src='lol.png'
                        onClick={this.showMenu}/>
                    {this.state.showMenu ? 
                        (<div className="dropdown_content">
                            <Link to='/userpage'><dir>Profile</dir></Link>
                            <dir onClick={this.logout}>Log out</dir>
                        </div>) 
                        : 
                        ( null )}
            </div>
    }

    logout = () => {
        this.props.deleteUser();
        window.location.reload();
        this.setState({
            toRedirect: true,
        });
    }
} 



export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

