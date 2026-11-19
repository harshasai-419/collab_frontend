import { Component } from 'react'
import './teamIndex.css'
import DashboardLeftcon from '../DashboardLeftCon'
import DashboardHeader from '../DashboardHeader'
import Popup from 'reactjs-popup'
import { PiSubtitlesFill } from "react-icons/pi";
import { IoPersonCircle } from "react-icons/io5";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { BounceLoader } from 'react-spinners';
import API_BASE_URL from '../../apiConfig';

class Team extends Component {
    state = {
        teamList: [{ teamName: 'sample', teamLead: 'sai' }],
        teamName: '',
        teamLead: '',
        isLoading: true
    }

    componentDidMount() {
        this.getTeams()
    }

    addTeam = async () => {
        const { teamName, teamLead } = this.state
        const url = `${API_BASE_URL}/addTeam`
        const taskDetails = {
            teamName: teamName,
            teamLead: teamLead
        }
        const options = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(taskDetails)
        }
        try {
            const response = await fetch(url, options)
            const data = await response.json()
            this.setState({ teamList: data, teamName: '', teamLead: '' })
        } catch (error) {
            console.error("Error adding team", error)
        }
    }

    // Updated to accept teamLead instead of id
    deleteTeam = async (teamLead) => {
        if (!window.confirm(`Are you sure you want to delete the team led by ${teamLead}?`)) return;

        // Assuming the backend accepts 'teamLead' as a query parameter or in the body
        const url = `${API_BASE_URL}/deleteTeam?teamLead=${teamLead}`
        const options = {
            method: "DELETE"
        }

        try {
            const response = await fetch(url, options)
            if (response.ok) {
                // Remove the team from state using teamLead
                const data = await response.json()
                this.setState({ teamList: data })
            } else {
                console.error("Failed to delete team")
            }
        } catch (error) {
            console.error("Error deleting team", error)
        }
    }

    changeTeamName = (event) => {
        this.setState({ teamName: event.target.value })
    }
    changeTeamLead = (event) => {
        this.setState({ teamLead: event.target.value })
    }
    getTeams = async () => {
        const url = `${API_BASE_URL}/getTeam`
        const options = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET",
        }
        try {
            const response = await fetch(url, options)
            const data = await response.json()
            this.setState({ teamList: data, isLoading: false })
        } catch (error) {
            console.error("Error getting groups", error);
            this.setState({ isLoading: false });
        }
    }

    render() {
        if (Cookies.get("jwt_token") === undefined) {
            return <Navigate to="/login" replace />
        }
        const { select } = this.props
        const { teamList, teamName, teamLead, isLoading } = this.state
        return (
            <div className='task-total-con'>
                <DashboardHeader />
                <div className='task-containers'>
                    <DashboardLeftcon select={select} />
                    {isLoading ? (
                        <div className='loader-con'>
                            <BounceLoader color="#36d7b7" loading={true} size={40} />
                        </div>
                    ) :
                        <div className='total-team-right-con'>
                            <div className='task-top-right-con'>
                                <h1 className='team-head'>Teams</h1>
                                <div>
                                    <Popup
                                        modal
                                        trigger={
                                            <button className='task-button'>+ Create Team</button>
                                        }
                                    >
                                        {close => (
                                            <div className='team-popup-container'>
                                                <h1 className='tigger-head'>Add Team</h1>
                                                <label className='trigger-label-ele' htmlFor="teamName">Team Name</label><br />
                                                <input type="text" placeholder="Team Name" id="teamName" className='trigger-input-ele' value={teamName} onChange={this.changeTeamName} /><br />
                                                <label className='trigger-label-ele' htmlFor='teamLead'>Team Lead</label><br />
                                                <input type="text" id="teamLead" value={teamLead} placeholder="Team Lead" className='trigger-input-ele' onChange={this.changeTeamLead} /><br />
                                                <div className='trigger-button-con'>
                                                    <button
                                                        type="button"
                                                        className="task-trigger-button"
                                                        onClick={() => close()}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button type="button" className='submit-trigger-button' onClick={() => { this.addTeam(); close(); }}>Submit</button>
                                                </div>
                                            </div>
                                        )}
                                    </Popup>
                                </div>
                            </div>
                            <div className='total-team-cards'>
                                {teamList.length === 0 ? (
                                    <div className='no-data-message'>
                                        <h2>No Teams Yet</h2>
                                        <p>Start collaborating by creating a new team!</p>
                                    </div>
                                ) :
                                    (teamList.map(each => {
                                        return (
                                            <div className='team-card' key={each.teamLead}>
                                                <div className='team-main-info'>
                                                    <h1 className='team-head'><IoPeopleCircleSharp className='team-card-icon2' /></h1>
                                                    <div className='team-detail'>
                                                        <PiSubtitlesFill className='team-card-icon' />
                                                        <span>{each.teamName}</span>
                                                    </div>
                                                    <div className='team-detail'>
                                                        <IoPersonCircle className='team-card-icon' />
                                                        <span>{each.teamLead}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    className='team-delete-button'
                                                    onClick={() => this.deleteTeam(each.teamLead)}
                                                    title="Delete Team"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )
                                    }))}
                            </div>
                        </div>}
                </div>
            </div>
        )
    }
}

export default Team
