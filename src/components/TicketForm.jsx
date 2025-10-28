import "./TicketForm.css"
import { useCreateTicket } from "../modules/ticket-manager"
import { useState } from "react"

const TicketForm = () => {
  const { mutate, isError } = useCreateTicket()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all required fields")
      return
    }

    mutate({ title, description })
    
    if (!isError) {
      // Clear form after successful creation
      setTitle("")
      setDescription("")
      setStatus("")
      alert("Ticket created successfully!")
    }
  }

  return (
    <div className="ticket-form">
      <section className="form-header">
         <button className="go-back"><a href="/Dashboard">←</a></button>
        <h2>Create Ticket</h2>
        <form className="form-flex" onSubmit={handleSubmit}>
          <div className="group-form">
            <label htmlFor="title">Title</label>
            <input 
              type="text" 
              id="title" 
              placeholder="Enter ticket title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required 
            />
          </div>

          <div className="group-form">
            <label htmlFor="status">Status</label>
            <select 
              id="status" 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select status</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <div className="group-form full">
            <label htmlFor="description">Description</label>
            <textarea 
              id="description" 
              placeholder="Enter ticket details" 
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {isError && <p className="error-message">{isError}</p>}

          <button type="submit" className="button-submit">Create Ticket</button>
        </form>
      </section>
    </div>
  )
}

export default TicketForm