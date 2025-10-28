import useLocalStorage from "use-local-storage";
import { useIsAuthourized } from "./auth";
import { useState } from "react";

type TicketStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: Date;
};

// every initially calls is useIsAuthourized from modules/auth; if false return isError: message.

const useGetTickets = () => {
  const isAuthourized = useIsAuthourized();
  const [tickets] = useLocalStorage<Ticket[]>("tickets", []);
  const [isError, setIsError] = useState<string>();

  if (!isAuthourized) {
    setIsError("Unauthorized: Cannot retrieve tickets");
    return { tickets: [], isError };
  }

  return { tickets, isError };
}; // return array of tickets

// accepts args of tickets
export const useCreateTicket = () => {
  const isAuthourized = useIsAuthourized();
  const [tickets, setTickets] = useLocalStorage<Ticket[]>("tickets", []);
  const [isError, setIsError] = useState<string>();

  //check if user is authorized, if authorized proceed to allow creation
  //store created ticket in useLocalStorage
  return {
    mutate: ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }) => {
      if (isAuthourized) {
        const newTicket: Ticket = {
          id: `ticket-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title,
          description,
          status: "OPEN",
          createdAt: new Date(),
        };
        setTickets([...tickets, newTicket]);
        setIsError(undefined);
      } else {
        setIsError("Ticket can't be created");
      }
    },
    isError,
  };
};

const useTicketStats = () => {
  const isAuthourized = useIsAuthourized();
  const [tickets] = useLocalStorage<Ticket[]>("tickets", []);
  const [isError, setIsError] = useState<string>();

  if (!isAuthourized) {
    setIsError("Unauthorized: Cannot retrieve ticket stats");
    return {
      totalTickets: 0,
      openTickets: 0,
      resolvedTickets: 0,
      isError,
    };
  }

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(
    (ticket) => ticket.status === "OPEN"
  ).length;
  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "CLOSED"
  ).length;

  return {
    totalTickets,
    openTickets,
    resolvedTickets,
    isError,
  };
};
// return an object of the below
// Total tickets: number
// Open tickets: number
// Resolved tickets: number

// accepts ticket id
// returns update ticket
const useUpdateTicket = () => {
  const isAuthourized = useIsAuthourized();
  const [tickets, setTickets] = useLocalStorage<Ticket[]>("tickets", []);
  const [isError, setIsError] = useState<string>();

  return {
    mutate: ({
      id,
      title,
      description,
      status,
    }: {
      id: string;
      title?: string;
      description?: string;
      status?: TicketStatus;
    }) => {
      if (isAuthourized) {
        const updatedTickets = tickets.map((ticket) => {
          if (ticket.id === id) {
            return {
              ...ticket,
              ...(title !== undefined && { title }),
              ...(description !== undefined && { description }),
              ...(status !== undefined && { status }),
            };
          }
          return ticket;
        });
        setTickets(updatedTickets);
        setIsError(undefined);
      } else {
        setIsError("Ticket can't be updated");
      }
    },
    isError,
  };
};

const useDeleteTicket = () => {
  const isAuthourized = useIsAuthourized();
  const [tickets, setTickets] = useLocalStorage<Ticket[]>("tickets", []);
  const [isError, setIsError] = useState<string>();

  return {
    mutate: (id: string) => {
      if (isAuthourized) {
        const filteredTickets = tickets.filter((ticket) => ticket.id !== id);
        setTickets(filteredTickets);
        setIsError(undefined);
      } else {
        setIsError("Ticket can't be deleted");
      }
    },
    isError,
  };
};

export { useGetTickets, useTicketStats, useUpdateTicket, useDeleteTicket };
