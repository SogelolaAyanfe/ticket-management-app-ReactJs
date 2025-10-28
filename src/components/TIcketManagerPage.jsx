import React, { useState } from "react";
import "./TicketManager.css";
import TicketForm from "./TicketForm";
import { useGetTickets, useUpdateTicket, useDeleteTicket } from "../modules/ticket-manager";

export default function TicketManager() {
  const { tickets, isError: getError } = useGetTickets();
  const { mutate: updateTicket, isError: updateError } = useUpdateTicket();
  const { mutate: deleteTicket, isError: deleteError } = useDeleteTicket();

  const [editingTicket, setEditingTicket] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const handleEdit = (ticket) => {
    setEditingTicket(ticket.id);
    setEditTitle(ticket.title);
    setEditDescription(ticket.description);
    setEditStatus(ticket.status);
  };

  const handleSaveEdit = (ticketId) => {
    updateTicket({
      id: ticketId,
      title: editTitle,
      description: editDescription,
      status: editStatus
    });
    setEditingTicket(null);
    setEditTitle("");
    setEditDescription("");
    setEditStatus("");
  };

  const handleCancelEdit = () => {
    setEditingTicket(null);
    setEditTitle("");
    setEditDescription("");
    setEditStatus("");
  };

  const handleDelete = (ticketId, ticketTitle) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the ticket: "${ticketTitle}"?`
    );
    if (confirmDelete) {
      deleteTicket(ticketId);
    }
  };

  const formatStatus = (status) => {
    return status.replace("_", " ");
  };

  return (
    <div className="ticket-manager">
      <header className="ticket-header">
        <h2>Ticket Management</h2>
      </header>

      <div>
        <TicketForm />
      </div>

      {getError && <p className="error-message">{getError}</p>}
      {updateError && <p className="error-message">{updateError}</p>}
      {deleteError && <p className="error-message">{deleteError}</p>}

      <section className="ticket-list">
        <h2>All Tickets</h2>
        <div className="ticket-cards">
          {tickets.length === 0 ? (
            <p className="no-tickets">No tickets available. Create one to get started!</p>
          ) : (
            tickets.map((ticket) => (
              <div key={ticket.id} className={`ticket-card ${ticket.status.toLowerCase()}`}>
                {editingTicket === ticket.id ? (
                 
                  <div className="edit-mode">
                    <div className="edit-group-form">
                      <label>Title</label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="edit-input"
                      />
                    </div>
                    <div className="edit-group-form">
                      <label>Status</label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="edit-select"
                      >
                        <option value="OPEN">Open</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="CLOSED">Closed</option>
                      </select>
                    </div>
                    <div className="edit-group-form">
                      <label>Description</label>
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows="3"
                        className="edit-textarea"
                      />
                    </div>
                    <div className="ticket-actions">
                      <button 
                        className="small-button save-button" 
                        onClick={() => handleSaveEdit(ticket.id)}
                      >
                        Save
                      </button>
                      <button 
                        className="small-button cancel-button" 
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="ticket-header-card">
                      <h4>{ticket.title}</h4>
                      <span className={`status-tag ${ticket.status.toLowerCase()}`}>
                        {formatStatus(ticket.status)}
                      </span>
                    </div>
                    <p>{ticket.description}</p>
                    <div className="ticket-actions">
                      <button 
                        className="small-button" 
                        onClick={() => handleEdit(ticket)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-button" 
                        onClick={() => handleDelete(ticket.id, ticket.title)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}