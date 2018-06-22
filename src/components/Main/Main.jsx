import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Subscribe } from 'unstated'

import { withStyles } from '@material-ui/core/styles'

import NavSide from '../NavSide'
import NavTop from '../NavTop'
import Dashboard from '../../screens/Dashboard'
import AccountPage from '../../screens/AccountPage'
import LandingPage from '../Landing'
import NewPage from '../../screens/NewPage'
import LoginModal from '../Login'

import SessionContainer from '../../containers/session'
import * as routes from '../../routes'
import CoursesPage from '../../screens/CoursesPage'
import TodosPage from '../../screens/TodosPage'

const styles = theme => ({
  authenticated: {
    marginTop: '56px',
    minHeight: '100%',
    padding: '.5rem',
    [theme.breakpoints.up('sm')]: {
      marginTop: '64px'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing.unit * 8,
      padding: '1rem'
    }
  },
  public: {
    marginTop: '56px',
    minHeight: '100%',
    [theme.breakpoints.up('sm')]: {
      marginTop: '64px'
    }
  },
  wrapper: {
    margin: `0 auto`,
    maxWidth: `66rem`
  }
})

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loginModal: false
    }
  }

  toggleLoginModal = () => {
    const loginModal = !this.state.loginModal
    this.setState({
      loginModal: loginModal
    })
  }

  closeLoginModal = () => {
    this.setState({
      loginModal: false
    })
  }

  render() {
    const { classes } = this.props

    return (
      <Router>
        <Subscribe to={[SessionContainer]}>
          {session => {
            const { authUser } = session.state
            return (
              <div
                className={authUser ? classes.authenticated : classes.public}
              >
                <NavTop toggleModal={this.toggleLoginModal} />
                <NavSide />
                <div className={classes.wrapper}>
                  <Route
                    path={routes.ACCOUNT}
                    component={() => <AccountPage />}
                  />
                  <Route
                    path={routes.COURSES}
                    component={() => <CoursesPage />}
                  />
                  <Route
                    path={routes.DASHBOARD}
                    component={() => <Dashboard />}
                  />
                  <Route
                    exact
                    path={routes.LANDING}
                    component={() => <LandingPage />}
                  />
                  <Route path={routes.NEWDOC} component={() => <NewPage />} />
                  <Route path={routes.TODOS} component={() => <TodosPage />} />
                </div>
                <LoginModal
                  loginModal={this.state.loginModal}
                  toggleLogin={this.toggleLoginModal}
                  closeLogin={this.closeLoginModal}
                />
              </div>
            )
          }}
        </Subscribe>
      </Router>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Main)
