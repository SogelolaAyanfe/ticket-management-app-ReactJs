import { Link } from 'react-router-dom';
import './DashboardStyles.css'
import { useLogout, useIsAuthourized } from "../modules/auth"
import { useTicketStats } from "../modules/ticket-manager"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { mutate } = useLogout()
  const isAuthourized = useIsAuthourized()
  const { totalTickets, openTickets, resolvedTickets, isError } = useTicketStats()
  const navigate = useNavigate()  
   useEffect(() => {
    if (!isAuthourized) {
      navigate("/auth/login");
    }
  }, [isAuthourized, navigate])

  function handleClick() {
    mutate();
    navigate("/")
  }

  // Calculate in-progress tickets
  const inProgressTickets = totalTickets - openTickets - resolvedTickets;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Dashboard</h2>
        <button id="logout-button" onClick={handleClick} className="logout-btn">Logout</button>
      </header>

      <main className="dashboard-main">
         <button id="logout-button" onClick={handleClick} className="logout-second-button">Logout</button>
        <section className="welcome-section">
          <h2>Welcome back, Admin!</h2>
          <p>Here's an overview of your ticket activity today.</p>
        </section>
        <h2>Ticket Statistics</h2>

        {isError && <p className="error-message">{isError}</p>}

        <section className="stats-container">
          <div className="stat-card open">
            <h3>{openTickets}</h3>
            <p>Open Tickets</p>
          </div>
          <div className="stat-card in-progress">
            <h3>{inProgressTickets}</h3>
            <p>In Progress</p>
          </div>
          <div className="stat-card closed">
            <h3>{resolvedTickets}</h3>
            <p>Resolved</p>
          </div>
          <div className="stat-card total">
            <h3>{totalTickets}</h3>
            <p>Total Tickets</p>
          </div>
        </section>

        <section className="actions-container">
          <div className="action-card">
            <h4>Manage Tickets</h4>
            <p>View, edit, or delete existing tickets.</p>
            <button>
              <Link to="/ticket-manager" style={{color:"white", textDecoration: "none"}}>Open Manager</Link>
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DashboardPage